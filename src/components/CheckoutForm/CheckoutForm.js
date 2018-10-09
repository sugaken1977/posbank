import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import './CheckoutForm.css';
import Paper from '@material-ui/core/Paper';
import { styles } from '../../modules/modules'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// import AddressSection from '../AddressSection/AddressSection';
import CardSection from '../CardSection/CardSection';

class CheckoutForm extends React.Component {
  
  render() {
    const { onCreateToken, zipcode, onCheckStripe, haveStripe, stripe, savedCards, onSelectCard, 
        classes, selectedCard } = this.props

    if(false){
    	return  <div>
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
    			</div>
    	
    

    } else{
    	return (
            <Paper className={classNames(classes.paper, classes.center, classes.pa4)} elevation={1}>
                <form onSubmit={ (event) => onCreateToken(event, stripe) } className="flex flex-column">
    			        <CardSection zipcode = { zipcode } />
    			        <button className="stripeBtn">Confirm order</button>
    		      </form>
            </Paper>
              )

    }
    
  }
}

CheckoutForm = withStyles(styles)(CheckoutForm)
export default injectStripe(CheckoutForm);