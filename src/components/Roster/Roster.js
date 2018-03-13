import React, { Component } from 'react';
import axios from 'axios';
import './Roster.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;



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
            toast.info('Player Added!');
            setTimeout(() => {this.props.history.push('/homeroster/'+this.state.teams_id)}, 2505)
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to add Player');
        })
    }

    backToHome(e){
        this.props.history.push('/home');
    }


    render() {
        var teamNameToDisplay = this.state.teams.map( (val, i) => {
            return (
                    <option value={val.teams_id} key={i}>{val.team_name}</option>
            )
        })
        return (
            <div>
                <Desktop>
            <div className='roster-page'>
                <ToastContainer autoClose={2500}/>
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='roster-box'>

                    <div><h2 className='create-roster' >Add Player</h2></div>

                    <h4 className='roster-h4'>Team</h4>
                    <select onChange={e => this.handleOnSelect(e)} placeholder=' Select Team' className='roster-inputtt'><option>Select Team</option>{teamNameToDisplay}</select>
                    <h4 className='roster-h4'>Jersery #</h4>
                    <input className='roster-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 23' name='jersey_number' type='text' />
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
                    <button className='roster-cancel-button' onClick={ e => this.backToHome(e)}>Cancel</button>
                    <button className='roster-submit-button' onClick={ e => this.handleOnClick(e)}>+ Add Player</button>


                </form>

            </div>
            </Desktop>


            <Tablet>

                <div className='roster-page-tablet'>
                <ToastContainer autoClose={2500}/>
                

                <div>
                    <Header />
                </div>

                <form className='roster-box-tablet'>

                    <div><h2 className='create-roster-tablet' >Add Player</h2></div>

                    <h4 className='roster-h4-tablet'>Team</h4>
                    <select onChange={e => this.handleOnSelect(e)} placeholder=' Select Team' className='roster-inputtt-tablet'><option>Select Team</option>{teamNameToDisplay}</select>
                    <h4 className='roster-h4-tablet'>Jersery #</h4>
                    <input className='roster-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  ex. 23' name='jersey_number' type='text' />
                    <h4 className='roster-h4-tablet'>First Name</h4>
                    <input className='roster-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  First Name' name='first_name' type='text' />
                    <h4 className='roster-h4-tablet'>Last Name</h4>
                    <input className='roster-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Last Name' name='last_name' type='text' />
                    <h4 className='roster-h4-tablet'>Phone #</h4>
                    <input className='roster-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  ex. 4357731375' name='phone_number' type='text' />
                    <h4 className='roster-h4-tablet'>Email</h4>
                    <input className='roster-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Email' name='email' type='text' />
                    <h4 className='roster-h4-tablet'>Birthday</h4>
                    <input className='roster-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  ex. 01/09/1995' name='date_of_birth' type='text' />
                    <button className='roster-cancel-button-tablet' onClick={ e => this.backToHome(e)}>Cancel</button>
                    <button className='roster-submit-button-tablet' onClick={ e => this.handleOnClick(e)}>+ Add Player</button>


                </form>

                <div>
                    <Nav />
                </div>

            </div>

            </Tablet>
            </div>
        )
    }
}

export default Roster;