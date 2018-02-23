import React, { Component } from 'react';
import './Nav.css';


class Nav extends Component {

    render() {
        return (
            <div className='Nav'>

                <ul>

                    <a className='aaa'><li className='RallyAroundUs'><img className='icons' src='/menu.svg' alt='icon'/>RallyAroundUs</li></a>

                    <a className='aaa'><li className='Home'><img className='icons' src='/home.svg' alt='icon'/>Home</li></a>

                    <a className='aaa'><li className='Roster'><img className='roster-icons' src='/roster.svg' alt='icon'/>Roster</li></a>

                    <a className='aaa'><li className='Schedule'><img className='icons' src='/schedule.svg' alt='icon'/>Schedule</li></a>

                </ul>

            </div>
        )
    }


}

export default Nav;