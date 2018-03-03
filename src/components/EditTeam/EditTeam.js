import React, { Component } from 'react';
import axios from 'axios';
import './EditTeam.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';


class EditTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team_name: '',
            sport: '',
            time_zone: '',
            country: '',
            zip_code: null,
            logo: '',
            teams_id: null
        }
    }

    componentDidMount() {
        axios.get('/api/teams/' + this.props.match.params.id).then( resp => {
            console.log(resp);
            var data = resp.data[0]
            this.setState({
                team_name: data.team_name,
            sport: data.sport,
            time_zone: data.time_zone,
            country: data.country,
            zip_code: data.zip_code,
            logo: data.logo,
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
        axios.put('/api/teams/' + this.props.match.params.id, { team_name: this.state.team_name, sport: this.state.sport, time_zone: this.state.time_zone, country: this.state.country, zip_code: this.state.zip_code, logo: this.state.logo, teams_id: this.state.teams_id }).then(resp => {
            console.log(resp);
            toast.info('Team Edited!');
            setTimeout(() => {this.props.history.push('/home')}, 2505)
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to edit Team');
        })
    }


    render() {
        return (
            <div className='edit-team-page'>
                <ToastContainer autoClose={2500} />
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='edit-team-box'>

                    <div><h2 className='edit-your-team' >Edit Your Team</h2></div>

                    <h4 className='edit-team-h4'>Team Name</h4>
                    <input value={this.state.team_name} className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  This can be changged anytime' name='team_name' type='text' />
                    <h4 className='edit-team-h4'>Sport</h4>
                    <input value={this.state.sport} className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  Sport' name='sport' type='text' />
                    <h4 className='edit-team-h4'>Time Zone</h4>
                    <select value={this.state.time_zone} className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  This helps with scheduling and such' name='time_zone' type='text'>
                        <option value=''></option>
                        <option value='Hawaii'>Hawaii</option>
                        <option value='Alaskan'>Alaskan</option>
                        <option value='Pacific'>Pacific</option>
                        <option value='Mountain'>Mountain</option>
                        <option value='Mountain (Arizona)'>Mountain (Arizona)</option>
                        <option value='Central'>Central</option>
                        <option value='Eastern'>Eastern</option>
                    </select>
                    <h4 className='edit-team-h4'>Country</h4>
                    <input value={this.state.country} className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  Country' name='country' type='text' />
                    <h4 className='edit-team-h4'>Zip/Postal</h4>
                    <input value={this.state.zip_code} className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  Zip' name='zip_code' type='text' />
                    {/* <h4 className='edit-team-h4'>Logo</h4>
                    <input onChange={e => this.handleOnChange(e)} placeholder='  Logo' name='logo' type='text' src='submit.gif' /> */}
                    <button className='edit-team-cancel-button' type='reset' value='Cancel'>Clear</button>
                    <button className='edit-team-submit-button' onClick={ e => this.saveChanges(e)}>Save Team Info</button>


                </form>

            </div>
        )
    }
}

export default EditTeam;