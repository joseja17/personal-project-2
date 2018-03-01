import React, { Component } from 'react';
import axios from 'axios';
import './EditEvent.css';
import Nav from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Nav/Nav.js';
import Header from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';



class EditEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_name: '',
            event_date: '',
            event_time: '',
            event_location: '',
            teams_id: null,
            team_name: ''
        }

        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        axios.get('/api/schedule/' + this.props.match.params.id).then(resp => {
            console.log(resp)
            var data = resp.data[0]
            this.setState({
                event_name: data.event_name,
                event_date: data.event_date,
                event_time: data.event_time,
                event_location: data.event_location,
                team_name: data.team_name,
                teams_id: data.teams_id
            })
        })
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, console.log(this.state))
    }

    saveChanges(e) {
        e.preventDefault();
        axios.put('/api/schedule/' + this.props.match.params.id, { event_name: this.state.event_name, event_date: this.state.event_date, event_time: this.state.event_time, event_location: this.state.event_location, teams_id: this.state.teams_id, team_name: this.state.team_name }).then(resp => {
            console.log(resp);
            toast.success('Event Saved!');
            setTimeout(() => {this.props.history.push('/homeschedule/'+this.state.teams_id)}, 2505)
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to edit Event');
        })
    }


    render() {
        return (
            <div className='EditEvent-page'>
                <ToastContainer autoClose={2500}/>
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='EditEvent-box'>

                    <div><h2 className='EditEvent-event' >Edit Event</h2></div>

                    <h4 className='EditEvent-h4'>{this.state.team_name}</h4>
                    
                    <h4 className='EditEvent-h4'>Event</h4>
                    <input value={this.state.event_name} className='EditEvent-input' onChange={e => this.handleOnChange(e)} placeholder='  This can be changged anytime' name='event_name' type='text' />
                    <h4 className='EditEvent-h4'>Date</h4>
                    <input value={this.state.event_date} className='EditEvent-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 01/08/2018' name='event_date' type='text' />
                    <h4 className='EditEvent-h4'>Time</h4>
                    <input value={this.state.event_time} className='EditEvent-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 06:30pm' name='event_time' type='text' />
                    <h4 className='EditEvent-h4'>Location</h4>
                    <input value={this.state.event_location} className='EditEvent-input' onChange={e => this.handleOnChange(e)} placeholder='  Location' name='event_location' type='text' />
                    <button className='EditEvent-cancel-button' type='reset' value='Cancel'>Clear</button>
                    <button className='EditEvent-submit-button' onClick={e => this.saveChanges(e)}>Save Event</button>


                </form>

            </div>
        )
    }
}

export default EditEvent;