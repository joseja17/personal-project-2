import React, { Component } from 'react';
import './Home.css';
import Nav from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Nav/Nav.js';
import Header from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Header/Header.js';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resp: [""],
            firstLoad: true
        }
        this.deleteTeam = this.deleteTeam.bind(this);
    }

    componentDidMount() {
        axios.get('/api/teams').then( resp => {
            console.log(resp)
            this.setState({
                resp: resp.data,
                firstLoad: false

            })
        })
    }

    deleteTeam(id){
        var r = window.confirm('Are you sure you want to delete this team?');
        if (r === true) {
            axios.delete('/api/teams/' + id).then(resp =>{
                console.log(resp.data)
                this.setState({
                    resp : resp.data
                })
            })
        }
        
    }

    render() {
        var teamsToDisplay = this.state.resp.map( (val, i) => {
            return (
                <div key={i} className='team-container'>
                    <div className='team-container-name'>{val.team_name}</div>
                    <div className='team-container-sport'>{val.sport}</div>
                    <div className='team-container-time-zone'>{val.time_zone}</div>
                    <div className='team-container-country'>{val.country}</div>
                    <div className='team-container-zip-code'>{val.zip_code}</div>
                    <div className='team-container-logo'>{val.logo}</div>
                    <Link to={'/homeroster/'+val.teams_id}><button className='team-container-button-edit'>Roster</button></Link >
                    <Link to={'/homeschedule/'+val.teams_id}><button className='team-container-button-edit'>Schedule</button></Link >
                    <Link to={'/editteam/'+val.teams_id}><button className='team-container-button-edit'>Edit</button></Link >
                    <button className='team-container-button-delete' onClick={ () => this.deleteTeam(val.teams_id)}>Delete</button>
                </div>
            )
        })

        return (
            <center><div className="Home">

                <div className='home-navvv'>
                    <Nav />
                </div>

                <div className='home-header'>
                    <Header />
                </div>

                

                { this.state.resp.length ? 
                    <div>
                    <div className='team-container-title'><h1 className='teams-title-h1'>Teams</h1></div>

                <div className='team-container' >
                <a href='/#/createteam'><button className='team-container-button-new'>+ New</button></a>
                    <button className='team-container-button-new-1'></button>
                    <button className='team-container-button-new-1'></button>
                    <button className='team-container-button-new'>Import</button>
                    <button className='team-container-button-new'>Export</button>
                    <button className='team-container-button-new'>Event Settings</button>
                    
                </div>

                <div className='team-container-title'>
                    <div className='team-container-name-title'>Team Name</div>
                    <div className='team-container-name-title'>Sport</div>
                    <div className='team-container-name-title'>Time Zone</div>
                    <div className='team-container-name-title'>Country</div>
                    <div className='team-container-name-title'>Zip Code</div>
                    <div className='team-container-name-title'></div>
                    <div className='team-container-button-edit-title'> </div>
                    <div className='team-container-button-delete-title'> </div>
                </div>
                    
                    {teamsToDisplay} </div> : <div className='center-circle'>
                    <div className='no-team-text'>Looks like you haven't created a team yet :(</div>
                    <div className='player-icon'><img src='/player.svg' alt='player-icon'/></div>
                    <div ><a href='/#/createteam'><button  className='add-team-button'>+ Add a team</button></a></div>
                </div>}

            </div></center>
        )
    }


}

export default Home;