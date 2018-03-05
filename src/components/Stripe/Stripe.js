import React, { Component } from 'react';
import './Stripe.css';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Header from './../Header/Header.js';
import Nav from './../Nav/Nav';
import { ToastContainer, toast } from 'react-toastify';

class Stripe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      teams_name: null,
      amount: 0,
      description: null
    }
  }

  componentDidMount() {
    axios.get('/api/teams').then( teams => {
        console.log(teams)
        this.setState({
            teams: teams.data
        },() => console.log(this.state.teams))
    })
}

    onToken = (token) => {
      console.log('token', token); // can check token for info, including user email
      token.card = void 0; // remove credit card info from token so it never hits server
      axios.post('/api/payment', { token, amount: this.state.amount, description: this.state.description } )
      // when the token is sent to use from Stripe, we make a post request to make the payment
      .then(response => { console.log('POST response', response);
      toast.info('Thank you for your donation!');
    })
    .catch((err) => {
      console.log(err);
      toast.error('Donation not processed...');
  })
    }

    changeAmount(e) {
      this.setState({
        amount: e*100
      })
    }

    handleOnSelect(e) {
      this.setState({
          team_name: e.target.value,
          description: e.target.value
      },() => console.log(this.state.teams_id))
  }
  
    render() {
      var teamNameToDisplay = this.state.teams.map( (val, i) => {
        return (
                <option value={val.team_name} key={i}>{val.team_name}</option>
        )
    })
      return (
        <div className="Stripe">
        <ToastContainer autoClose={3400} />
        <div>
          <Nav />
          </div>
        <div>
          <Header />
        </div>
        <div className='stripe-box'>
          <div className="Stripe-header">
            {/* <img src='/logo.svg' className="Stripe-logo" alt="logo" /> */}
            <h2 className='h2-stripe'>Donate with Stripe</h2>
            <select className='stripe-inputt' onChange={e => this.handleOnSelect(e)} placeholder=' Select Team'><option>Select Team</option>{teamNameToDisplay}</select>
            <input className='stripe-input' type='number' placeholder= ' Amount'onChange={ (e) => this.changeAmount(e.target.value)}/>
          </div>
          <StripeCheckout className="sc"
            description={this.state.description}
            token={this.onToken} // get token back
            stripeKey={ process.env.REACT_APP_stripekey }  // public key 
            amount={this.state.amount} // required, should be same as in axios get request
          />
          </div>
        </div>
      );
    }
  }
  
  export default Stripe;