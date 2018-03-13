import React, { Component } from 'react';
import './Nav.css';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;


class Nav extends Component {

    render() {
        return (
            <div>
                <Desktop>
                    <div className='Nav'>

                        <ul>

                            <a href='https://www.rallyaroundus.com/home' target="_blank" className='aaa'><li className='RallyAroundUs'><img className='icons' src='/menu.svg' alt='icon' />RallyAroundUs</li></a>

                            <a href='/#/home' className='aaa'><li className='Home'><img className='icons' src='/home.svg' alt='icon' />Home</li></a>

                            <a href='/#/roster' className='aaa'><li className='Roster'><img className='roster-icons' src='/roster.svg' alt='icon' />Add Player</li></a>

                            <a href='/#/schedule' className='aaa'><li className='Schedule'><img className='icons' src='/schedule.svg' alt='icon' />Add Event</li></a>

                            <a href='/#/payment' className='aaa'><li className='Donate'><img className='icons' src='/donate.svg' alt='icon' />Donate</li></a>

                        </ul>

                    </div>
                </Desktop>


                <Tablet>

                    <div className='Nav-tablet'>

                        <ul className='ul-tablet'>

                            <a href='https://www.rallyaroundus.com/home' target="_blank" className='aaa-tablet'><li className='RallyAroundUs-tablet'><img className='icons-tablet' src='/menu.svg' alt='icon' /></li></a>

                            <a href='/#/home' className='aaa-tablet'><li className='Home-tablet'><img className='icons-tablet' src='/home.svg' alt='icon' /></li></a>

                            <a href='/#/roster' className='aaa-tablet'><li className='Roster-tablet'><img className='roster-icons-tablet' src='/roster.svg' alt='icon' /></li></a>

                            <a href='/#/schedule' className='aaa-tablet'><li className='Schedule-tablet'><img className='icons-tablet' src='/schedule.svg' alt='icon' /></li></a>

                            <a href='/#/payment' className='aaa-tablet'><li className='Donate-tablet'><img className='icons-tablet' src='/donate.svg' alt='icon' /></li></a>

                        </ul>

                    </div>

                </Tablet>
            </div>
        )
    }


}

export default Nav;