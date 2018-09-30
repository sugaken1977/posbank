import {
		CREATE_TOKEN_SUCCESS,
		CREATE_TOKEN_FAILED,
		CREATE_TOKEN_LOADING,
		SIGNUP_SUCCESS,
		SIGNUP_FAILED,
		SIGNUP_LOADING,
		SIGNIN_SUCCESS,
		SIGNIN_LOADING,
		SIGNIN_FAILED,
		HAVE_STRIPE,
		SELECT_CARD,
		AUTHENTICATED,
		SIGN_OUT,
		SELECT_COIN,
		SELECT_NODE_QUANTITY,
		GENERATE_TRANSACTION_LOADING,
		GENERATE_TRANSACTION_SUCCESS,
		GENERATE_TRANSACTION_FAILED,
		GET_INPUT_COIN,
		GET_OUTPUT_COIN,
		GET_INPUT_AMOUNT,
		GET_WALLET_ADDRESS,
		FETCH_ESTIMATED_OUTPUT,
		FETCH_ACTIVATION_LOADING,
		FETCH_ACTIVATION_SUCCESS,
		FETCH_ACTIVATION_SUCCESS_NOT_FOUND,
		FETCH_ACTIVATION_FAIL,
		FETCH_EXSTATS_LOADING,
		FETCH_EXSTATS_SUCCESS,
		FETCH_EXSTATS_FAIL
		}
from './constants';
import {Decimal} from 'decimal.js';

import { sleep } from '../modules/modules'

export const authenticate = () => ({
    type: AUTHENTICATED,
    payload: true
  }) 

export const signout = () => (
	  {
	  	type: SIGN_OUT,
	    payload: false
	  }
  )


export const createToken = (event, stripe) => (dispatch, getState) =>{
    event.preventDefault()
    dispatch({type: CREATE_TOKEN_LOADING, payload: true})
    	var user= {
    		userId: '1',
	  		email: 'peter@gmail.com'
	  	}
	const { userId } = getState().signupR
	const test = true
	// if(getState().signupR.userId){
	// 	const { name, zipcode, state, city,
	//       line1, line2, userId, country } = getState().signupR
	if(test){	
			// user = Object.assign(getState().signupR, user)
			let userId = 666
			let promise = new Promise((resolve, reject) => {
    		let token = stripe.createToken({
    			name: 'noname'
    		})
    		token? resolve(token): reject('something wrong with stripe createToken()')  		
    	})
			promise.then(promise => {
		    	let {token} = promise 
		    	return fetch(`http://localhost:5001/charge/${userId}`, {
			      method: "POST",
			      headers: {'Content-Type': 'application/json'},
			      body: JSON.stringify(token)
			  })
		    	})
		    .then(response =>  dispatch({type: CREATE_TOKEN_SUCCESS, payload: response.ok}))
		    .catch(err => dispatch({type: CREATE_TOKEN_FAILED, payload: err}))

	} else if(getState().signinR.userId){
			
			let promise = new Promise((resolve, reject) => {
    		let selectedCard = getState().selectCardR.selectedCard
    		selectedCard? resolve(selectedCard): reject('something wrong with stripe createToken()')

    		promise.then(promise => {
		    	let token = promise

		    	return fetch(`http://localhost:5001/charge/${userId}`, {
			      method: "POST",
			      headers: {'Content-Type': 'application/json'},
			      body: JSON.stringify({card: token})
			  })
		    	})
		    .then(response => dispatch({type: CREATE_TOKEN_SUCCESS, payload: response.ok}))
		    .catch(err => dispatch({type: CREATE_TOKEN_FAILED, payload: err}))
    })
	}
}

export const signup = (values) => (dispatch, getState) =>{
	
	 dispatch({type: SIGNUP_LOADING, payload: true})
	 const coin = getState().selectCoinR.selectedCoin

	  return sleep(1000).then(() => {
	  
	    const {email, password } = values

	    
	    fetch('http://localhost:5001/signup',{
	          method: 'post',
	          headers: {'Content-Type': 'application/json'},
	          body: JSON.stringify({
	             email: email,
	             password: password,
	             coin: coin
	          })
	        })
	    .then(response => response.json())
	    .then( user => {
	    	// console.log(user)
	    	if(user.UserId){
	    		dispatch({type: SIGNUP_SUCCESS, payload: user})
	    		setTimeout(() => dispatch(checkStripe(user.UserId)), 500) 
	    	}

	    })
	    .catch(err => dispatch({type: SIGNUP_FAILED, payload: err}))
		})//end of sleep 1000

}//end of signup
//ACTIVATION ACTION

export const fetchActivation = (pathname) => (dispatch, getState) =>{
	dispatch(({type: FETCH_ACTIVATION_LOADING, payload: true}))
	
		return fetch(`http://localhost:5001${pathname}`)
			.then(response => response.json())
			.then(data => {
					// console.log(activated)
					if(data.activated){
						dispatch({type: FETCH_ACTIVATION_SUCCESS, payload: data})
					} else{
						dispatch({type: FETCH_ACTIVATION_SUCCESS_NOT_FOUND, payload: data})
					}
					
				})
			.catch(err => dispatch({type: FETCH_ACTIVATION_FAIL, payload: err}))


		
}//end of activation
//SIGNIN ACTION

export const signin = (values) => (dispatch) =>{
	dispatch(({type: SIGNIN_LOADING, payload: true}))
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


  return sleep(1000).then(() => {
    // console.log(values)
    // simulate server latency
    const {email, password } = values

    fetch('http://localhost:5001/signin',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
          .then(response => response.json())
          .then(user => {
          	console.log(user)
           	return dispatch(({type: SIGNIN_SUCCESS, payload: user}))
          })
          .catch(err => dispatch(({type: SIGNIN_FAILED, payload: err})))
})

}

export const checkStripe = (userId) => (dispatch, getState) => {
	// let {userId} = getState().signupR
	// let userId = 1
	fetch(`http://localhost:5001/stripe/${userId}`)
		.then(response => response.json())
		.then(savedCards => {
			// console.log(savedCards)
			if(savedCards.id){
				dispatch({type: HAVE_STRIPE, payload: savedCards})
			} 
		})
		.catch(err => console.log(err))

}

//select card

export const selectCard = (id) => (dispatch, getState) => {
	dispatch({
		type: SELECT_CARD, 
		payload: getState().checkStripeR.savedCards.filter(card => card.id === id)
	})
}

//SELECT NODE AND COIN
export const selectNodeQuantity = (num) => ({
	type: SELECT_NODE_QUANTITY,
	payload: num
})

export const selectCoin = (coin) => (dispatch)=>{

	dispatch({type: SELECT_COIN, payload: coin})

}

export const calculateProfit = () =>(dispatch, getState)=>{
	sleep(500).then(()=>{
		const { nodeQuantity } = getState().selectCoinR

	})
}

//transaction
 
export const getInputCoin = (coinName, type) => (dispatch, getState) => {
	type? dispatch({type: GET_INPUT_COIN, payload: coinName})
	: dispatch(({type: GET_OUTPUT_COIN, payload: coinName}))

	sleep(500).then(() => {
		const {from, to, inputAmount} = getState().getInOutCoinR
		if(inputAmount){
			fetch('http://localhost:5001/exchange-amount',{
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          from: from,
	          to: to,
	          amount: inputAmount
	        })	
		})
		.then(response => response.json())
		.then(data => dispatch({type: FETCH_ESTIMATED_OUTPUT, payload: data.result}))
		}
		
	})
}
export const getWalletAddress = (text) => ({
	type: GET_WALLET_ADDRESS, 
	payload: text
})


export const getOutputAmount = (amount) => (dispatch, getState) => {

	const { from, to } = getState().getInOutCoinR
	
	
	if(amount){
		return sleep(1000).then(()=>{
		let foo = new Decimal(amount)
		const inputAmount = foo.toNumber()
		dispatch({type: GET_INPUT_AMOUNT, payload: inputAmount })
		fetch('http://localhost:5001/exchange-amount',{
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          from: from,
	          to: to,
	          amount: inputAmount
	        })	
		})
		.then(response => response.json())
		.then(data => dispatch({type: FETCH_ESTIMATED_OUTPUT, payload: data.result}))
		})
	} 
}

export const generateTransaction = () => (dispatch, getState) => {
	dispatch({type: GENERATE_TRANSACTION_LOADING, payload: true })
	const { from, to, inputAmount, address} = getState().getInOutCoinR
	return sleep(1000).then(()=>{
		fetch('http://localhost:5001/exchange',{
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          from: from,
	          to: to,
	          amount: inputAmount,
	          address: address
	        })	
		})
		.then(response => response.json())
		.then(data => dispatch({type: GENERATE_TRANSACTION_SUCCESS, payload: data.result}))
		.catch(err => dispatch({type: GENERATE_TRANSACTION_FAILED, payload: err}) )
	})
}

export const fetchExStats = (redirect) => (dispatch, getState) =>{
	dispatch({type: FETCH_EXSTATS_LOADING, payload: true })
	redirect()
	const { transactionId } = getState().generateTransactionR
	sleep(1000).then(() =>{
		fetch('http://localhost:5001/fetch-exchange-status', {
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          transactionId: transactionId
	        })	
		})
		.then(response => response.json())
		.then(data => {
			dispatch({type: FETCH_EXSTATS_SUCCESS, payload: data.result})

		})
		.catch(err => dispatch({type: FETCH_EXSTATS_FAIL, payload: err}))
	})
	
}