const cors = require('cors');

require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive');
    bodyparser = require('body-parser');

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {

   const db = app.get('db');

    const { sub, name, picture } = profile._json;

   db.find_user([sub]).then( response => {
       if (response[0]) {
        done(null, response[0].coaches_id)
       } else {
        db.create_user([name, picture, sub]).then( response => {
            done(null, response[0].coaches_id)
        })
       }
   })




}));

passport.serializeUser((coaches_id, done) => {
    done(null, coaches_id);
})
passport.deserializeUser((coaches_id, done) => {
    const db = app.get('db');
    db.find_logged_in_user([coaches_id]).then( res => {
        done(null, res[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#role'
}));

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('Not There Bruh')
    } else {
        res.status(200).send(req.user);
    }
})

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})



//teams table
app.get('/api/teams', (req, res) => {
    console.log(req.user)
    const db = req.app.get('db');
    db.get_teams([req.user.coaches_id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})


app.post('/api/teams', (req, res) => {
    console.log(req.user)
    const db = req.app.get('db');
    const {team_name, sport, time_zone, country, zip_code, logo} = req.body;
    db.create_team([team_name, sport, time_zone, country, zip_code, req.user.coaches_id, logo]).then(resp => {
        res.status(200).send(resp);
    })
})


//schedule table
app.get('/api/schedule:id', (req, res) => {
    console.log(req.params.id)
    const db = req.app.get('db');
    db.get_schedule([req.params.id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})


app.post('/api/schedule', (req, res) => {
    console.log(req.body)
    console.log(req.user)
    const db = req.app.get('db');
    const {event_name, event_date, event_time, event_location} = req.body;
    db.create_event([event_name, event_date, event_time, event_location, req.user.teams_id]).then(resp => {
        res.status(200).send(resp);
    })
})


//roster table
app.get('/api/roster/:id', (req, res) => {
    console.log(req.params.id)
    const db = req.app.get('db');
    db.get_roster([req.params.id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})


app.post('/api/roster', (req, res) => {
    console.log(req.body)
    const db = req.app.get('db');
    const {jersey_number, photo, first_name, last_name, phone_number, email, date_of_birth, teams_id} = req.body;
    db.create_player([jersey_number, photo, first_name, last_name, phone_number, email, date_of_birth, teams_id]).then(resp => {
        res.status(200).send(resp);
    })
})



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`);
})