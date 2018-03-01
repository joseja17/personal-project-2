import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login';
import Role from './components/Private/Role.js';
import CreateTeam from './components/CreateTeam/CreateTeam.js';
import Schedule from './components/Schedule/Schedule.js';
import Roster from './components/Roster/Roster.js';
import HomeSchedule from './components/HomeSchedule/HomeSchedule.js';
import HomeRoster from './components/HomeRoster/HomeRoster.js';
import EditTeam from './components/EditTeam/EditTeam.js';
import EditEvent from './components/EditEvent/EditEvent.js';
import EditPlayer from './components/EditPlayer/EditPlayer.js';
import Stripe from './components/Stripe/Stripe.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/role' component={Role} />
            <Route path='/home' component={Home} />
            <Route path='/createteam' component={CreateTeam} />
            <Route path='/schedule' component={Schedule} />
            <Route path='/roster' component={Roster} />
            <Route path='/homeroster/:id' component={HomeRoster} />
            <Route path='/homeschedule/:id' component={HomeSchedule} />
            <Route path='/editteam/:id' component={EditTeam} />
            <Route path='/editevent/:id' component={EditEvent} />
            <Route path='/editplayer/:id' component={EditPlayer} />
            <Route path='/payment' component={Stripe} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
