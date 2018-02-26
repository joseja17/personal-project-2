import React, { Component } from 'react';
import axios from 'axios';
import './Roster.css';
import Nav from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Nav/Nav.js';
import Header from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';



class Roster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jersey_number: '',
            photo: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            date_of_birth: '',
            teams: [],
            teams_id: null
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount() {
        axios.get('/api/teams').then( teams => {
            console.log(teams)
            this.setState({
                teams: teams.data
            },() => console.log(this.state.teams))
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
        },() => console.log(this.state.teams_id))
    }

    handleOnClick(e) {
        e.preventDefault();
        axios.post('/api/roster', { jersey_number: this.state.jersey_number, photo: this.state.photo, first_name: this.state.first_name, last_name: this.state.last_name, phone_number: this.state.phone_number, email: this.state.email, date_of_birth: this.state.date_of_birth, teams_id: this.state.teams_id }).then(resp => {
            console.log(resp);
            toast.success('Player Added!');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to add Player');
        })
    }


    render() {
        var teamNameToDisplay = this.state.teams.map( (val, i) => {
            return (
                    <option value={val.teams_id} key={i}>{val.team_name}</option>
            )
        })
        return (
            <div className='roster-page'>
                <ToastContainer />
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='roster-box'>

                    <div><h2 className='create-roster' >Add Player</h2></div>

                    <h4 className='roster-h4'>Team</h4>
                    <select onChange={e => this.handleOnSelect(e)} placeholder=' Select Team' className='roster-input'>{teamNameToDisplay}</select>
                    <h4 className='roster-h4'>Jersery #</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 23' name='jersey_number' type='text' />
                    <h4 className='roster-h4'>Photo</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  Photo' name='photo' type='text' />
                    <h4 className='roster-h4'>First Name</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  First Name' name='first_name' type='text' />
                    <h4 className='roster-h4'>Last Name</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  Last Name' name='last_name' type='text' />
                    <h4 className='roster-h4'>Phone #</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 4357731375' name='phone_number' type='text' />
                    <h4 className='roster-h4'>Email</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  Email' name='email' type='text' />
                    <h4 className='roster-h4'>Birthday</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 01/09/1995' name='date_of_birth' type='text' />
                    <button className='roster-cancel-button' type='reset' value='Cancel'>Cancel</button>
                    <button className='roster-submit-button' onClick={ e => this.handleOnClick(e)}>+ Add Player</button>


                </form>

            </div>
        )
    }
}

export default Roster;