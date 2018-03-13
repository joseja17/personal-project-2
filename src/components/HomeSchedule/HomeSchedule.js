import React, { Component } from 'react';
import './HomeSchedule.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;


class HomeSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resp: [""],
            firstLoad: true
        }
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        axios.get('/api/schedule' + this.props.match.params.id).then(resp => {
            console.log(resp)
            this.setState({
                resp: resp.data,
                firstLoad: false

            })
        })
    }

    deleteEvent(id, teamsID) {
        var r = window.confirm('Are you sure you want to delete this event?');
        if (r === true) {
            axios.delete('/api/schedule/' + id + '/' + teamsID).then(resp => {
                console.log(resp.data)
                this.setState({
                    resp: resp.data
                })
            })
        }
    }

    render() {
        var scheduleToDisplay = this.state.resp.map((val, i) => {
            return (
                <div key={i} className='schedule-container'>
                    <div className='schedule-container-name'>{val.event_name}</div>
                    <div className='schedule-container-sport'>{val.event_date}</div>
                    <div className='schedule-container-time-zone'>{val.event_time}</div>
                    <div className='schedule-container-country'>{val.event_location}</div>
                    <Link to={'/editevent/' + val.schedule_id}><button className='schedule-container-button-edit'>Edit</button></Link>
                    <button className='schedule-container-button-delete' onClick={() => this.deleteEvent(val.schedule_id, val.teams_id)}>Delete</button>
                </div>
            )
        })

        var scheduleToDisplayTablet = this.state.resp.map((val, i) => {
            return (
                <div key={i} className='schedule-container-tablet'>
                <div className='schedule-container-info-tablet'>
                    <div className='schedule-container-name-tablet'>{val.event_name}</div>
                    <div className='schedule-container-sport-tablet'>{val.event_date}</div>
                    <div className='schedule-container-time-zone-tablet'>{val.event_time}</div>
                    <div className='schedule-container-country-tablet'>{val.event_location}</div>
                    </div>
                    <hr className='hr-tablet-aaa'/>
                    <div className='schedule-container-buttons-tablet'>
                    <Link to={'/editevent/' + val.schedule_id}><button className='schedule-container-button-edit-tablet'>Edit</button></Link>
                    <button className='schedule-container-button-delete-tablet' onClick={() => this.deleteEvent(val.schedule_id, val.teams_id)}>Delete</button>
                </div>
                </div>
            )
        })

        return (
            <div>
                <Desktop>
                    <center><div className="homeschedule">

                        <div className='homeschedule-navvv'>
                            <Nav />
                        </div>

                        <div className='homeschedule-header'>
                            <Header />
                        </div>


                        {this.state.resp.length ?
                            <div>
                                <div className='schedule-container-title'><h1 className='schedules-title-h1'>Schedule</h1></div>

                                <div className='schedule-container' >
                                    <a href='/#/schedule'><button className='schedule-container-button-new'>+ New</button></a>
                                    <button className='schedule-container-button-new-1'></button>
                                    <button className='schedule-container-button-new-1'></button>
                                    <button className='schedule-container-button-new'>Import</button>
                                    <button className='schedule-container-button-new'>Export</button>
                                    <button className='schedule-container-button-new'>Settings</button>

                                </div>

                                <div className='schedule-container-title'>
                                    <div className='schedule-container-name-title'>Event</div>
                                    <div className='schedule-container-name-title'>Date</div>
                                    <div className='schedule-container-name-title'>Time</div>
                                    <div className='schedule-container-name-title'>Location</div>
                                    <div className='schedule-container-name-title'></div>
                                    <div className='schedule-container-button-edit-title'> </div>
                                    <div className='schedule-container-button-delete-title'> </div>
                                </div>

                                {scheduleToDisplay} </div> : <div className='center-circle'>
                                <div className='no-schedule-text'>Looks like you haven't created an event yet :(</div>
                                <div className='schedule-icon'><img className='schedule-logo' src='/calendar.svg' alt='player-icon' /></div>
                                <div ><a href='/#/schedule'><button className='add-schedule-button'>+ Add an event</button></a></div>
                            </div>}

                    </div></center>
                </Desktop>


                <Tablet>

                    <center><div className="homeschedule-tablet">



                        <div className='homeschedule-header-tablet'>
                            <Header />
                        </div>


                        {this.state.resp.length ?
                            <div>
                                <div><h1 className='schedules-title-h1-tablet'>Schedule</h1></div>

                                <div className='schedule-container-tablet-aaa' >
                                    <a href='/#/schedule'><button className='schedule-container-button-new-tablet'>+ New</button></a>
                                    <button className='schedule-container-button-new-tablet'>Import</button>
                                    <button className='schedule-container-button-new-tablet'>Export</button>
                                    <button className='schedule-container-button-new-tablet'>Settings</button>

                                </div>

                                <div className='schedule-container-title-tablet'>
                                    <div className='schedule-container-name-title-tablet'>Event</div>
                                    <div className='schedule-container-name-title-tablet'>Date</div>
                                    <div className='schedule-container-name-title-tablet'>Time</div>
                                    <div className='schedule-container-name-title-tablet'>Location</div>
                                </div>

                                {scheduleToDisplayTablet} </div> : <div className='center-circle-tablet'>
                                <div className='no-schedule-text-tablet'>Looks like you haven't created an event yet :(</div>
                                <div className='schedule-icon-tablet'><img className='schedule-logo-tablet' src='/calendar.svg' alt='player-icon' /></div>
                                <div ><a href='/#/schedule'><button className='add-schedule-button-tablet'>+ Add an event</button></a></div>
                            </div>}

                        <div className='homeschedule-navvv-tablet'>
                            <Nav />
                        </div>

                    </div></center>

                </Tablet>
            </div>
        )
    }


}

export default HomeSchedule;