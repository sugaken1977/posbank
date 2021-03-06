import React, { Component } from 'react'
import StripeCheckout from '../StripeCheckout/StripeCheckout'
// import MoneyButton from '@moneybutton/react-money-button'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import OrderedCoins from '../OrderedCoins/OrderedCoins'



class Checkout extends Component {
	
	componentDidMount(){
		return !this.props.isAuthenticated? this.props.onFetchOrders()
		: null
	}
	render(){
		const { onCreateToken, zipcode, onCheckStripe, savedCards, haveStripe, selectedCard, onSelectCard, stripeComplete,
		 onFetchOrders, coin, selectedCoin, isFOLoading, isAuthenticated} = this.props

		let displayCoin
		isAuthenticated? displayCoin = selectedCoin: displayCoin = coin

		if(stripeComplete){
			return <Redirect to={{pathname: '/exchange'}} />;
		}
		return isAuthenticated? isFOLoading? <h1>Loading...</h1>
		: displayCoin? (
			<div className='tc w-100 dt vh-75'>
      			<div className='v-mid tc dtc'>
				{
				// <div>
				// 	<div className='mv2'>
				// 		<span>Masternode's name: </span>
				// 		<span>{displayCoin}</span>
				// 	</div>
				// 	<div className='mv2'>
				// 		<span>Node quantity: </span>
				// 		<span>1</span>
				// 	</div>
				// </div>
					}
				<OrderedCoins displayCoin={ displayCoin } />
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
			</div>
		)
		: <h1>No masternode detected</h1>
		: <h1>Please sign in or sign up</h1>
	}
}

export default Checkout;