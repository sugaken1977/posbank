import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
	
  render() {
  	const zipcode= 22222
    return (
      <label>
        Card details
        <CardElement value={{postalCode: `${zipcode}`} }style={{base: {fontSize: '18px'}}} />

      </label>
    );
  }
}

export default CardSection;