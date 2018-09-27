import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from '../CheckoutForm/CheckoutForm';


class StripeCheckout extends React.Component {
 	
  render() {
  	const { onCreateToken, zipcode, onCheckStripe, savedCards, haveStripe, selectedCard, onSelectCard } = this.props
    return (
        <Elements>
          <InjectedCheckoutForm onCreateToken = { onCreateToken} 
          zipcode ={ zipcode }
          onCheckStripe = { onCheckStripe }
          savedCards = { savedCards }
          haveStripe = { haveStripe }
          selectedCard = { selectedCard }
          onSelectCard = { onSelectCard }
           />
        </Elements>
    );
  }
}

export default StripeCheckout;