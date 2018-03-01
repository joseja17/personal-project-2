import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import './Private/Role.css';




import {connect} from 'react-redux';
import {getUser} from './ducks/users.js';





class Role extends Component {




    componentDidMount() {
        this.props.getUser();
     }



    render() {




let {userData} = this.props;




        return (
            <div className="App">

                <div className='header'>
                    <Header />
                </div>


                



                {/* <h3>Hello { userData.user_name ? userData.user_name : null }</h3> */}
                
                {/* <h3>Your account Number is:  { userData.auth_id ? userData.auth_id : null }</h3> */}





                <div className='title'>
                    <h1 className='h1'>Hey { userData.user_name ? userData.user_name : null }, Whats your Role?</h1>
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
        );
    }
}





function mapStateToProps(state) {
    return {
        userData: state.user
    }
}




export default connect(mapStateToProps, {getUser})(Role);