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
      amount: 0
    }
  }

    onToken = (token) => {
      console.log('token', token); // can check token for info, including user email
      token.card = void 0; // remove credit card info from token so it never hits server
      axios.post('/api/payment', { token, amount: this.state.amount } )
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
  
    render() {
      return (
        <div className="Stripe">
        <ToastContainer autoClose={3000} />
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
            <input className='stripe-input' type='number' placeholder= ' ex. 50.00'onChange={ (e) => this.changeAmount(e.target.value)}/>
          </div>
          <StripeCheckout className="sc"
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