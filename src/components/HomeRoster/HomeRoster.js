import React, { Component } from 'react';
import './HomeRoster.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;


class HomeRoster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resp: [""],
            firstLoad: true
        }

        this.deletePlayer = this.deletePlayer.bind(this);
    }

    componentDidMount() {
        axios.get('/api/rosters/' + this.props.match.params.id).then(resp => {
            console.log(resp)
            this.setState({
                resp: resp.data,
                firstLoad: false
            })
        })
    }

    deletePlayer(id, teamsID) {
        var r = window.confirm('Are you sure you want to delete this player?');
        if (r === true) {
            axios.delete('/api/roster/' + id + '/' + teamsID).then(resp => {
                console.log(resp.data)
                this.setState({
                    resp: resp.data
                })
            })
        }
    }

    render() {
        var rosterToDisplay = this.state.resp.map((val, i) => {
            return (
                <div key={i} className='roster-container'>

                    <div className='roster-container-time-zone'>{val.first_name}</div>
                    <div className='roster-container-country'>{val.last_name}</div>
                    <div className='roster-container-name'>{val.jersey_number}</div>
                    <div className='roster-container-time-zone'>{val.phone_number}</div>
                    <div className='roster-container-country'>{val.email}</div>
                    <div className='roster-container-country'>{val.date_of_birth}</div>
                    <Link to={'/editplayer/' + val.player_id}><button className='roster-container-button-edit'>Edit</button></Link>
                    <button className='roster-container-button-delete' onClick={() => this.deletePlayer(val.player_id, val.teams_id)}>Delete</button>
                </div>
            )
        })


        var rosterToDisplayTablet = this.state.resp.map((val, i) => {
            return (
                <div key={i} className='roster-container-tablet'>
                    <div className='roster-container-info-tablet'>
                    <div className='roster-container-time-zone-tablet'>{val.first_name}</div>
                    <div className='roster-container-country-tablet'>{val.last_name}</div>
                    <div className='roster-container-name-tablet'>{val.jersey_number}</div>
                    <div className='roster-container-time-zone-tablet'>{val.phone_number}</div>
                    <div className='roster-container-country-tablet'>{val.email}</div>
                    <div className='roster-container-country-tablet'>{val.date_of_birth}</div>
                    </div>
                    <hr className='hr-tablet-aaa'/>
                    <div className='roster-container-buttons-tablet'>
                    <Link to={'/editplayer/' + val.player_id}><button className='roster-container-button-edit-tablet'>Edit</button></Link>
                    <button className='roster-container-button-delete-tablet' onClick={() => this.deletePlayer(val.player_id, val.teams_id)}>Delete</button>
                </div>
                </div>
            )
        })

        return (
            <div>
                <Desktop>
                    <center><div className="homeroster">

                    <div className='homeroster-navvv'>
                            <Nav />
                        </div>

                        <div className='homeroster-header'>
                            <Header />
                        </div>



                        {this.state.resp.length ?
                            <div>

                                <div className='roster-container-title'><h1 className='rosters-title-h1'>Roster</h1></div>

                                <div className='roster-container' >
                                    <a href='/#/roster'><button className='roster-container-button-new'>+ New</button></a>
                                    <button className='roster-container-button-new-1'></button>
                                    <button className='roster-container-button-new-1'></button>
                                    <button className='roster-container-button-new'>Import</button>
                                    <button className='roster-container-button-new'>Export</button>
                                    <button className='roster-container-button-new'>Settings</button>

                                </div>

                                <div className='roster-container-title'>

                                    <div className='roster-container-name-title'>First Name</div>
                                    <div className='roster-container-name-title'>Last Name</div>
                                    <div className='roster-container-name-title'>Jersery #</div>
                                    <div className='roster-container-name-title'>Phone #</div>
                                    <div className='roster-container-name-title'>Email</div>
                                    <div className='roster-container-name-title'>D.O.B.</div>
                                    <div className='roster-container-button-edit-title'> </div>
                                    <div className='roster-container-button-delete-title'> </div>
                                </div>

                                {rosterToDisplay} </div> : <div className='center-circle'>
                                <div className='no-roster-text'>Looks like you haven't created a roster yet :(</div>
                                <div className='roster-icon'><img className='roster-logo' src='/roster.svg' alt='player-icon' /></div>
                                <div ><a href='/#/roster'><button className='add-roster-button'>+ Add a Roster</button></a></div>
                            </div>}

                        

                    </div></center>
                </Desktop>


                <Tablet>

                    <center><div className="homeroster-tablet">

                        <div className='homeroster-header-tablet'>
                            <Header />
                        </div>



                        {this.state.resp.length ?
                            <div>

                                <div><h1 className='rosters-title-h1-tablet'>Roster</h1></div>

                                <div className='roster-container-tablet-aaa' >
                                    <a href='/#/roster'><button className='roster-container-button-new-tablet'>+ New</button></a>
                                    <button className='roster-container-button-new-tablet'>Import</button>
                                    <button className='roster-container-button-new-tablet'>Export</button>
                                    <button className='roster-container-button-new-tablet'>Settings</button>

                                </div>

                                <div className='roster-container-title-tablet'>

                                    <div className='roster-container-name-title-tablet'>First</div>
                                    <div className='roster-container-name-title-tablet'>Last</div>
                                    <div className='roster-container-name-title-tablet'>Jersery #</div>
                                    <div className='roster-container-name-title-tablet'>Phone #</div>
                                    <div className='roster-container-name-title-tablet'>Email</div>
                                    <div className='roster-container-name-title-tablet'>D.O.B.</div>
                                </div>

                                {rosterToDisplayTablet} </div> : <div className='center-circle-tablet'>
                                <div className='no-roster-text-tablet'>Looks like you haven't created a roster yet :(</div>
                                <div className='roster-icon-tablet'><img className='roster-logo-tablet' src='/roster.svg' alt='player-icon' /></div>
                                <div ><a href='/#/roster'><button className='add-roster-button-tablet'>+ Add a Roster</button></a></div>
                            </div>}

                        <div className='homeroster-navvv-tablet'>
                            <Nav />
                        </div>

                    </div></center>

                </Tablet>
            </div>
        )
    }


}

export default HomeRoster;