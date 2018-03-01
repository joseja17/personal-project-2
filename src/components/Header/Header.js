import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import './Header.css';




class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown: false,
            dropdownTeam: false
        }

        this.onClick = this.onClick.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onClickTeam = this.onClickTeam.bind(this);
        this.mouseLeaveTeam = this.mouseLeaveTeam.bind(this);
        

    }
    componentDidMount() {
        this.props.getUser();
    }

    onClick() {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }

    onClickTeam() {
        this.setState({
            dropdownTeam: !this.state.dropdownTeam
        })
    }

    mouseLeave() {
        this.setState({
            dropdown: false
        })
    }

    mouseLeaveTeam() {
        this.setState({
            dropdownTeam: false
        })
    }

    render() {
        let { userData } = this.props;
        return (
            <nav className='nav-body'>

                <div className='div'></div>

                <div className='div1'><img className="rallylogo" src="/logo.svg" alt='rally-logo' /></div>

                <div className='dropdowns'>

                    {/* <div className='whole-dropdown1'>
                        <div className='teams'><h2 onMouseEnter={this.onClickTeam} className='h2-teams'>Teams</h2></div>
                        {
                            this.state.dropdownTeam ?
                            <div onMouseLeave={this.mouseLeaveTeam} className='dropdown1'>
                                <div>SC Rugby</div>
                                <hr className='hr1'/>
                                <div>SC Football</div>
                                <hr className='hr1'/>
                                <div><button className='create-team'>+ Create Team</button></div>

                            </div>
                            : null
                        }
                    </div> */}

                    <div className='whole-dropdown'>
                        <span onMouseEnter={this.onClick} className="span">{userData.img ? <img className='avatar' src={userData.img} alt='avatar' /> : null} </span>
                        {
                            this.state.dropdown ?
                                <div onMouseLeave={this.mouseLeave} className='dropdown'>
                                    <a className='aaa' href='/#/home'><div className='manage-teams'>Manage teams</div></a>
                                    <hr className='hr' />
                                    <div>Account Settings</div>
                                    <hr className='hr' />
                                    <div>Billing/Plans</div>
                                    <hr className='hr' />
                                    <div>Change Account Name</div>
                                    <hr className='hr' />
                                    <a className='logout' href='http://localhost:3005/logout'>Logout</a>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Header);

/* <a href='http://localhost:3005/logout'></a> */