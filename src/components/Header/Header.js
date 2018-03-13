import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import './Header.css';
import Responsive from 'react-responsive';




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

        const Desktop = props => <Responsive {...props} minWidth={1025} />;
        const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;

        let { userData } = this.props;
        return (
            <div>
                <Desktop>
                    <nav className='nav-body'>

                        <div className='div'></div>

                        <div className='div1'><img className="rallylogo" src="/logo.svg" alt='rally-logo' /></div>

                        <div className='dropdowns'>

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
                                            <a className='logout' href={process.env.REACT_APP_LOCALHOST_3005 + '/logout'}>Logout</a>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </nav>
                </Desktop>


                <Tablet>

                    <nav className='nav-body-tablet'>

                        <div className='div-tablet'></div>

                        <div className='div1-tablet'><img className="rallylogo-tablet" src="/logo.svg" alt='rally-logo' /></div>

                        <div className='dropdowns-tablet'>

                            <div className='whole-dropdown-tablet'>
                                <span onClick={this.onClick} className="span-tablet">{userData.img ? <img className='avatar-tablet' src={userData.img} alt='avatar' /> : null} </span>
                                {
                                    this.state.dropdown ?
                                        <div onClick={this.mouseLeave} className='dropdown-tablet'>
                                            <a className='aaa-tablet' href='/#/home'><div className='manage-teams-tablet'>Manage teams</div></a>
                                            <hr className='hr-tablet' />
                                            <div className='manage-teams-tablet' >Account Settings</div>
                                            <hr className='hr-tablet' />
                                            <div className='manage-teams-tablet' >Billing/Plans</div>
                                            <hr className='hr-tablet' />
                                            <div className='manage-teams-tablet' >Edit Account</div>
                                            <hr className='hr-tablet' />
                                            <a className='logout-tablet' href={process.env.REACT_APP_LOCALHOST_3005 + '/logout'}>Logout</a>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </nav>

                </Tablet>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Header);