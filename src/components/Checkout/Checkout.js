import React, { Component } from 'react'
import StripeCheckout from '../StripeCheckout/StripeCheckout'
import MoneyButton from '@moneybutton/react-money-button'


class Checkout extends Component {

	render(){
		const { onCreateToken, zipcode, onCheckStripe, savedCards, haveStripe, selectedCard, onSelectCard } = this.props
		return(
			<div>
				<StripeCheckout onCreateToken = { onCreateToken} 
		          zipcode ={ zipcode }
		          onCheckStripe = { onCheckStripe }
		          savedCards = { savedCards }
		          haveStripe = { haveStripe }
		          selectedCard = { selectedCard }
		          onSelectCard = { onSelectCard }
				 />
				<MoneyButton
			      to="some.friend@example.com"
			      amount="1"
			      currency="BTC"
			      // clientIdentifier="a137c855234e54b27269031308a1fd63"
			      devMode= "true"
			    />	
			</div>
		);
	}
}

export default Checkout;