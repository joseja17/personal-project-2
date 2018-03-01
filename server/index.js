const cors = require('cors');

require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive'),
    bodyparser = require('body-parser'),
    stripe = require('stripe')(process.env.SECRET_KEY); // invoke library with secret key





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



//STRIPE
app.post('/api/payment', function (req, res, next) {
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    console.log('amt', req.body.amount.toString().split(''));
  
    // Joe's penny function below
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if (amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") pennies.push(amountArray[i + 1]);
        else pennies.push("0");
        if (typeof amountArray[i + 2] === "string") pennies.push(amountArray[i + 2]);
        else pennies.push("0");
        break;
      }
      else pennies.push(amountArray[i]);
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create( // method built in to library
      { 
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id, // needs to be the token id
        description: 'Test charge from react app' // any description you want
      },
      function (err, charge) {
        if (err) return res.sendStatus(500); // error means charge failure
        return res.sendStatus(200);
        
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
      });
  });
//



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

app.get('/api/teams/:id', (req, res) => {
    console.log(req.user)
    const db = req.app.get('db');
    db.get_team([req.params.id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})


app.delete('/api/teams/:id', (req, res)=>{
    console.log(req.params.id);
    console.log(req.user);
    const db = req.app.get('db');
    db.delete_team([req.params.id, req.user.coaches_id]).then(resp=>{
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
})

app.put('/api/teams/:id', (req, res)=>{
    console.log(req.body);
    const db = req.app.get('db');
    const {team_name, sport, time_zone, country, zip_code, logo, teams_id} = req.body;
    db.edit_team([team_name, sport, time_zone, country, zip_code, logo, teams_id, req.params.id]).then(resp=>{
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
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

app.get('/api/schedule/:id', (req, res) => {
    const db = req.app.get('db');
    db.get_schedule_specific([req.params.id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})


app.delete('/api/schedule/:id/:teams_id', (req, res)=>{
    console.log(req.params.id)
    const db = req.app.get('db');
    db.delete_event([req.params.id, req.params.teams_id]).then(resp=>{
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
})

app.put('/api/schedule/:id', (req, res)=>{
    console.log(req.body);
    const db = req.app.get('db');
    const {event_name, event_date, event_time, event_location, teams_id} = req.body;
    db.edit_event([event_name, event_date, event_time, event_location, teams_id, req.params.id]).then(resp=>{
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
})


app.post('/api/schedule', (req, res) => {
    console.log(req.body)
    const db = req.app.get('db');
    const {event_name, event_date, event_time, event_location, teams_id} = req.body;
    db.create_event([event_name, event_date, event_time, event_location, teams_id]).then(resp => {
        res.status(200).send(resp);
    })
})


//roster table
app.get('/api/rosters/:id', (req, res) => {
    console.log(req.params.id)
    const db = req.app.get('db');
    db.get_roster([req.params.id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})

app.get('/api/roster/:id', (req, res) => {
    const db = req.app.get('db');
    db.get_roster_specific([req.params.id]).then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    })
})


app.delete('/api/roster/:id/:teams_id', (req, res)=>{
    console.log(req.params.id)
    const db = req.app.get('db');
    db.delete_player([req.params.id, req.params.teams_id]).then(resp=>{
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
})

app.put('/api/roster/:id', (req, res)=>{
    console.log(req.body);
    const db = req.app.get('db');
    const {jersey_number, photo, first_name, last_name, phone_number, email, date_of_birth, teams_id} = req.body;
    db.edit_player([jersey_number, photo, first_name, last_name, phone_number, email, date_of_birth, teams_id, req.params.id]).then(resp=>{
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
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