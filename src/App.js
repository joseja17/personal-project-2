import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Home/Home.js';
import Login from './components/Login/Login';
import Role from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Private/Role.js';
import CreateTeam from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/CreateTeam/CreateTeam.js';
import Schedule from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Schedule/Schedule.js';
import Roster from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Roster/Roster.js';
import HomeSchedule from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/HomeSchedule/HomeSchedule.js';
import HomeRoster from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/HomeRoster/HomeRoster.js';

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
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
