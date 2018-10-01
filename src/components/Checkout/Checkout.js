import React, { Component } from 'react'
import StripeCheckout from '../StripeCheckout/StripeCheckout'
// import MoneyButton from '@moneybutton/react-money-button'
import { Redirect } from 'react-router-dom'


class Checkout extends Component {
	
	componentDidMount(){
		this.props.onFetchOrders()
	}
	render(){
		const { onCreateToken, zipcode, onCheckStripe, savedCards, haveStripe, selectedCard, onSelectCard, stripeComplete,
		 onFetchOrders, coin, isFOLoading, isAuthenticated} = this.props
		 // console.log(isAuthenticated)
		if(stripeComplete){
			return <Redirect to={{pathname: '/exchange'}} />;
		}
		return isAuthenticated? isFOLoading? <h1>Loading...</h1>
		: coin? (
			<div>
				<div>
					<div className='mv2'>
						<span>Masternode's name: </span>
						<span>{coin}</span>
					</div>
					<div className='mv2'>
						<span>Node quantity: </span>
						<span>1</span>
					</div>
				</div>
				<StripeCheckout onCreateToken = { onCreateToken} 
		          zipcode ={ zipcode }
		          onCheckStripe = { onCheckStripe }
		          savedCards = { savedCards }
		          haveStripe = { haveStripe }
		          selectedCard = { selectedCard }
		          onSelectCard = { onSelectCard }
				 />
				
				{
					// <MoneyButton
			  //     to="some.friend@example.com"
			  //     amount="1"
			  //     currency="BTC"
			  //     // clientIdentifier="a137c855234e54b27269031308a1fd63"
			  //     devMode= "true"
			  //   />
			}
			</div>
		)
		: <h1>No masternode detected</h1>
		: <h1>Please sign in or sign up</h1>
	}
}

export default Checkout;