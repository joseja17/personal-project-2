import React, { Component } from 'react';
import './Nav.css';


class Nav extends Component {

    render() {
        return (
            <div className='Nav'>

                <ul>

                    <a href='https://www.rallyaroundus.com/home' target="_blank" className='aaa'><li className='RallyAroundUs'><img className='icons' src='/menu.svg' alt='icon'/>RallyAroundUs</li></a>

                    <a href='/#/home' className='aaa'><li className='Home'><img className='icons' src='/home.svg' alt='icon'/>Home</li></a>

                    <a href='/#/roster' className='aaa'><li className='Roster'><img className='roster-icons' src='/roster.svg' alt='icon'/>Add Player</li></a>

                    <a href='/#/schedule' className='aaa'><li className='Schedule'><img className='icons' src='/schedule.svg' alt='icon'/>Add Event</li></a>

                    <a href='/#/payment' className='aaa'><li className='Donate'><img className='icons' src='/donate.svg' alt='icon'/>Donate</li></a>

                </ul>

            </div>
        )
    }


}

export default Nav;