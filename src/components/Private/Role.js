import React, { Component } from 'react';
import Header from './../Header/Header.js';
import './Role.css';


import { connect } from 'react-redux';
import { getUser } from './../../ducks/users.js';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;


class Role extends Component {




    componentDidMount() {
        this.props.getUser();
    }



    render() {




        let { userData } = this.props;




        return (
            <div>
                <Desktop>
                    <div className="App">

                        <div className='header'>
                            <Header />
                        </div>







                        <div className='title'>
                            <h1 className='h1'>Hey {userData.user_name ? userData.user_name : null}, Whats your Role?</h1>
                        </div>

                        <div className='pictures'>
                            <img className='img' src='/coach.svg' alt='coach' />
                            <img className='img1' src='/player.svg' alt='player' />
                        </div>

                        <div className='role'>
                            <h2 className='h2'>Coach/Manager</h2>
                            <h2 className='h21'>Team Member</h2>
                        </div>

                        <div className='buttons'>
                            <a href='/#/home'><button className='button'>Your Teams</button></a>
                            <button className='button1'>Find Team</button>
                        </div>

                    </div>
                </Desktop>

                <Tablet>

                    <div className="App-tablet">

                        <div className='header-tablet'>
                            <Header />
                        </div>





                        <div className='title-tablet'>
                            <h1 className='h1-tablet'>Hey {userData.user_name ? userData.user_name : null}, Whats your Role?</h1>
                        </div>

                        <div className='pictures-tablet'>
                            <img className='img-tablet' src='/coach.svg' alt='coach' />
                            <img className='img1-tablet' src='/player.svg' alt='player' />
                        </div>

                        <div className='role-tablet'>
                            <h2 className='h2-tablet'>Coach/Manager</h2>
                            <h2 className='h21-tablet'>Team Member</h2>
                        </div>

                        <div className='buttons-tablet'>
                            <a href='/#/home'><button className='button-tablet'>Your Teams</button></a>
                            <button className='button1-tablet'>Find Team</button>
                        </div>

                    </div>

                </Tablet>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {
        userData: state.user
    }
}




export default connect(mapStateToProps, { getUser })(Role);