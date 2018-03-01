import React, { Component } from 'react';
import axios from 'axios';
import './Schedule.css';
import Nav from './components/Nav/Nav.js';
import Header from './components/Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';



class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_name: '',
            event_date: '',
            event_time: '',
            event_location: '',
            teams: [],
            teams_id: null
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount() {
        axios.get('/api/teams').then(teams => {
            console.log(teams)
            this.setState({
                teams: teams.data
            }, () => console.log(this.state.teams))
        })
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, console.log(this.state))
    }

    handleOnSelect(e) {
        this.setState({
            teams_id: e.target.value
        }, () => console.log(this.state.teams_id))
    }

    handleOnClick(e) {
        e.preventDefault();
        axios.post('/api/schedule', { event_name: this.state.event_name, event_date: this.state.event_date, event_time: this.state.event_time, event_location: this.state.event_location, teams_id: this.state.teams_id }).then(resp => {
            console.log(resp);
            toast.success('Event Added!');
            setTimeout(() => {this.props.history.push('/homeschedule/'+this.state.teams_id)}, 2505)
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to add Event');
        })
    }


    render() {
        var teamNameToDisplay = this.state.teams.map((val, i) => {
            return (
                <option value={val.teams_id} key={i}>{val.team_name}</option>
            )
        })
        return (
            <div className='schedule-page'>
                <ToastContainer autoClose={2500}/>
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='schedule-box'>

                    <div><h2 className='schedule-event' >Add Event</h2></div>

                    <h4 className='roster-h4'>Team</h4>
                    <select onChange={e => this.handleOnSelect(e)} className='schedule-input'><option>Select Team</option>{teamNameToDisplay}</select>
                    <h4 className='schedule-h4'>Event</h4>
                    <input className='schedule-input' onChange={e => this.handleOnChange(e)} placeholder='  This can be changged anytime' name='event_name' type='text' />
                    <h4 className='schedule-h4'>Date</h4>
                    <input className='schedule-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 01/08/2018' name='event_date' type='date' />
                    <h4 className='schedule-h4'>Time</h4>
                    <input className='schedule-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 06:30pm' name='event_time' type='text' />
                    <h4 className='schedule-h4'>Location</h4>
                    <input className='schedule-input' onChange={e => this.handleOnChange(e)} placeholder='  Location' name='event_location' type='text' />
                    <button className='schedule-cancel-button' type='reset' value='Cancel'>Cancel</button>
                    <button className='schedule-submit-button' onClick={e => this.handleOnClick(e)}>+ Add Event</button>


                </form>

            </div>
        )
    }
}

export default Schedule;
