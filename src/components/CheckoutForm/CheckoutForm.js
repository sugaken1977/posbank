import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import './CheckoutForm.css';

// import AddressSection from '../AddressSection/AddressSection';
import CardSection from '../CardSection/CardSection';

class CheckoutForm extends React.Component {
  
  render() {
    const { onCreateToken, zipcode, onCheckStripe, haveStripe, stripe, savedCards, onSelectCard, selectedCard } = this.props

    if(false){
    	return  <form>
    				<ul>
    					{
    						savedCards.map(card => {
    							return <li className='flex flex-row' key={card.id} onChange = {() => onSelectCard(card.id)} >
    										<input type="radio" name='selectedCard' />
    										<span className='bg-light-gray shadow-1 list grow'>{card.id}</span>
    								</li>
    						})
    					}
    				</ul>
    			</form>
    	
    

    } else{
    	return <form onSubmit={ (event) => onCreateToken(event, stripe) } className="">
			        <CardSection zipcode = { zipcode } />
			        <button className="stripeBtn">Confirm order</button>
		      </form>

    }
    
  }
}

export default injectStripe(CheckoutForm);