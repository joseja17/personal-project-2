import React, { Component } from 'react';
import './Stripe.css';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Header from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/components/Header/Header.js';

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
      .then(response => { console.log('POST response', response); });

    }

    changeAmount(e) {
      this.setState({
        amount: e
      })
    }
  
    render() {
      return (
        <div className="Stripe">
        <div>
          <Header />
        </div>
        <div className='stripe-box'>
          <div className="Stripe-header">
            {/* <img src={logo} className="Stripe-logo" alt="logo" /> */}
            <h2>Donate with Stripe</h2>
            {/* <input type='number' onChange={ () => changeAmount(e)}/> */}
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