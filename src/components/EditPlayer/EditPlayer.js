import React, { Component } from 'react';
import axios from 'axios';
import './EditPlayer.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;



class EditPlayer extends Component {
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
            teams_id: null,
            team_name: ''
        }

        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        axios.get('/api/roster/' + this.props.match.params.id).then(resp => {
            console.log(resp)
            var data = resp.data[0]
            this.setState({
            jersey_number: data.jersey_number,
            photo: data.photo,
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            email: data.email,
            date_of_birth: data.date_of_birth,
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
        axios.put('/api/roster/' + this.props.match.params.id, { jersey_number: this.state.jersey_number, photo: this.state.photo, first_name: this.state.first_name, last_name: this.state.last_name, phone_number: this.state.phone_number, email: this.state.email, date_of_birth: this.state.date_of_birth, team_name: this.state.team_name, teams_id: this.state.teams_id }).then(resp => {
            console.log(resp);
            toast.info('Player Saved!');
            setTimeout(() => {this.props.history.push('/homeroster/'+this.state.teams_id)}, 2505)
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to edit Player');
        })
    }


    render() {
        return (
            <div>
                <Desktop>
            <div className='EditPlayer-page'>
                <ToastContainer autoClose={2500}/>
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='EditPlayer-box'>

                    <div><h2 className='EditPlayer-event' >Edit Player</h2></div>

                    <h4 className='this-state-team-name-h4-player'>{this.state.team_name}</h4>
                    
                    <h4 className='EditPlayer-h4-jersey'>Jersery #</h4>
                    <input value={this.state.jersey_number} className='EditPlayer-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 23' name='jersey_number' type='text' />
                    <h4 className='EditPlayer-h4'>First Name</h4>
                    <input value={this.state.first_name} className='EditPlayer-input' onChange={e => this.handleOnChange(e)} placeholder='  First Name' name='first_name' type='text' />
                    <h4 className='EditPlayer-h4'>Last Name</h4>
                    <input value={this.state.last_name} className='EditPlayer-input' onChange={e => this.handleOnChange(e)} placeholder='  Last Name' name='last_name' type='text' />
                    <h4 className='EditPlayer-h4'>Phone #</h4>
                    <input value={this.state.phone_number} className='EditPlayer-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 4357731375' name='phone_number' type='text' />
                    <h4 className='EditPlayer-h4'>Email</h4>
                    <input value={this.state.email} className='EditPlayer-input' onChange={e => this.handleOnChange(e)} placeholder='  Email' name='email' type='text' />
                    <h4 className='EditPlayer-h4'>Birthday</h4>
                    <input value={this.state.date_of_birth} className='EditPlayer-input' onChange={e => this.handleOnChange(e)} placeholder='  ex. 01/09/1995' name='date_of_birth' type='text' />
                    <button className='EditPlayer-cancel-button' type='reset' value='Cancel'>Clear</button>
                    <button className='EditPlayer-submit-button' onClick={ e => this.saveChanges(e)}>Save Player</button>


                </form>

            </div>
            </Desktop>


            <Tablet>

                <div className='EditPlayer-page-tablet'>
                <ToastContainer autoClose={2500}/>
                

                <div>
                    <Header />
                </div>

                <form className='EditPlayer-box-tablet'>

                    <div><h2 className='EditPlayer-event-tablet' >Edit Player</h2></div>

                    <h4 className='this-state-team-name-h4-player-tablet'>{this.state.team_name}</h4>
                    
                    <h4 className='EditPlayer-h4-jersey-tablet'>Jersery #</h4>
                    <input value={this.state.jersey_number} className='EditPlayer-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  ex. 23' name='jersey_number' type='text' />
                    <h4 className='EditPlayer-h4-tablet' >First Name</h4>
                    <input value={this.state.first_name} className='EditPlayer-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  First Name' name='first_name' type='text' />
                    <h4 className='EditPlayer-h4-tablet' >Last Name</h4>
                    <input value={this.state.last_name} className='EditPlayer-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Last Name' name='last_name' type='text' />
                    <h4 className='EditPlayer-h4-tablet' >Phone #</h4>
                    <input value={this.state.phone_number} className='EditPlayer-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  ex. 4357731375' name='phone_number' type='text' />
                    <h4 className='EditPlayer-h4-tablet' >Email</h4>
                    <input value={this.state.email} className='EditPlayer-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Email' name='email' type='text' />
                    <h4 className='EditPlayer-h4-tablet' >Birthday</h4>
                    <input value={this.state.date_of_birth} className='EditPlayer-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  ex. 01/09/1995' name='date_of_birth' type='text' />
                    <button className='EditPlayer-cancel-button-tablet' type='reset' value='Cancel'>Clear</button>
                    <button className='EditPlayer-submit-button-tablet' onClick={ e => this.saveChanges(e)}>Save Player</button>


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

export default EditPlayer;