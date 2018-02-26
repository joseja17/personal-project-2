import React, { Component } from 'react';
import './HomeSchedule.css';
import Nav from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Nav/Nav.js';
import Header from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Header/Header.js';
import axios from 'axios';


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
        axios.get('/api/schedule' + this.props.match.params.id).then( resp => {
            console.log(resp)
            this.setState({
                resp: resp.data,
                firstLoad: false

            })
        })
    }

    deleteEvent(id){
        axios.delete('/api/schedule/' + id).then(resp =>{
            console.log(resp)
            console.log(resp.data)
            this.setState({
                resp : resp.data
            })
        })
    }

    render() {
        var scheduleToDisplay = this.state.resp.map( (val, i) => {
            return (
                <div key={i} className='schedule-container'>
                    <div className='schedule-container-name'>{val.event_name}</div>
                    <div className='schedule-container-sport'>{val.event_date}</div>
                    <div className='schedule-container-time-zone'>{val.event_time}</div>
                    <div className='schedule-container-country'>{val.event_location}</div>
                    <button className='schedule-container-button-edit'>Edit</button>
                    <button className='schedule-container-button-delete' onClick={ () => this.deleteEvent(val.schedule_id)}>Delete</button>
                </div>
            )
        })

        return (
            <center><div className="homeschedule">

                <div className='homeschedule-navvv'>
                    <Nav />
                </div>

                <div className='homeschedule-header'>
                    <Header />
                </div>


            { this.state.resp.length ?
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
                    <div className='schedule-container-name-title'></div>
                    <div className='schedule-container-button-edit-title'> </div>
                    <div className='schedule-container-button-delete-title'> </div>
                </div>

                 {scheduleToDisplay} </div> : <div className='center-circle'>
                    <div className='no-schedule-text'>Looks like you haven't created an event yet :(</div>
                    <div className='schedule-icon'><img className='schedule-logo' src='/calendar.svg' alt='player-icon'/></div>
                    <div ><a href='/#/schedule'><button  className='add-schedule-button'>+ Add an event</button></a></div>
                </div>}

            </div></center>
        )
    }


}

export default HomeSchedule;