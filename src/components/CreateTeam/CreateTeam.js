import React, { Component } from 'react';
import axios from 'axios';
import './CreateTeam.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;



class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team_name: '',
            sport: '',
            time_zone: '',
            country: '',
            zip_code: null,
            logo: '',
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, console.log(this.state))
    }

    handleOnClick(e) {
        e.preventDefault();
        axios.post('/api/teams', { team_name: this.state.team_name, sport: this.state.sport, time_zone: this.state.time_zone, country: this.state.country, zip_code: this.state.zip_code, logo: this.state.logo }).then(resp => {
            console.log(resp);
            toast.info('Team Added!');
            setTimeout(() => {this.props.history.push('/home')}, 2505)
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to add Team');
        })
    }

    backToHome(e){
        this.props.history.push('/home');
    }



    render() {
        return (
            <div>
                <Desktop>
            <div className='create-team-page'>
                <ToastContainer autoClose={2500} />
                <div>
                    <Nav />
                </div>

                <div>
                    <Header />
                </div>

                <form className='create-team-box'>

                    <div><h2 className='create-your-team' >Create Your Team</h2></div>

                    <h4 className='create-team-h4'>Team Name</h4>
                    <input className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  This can be changed anytime' name='team_name' type='text' />
                    <h4 className='create-team-h4'>Sport</h4>
                    <input className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  Sport' name='sport' type='text' />
                    <h4 className='create-team-h4'>Time Zone</h4>
                    <select className='creat-inputtt' onChange={e => this.handleOnChange(e)} placeholder='  This helps with scheduling and such' name='time_zone' type='text'>
                        <option value=''></option>
                        <option value='Hawaii'>Hawaii</option>
                        <option value='Alaskan'>Alaskan</option>
                        <option value='Pacific'>Pacific</option>
                        <option value='Mountain'>Mountain</option>
                        <option value='Mountain (Arizona)'>Mountain (Arizona)</option>
                        <option value='Central'>Central</option>
                        <option value='Eastern'>Eastern</option>
                    </select>
                    <h4 className='create-team-h4'>Country</h4>
                    <input className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  Country' name='country' type='text' />
                    <h4 className='create-team-h4'>Zip/Postal</h4>
                    <input className='creat-input' onChange={e => this.handleOnChange(e)} placeholder='  Zip' name='zip_code' type='text' />
                    {/* <h4 className='create-team-h4'>Logo</h4>
                    <input onChange={e => this.handleOnChange(e)} placeholder='  Logo' name='logo' type='text' src='submit.gif' /> */}
                    <button className='create-team-cancel-button' onClick={ e => this.backToHome(e)}>Cancel</button>
                    <button className='create-team-submit-button' onClick={ e => this.handleOnClick(e)}>+ Add team</button>


                </form>

            </div>
            </Desktop>


            <Tablet>

                  <div className='create-team-page-tablet'>
                <ToastContainer autoClose={2500} />
                

                <div>
                    <Header />
                </div>

                <form className='create-team-box-tablet'>

                    <div><h2 className='create-your-team-tablet' >Create Your Team</h2></div>

                    <h4 className='create-team-h4-tablet'>Team Name</h4>
                    <input className='creat-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  This can be changed anytime' name='team_name' type='text' />
                    <h4 className='create-team-h4-tablet'>Sport</h4>
                    <input className='creat-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Sport' name='sport' type='text' />
                    <h4 className='create-team-h4-tablet'>Time Zone</h4>
                    <select className='creat-inputtt-tablet' onChange={e => this.handleOnChange(e)} placeholder='  This helps with scheduling and such' name='time_zone' type='text'>
                        <option value=''></option>
                        <option value='Hawaii'>Hawaii</option>
                        <option value='Alaskan'>Alaskan</option>
                        <option value='Pacific'>Pacific</option>
                        <option value='Mountain'>Mountain</option>
                        <option value='Mountain (Arizona)'>Mountain (Arizona)</option>
                        <option value='Central'>Central</option>
                        <option value='Eastern'>Eastern</option>
                    </select>
                    <h4 className='create-team-h4-tablet'>Country</h4>
                    <input className='creat-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Country' name='country' type='text' />
                    <h4 className='create-team-h4-tablet'>Zip/Postal</h4>
                    <input className='creat-input-tablet' onChange={e => this.handleOnChange(e)} placeholder='  Zip' name='zip_code' type='text' />
                    {/* <h4 className='create-team-h4-tablet'>Logo</h4>
                    <input onChange={e => this.handleOnChange(e)} placeholder='  Logo' name='logo' type='text' src='submit.gif' /> */}
                    <button className='create-team-cancel-button-tablet' onClick={ e => this.backToHome(e)}>Cancel</button>
                    <button className='create-team-submit-button-tablet' onClick={ e => this.handleOnClick(e)}>+ Add team</button>


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

export default CreateTeam;
