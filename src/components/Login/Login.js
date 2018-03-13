import React, { Component } from 'react';
import './Login.css';
import Responsive from 'react-responsive';

export default class Login extends Component {
    render() {


        const Desktop = props => <Responsive {...props} minWidth={1025} />;
        const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;


        return (
            <div>

            <Desktop>

                <div className="App">

                    <div className='header'>
                        <img className="rally-logo" src="/logo.svg" alt='rally-logo' />
                    </div>

                    <div className="splash-screen">

                        <h2 className="helo">Sign Up</h2>
                        <a className='google-a' href={process.env.REACT_APP_LOGIN}>
                            <button className="signup-google"><img className='signup-google-logo' src="/google.svg" alt='google-logo' />Sign up with Google</button></a>
                        <div className='or-div'><hr /><h4 className='or'>or</h4><hr /></div>
                        <a className='email-a' href={process.env.REACT_APP_LOGIN}><button className="signup-email">Sign up with Email</button>
                            <h4 className='account-already'>Already have an account?</h4></a>

                    </div>


                </div>

            </Desktop>

            <Tablet>

                <div className="App-tablet">

                    <div className='header-tablet'>
                        <img className="rally-logo-tablet" src="/logo.svg" alt='rally-logo' />
                    </div>

                    <div className="splash-screen-tablet">

                        <h2 className="helo-tablet">Sign Up</h2>
                        <a className='google-a-tablet' href={process.env.REACT_APP_LOGIN}>
                            <button className="signup-google-tablet"><img className='signup-google-logo-tablet' src="/google.svg" alt='google-logo' />Sign up with Google</button></a>
                        <div className='or-div-tablet'><hr /><h4 className='or-tablet'>or</h4><hr /></div>
                        <a className='email-a-tablet' href={process.env.REACT_APP_LOGIN}><button className="signup-email-tablet">Sign up with Email</button>
                            <h4 className='account-already-tablet'>Already have an account?</h4></a>

                    </div>


                </div>

            </Tablet>

            </div>
        )
    }
}