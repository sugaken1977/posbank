import React, {Component} from 'react'
import QRCode from "qrcode.react"
import { Redirect } from 'react-router-dom'

const initalState = {
	redirect: false
}

class Send extends Component {
	constructor(props){
		super(props)
		this.state = initalState
		this.redirect = this.redirect.bind(this)
	}

	redirect = () =>{
		this.setState({redirect: true})
	}

	render(){
		const { transactionState, onFetchExStats  }= this.props
		const { from, payInAddress, amountToPayIn} = transactionState

		if(this.state.redirect){
			return <Redirect to={{pathname: '/exchange-status'}} />;
		}

		return(
			<div className='tc'>
				<p>{`Send ${amountToPayIn} ${from} to ${payInAddress} `}</p>
				
				<div>
					<QRCode value={payInAddress} size={180}/>
				</div>

				<button className='mv2' onClick = {(redirect)=>onFetchExStats(this.redirect)}>Confirm</button>
			</div>
		);
	}	
}

export default Send;