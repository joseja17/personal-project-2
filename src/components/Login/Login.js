import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="App">

                <div className='header'>
                    <img className="rally-logo" src="/logo.svg" alt='rally-logo' />
                </div>

                <div className="splash-screen">

                    <h2 className="helo">Sign Up</h2>
                    <a className='google-a'href={process.env.REACT_APP_LOGIN}>
                        <button className="signup-google"><img className='signup-google-logo' src="/google.svg" alt='google-logo'/>Sign up with Google</button></a>
                    <div className='or-div'><hr /><h4 className='or'>or</h4><hr /></div>
                    <a className='email-a'href={process.env.REACT_APP_LOGIN}><button className="signup-email">Sign up with Email</button>
                        <h4 className='account-already'>Already have an account?</h4></a>

                </div>


            </div>
        )
    }
}