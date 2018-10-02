import React, { Component } from 'react'
import { sleep } from '../../modules/modules'

const initialState ={
	isGetAmountLoading: true,
	outputAmount: 0
}
class OutputCoins extends Component{
	constructor(props){
		super(props)
		this.state = initialState
	}
	
	async componentDidMount(){
		let coin
		await this.props.onFetchOrders() //get the selected coin from db
		let promise1 = new Promise((resolve, reject) => this.props.coin? resolve(coin = this.props.coin)
			: reject('coin is not Fetched')
			)
		let promise2 = new Promise(resolve => resolve(this.props.outputAmount))
		Promise.all([promise1, promise2]).then(values => console.log(values))
		promise1.then( coin => {this.props.onGetInputCoin(coin, this.props.selectInputCoin)} ) 
		// this.setState({isGetAmountLoading: false})
	}
	static getDerivedStateFromProps(nextProps, prevState){
		console.log(nextProps)
		// if(nextProps.outputAmount !== )
	}
	render(){
		const { coin, outputAmount } = this.props
		const { isGetAmountLoading } = this.state
		return (
			<div className='flex flex-row w-50'>
				<span className='w-70 bg-light-gray tc pv2'>{outputAmount}</span>
		 		{!isGetAmountLoading&& <span className='w-70 bg-light-gray tc pv2'>{outputAmount}</span>}	
				<span className='mh1 bg-light-gray w-30 tc pv2'>{ coin }</span>
			</div>
			);
		
	}
}

export default OutputCoins