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
		FETCH_EXSTATS_FAIL,
		FETCH_ORDERS_LOADING,
		FETCH_ORDERS_SUCCESS,
		FETCH_ORDERS_FAIL,
		FETCH_NODESTATS_LOADING,
		FETCH_NODESTATS_SUCCESS,
		FETCH_NODESTATS_FAIL
		}
from './constants';
import {Decimal} from 'decimal.js';
import env from '../config/env';
import { sleep } from '../modules/modules'
console.log(env.rootUrl)
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
	const { userId } = getState().fetchActivationR
	// const test = true
	if(userId){
	// 	const { name, zipcode, state, city,
	//       line1, line2, userId, country } = getState().signupR
	// if(test){	
			// user = Object.assign(getState().signupR, user)
			// let userId = 666
			let promise = new Promise((resolve, reject) => {
    		let token = stripe.createToken({
    			name: 'noname'
    		})
    		token? resolve(token): reject('something wrong with stripe createToken()')  		
    	})
			promise.then(promise => {
		    	let {token} = promise 
		    	return fetch(`${env.rootUrl}/charge/${userId}`, {
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

		    	return fetch(`${env.rootUrl}/charge/${userId}`, {
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
// sign up
export const signup = (values) => (dispatch, getState) =>{
	
	 dispatch({type: SIGNUP_LOADING, payload: true})
	 const coin = getState().selectCoinR.selectedCoin

	  return sleep(1000).then(() => {
	  
	    const {email, password } = values

	    
	    fetch(`${env.rootUrl}/signup`,{
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
	    		dispatch(checkStripe(user.UserId))
	    	}

	    })
	    .catch(err => dispatch({type: SIGNUP_FAILED, payload: err}))
		})//end of sleep 1000

}//end of signup

// activation

export const fetchActivation = (pathname) => (dispatch, getState) =>{
	dispatch(({type: FETCH_ACTIVATION_LOADING, payload: true}))
	
		return fetch(`${env.rootUrl}${pathname}`)
			.then(response => response.json())
			.then(data => {
					// console.log(activated)
					if(data.activated){
						dispatch({type: FETCH_ACTIVATION_SUCCESS, payload: data})
						dispatch(authenticate()) // auto sign in after verification
					} else{
						dispatch({type: FETCH_ACTIVATION_SUCCESS_NOT_FOUND, payload: data})
					}
					
				})
			.catch(err => dispatch({type: FETCH_ACTIVATION_FAIL, payload: err}))


		
}//end of activation

// sign in

export const signin = (values) => (dispatch) =>{
	dispatch(({type: SIGNIN_LOADING, payload: true}))
	// wait 1s for redux-form to load values
	sleep(1000).then(() =>{
		 const {email, password } = values

	    fetch(`${env.rootUrl}/signin`,{
	        method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          email: email,
	          password: password
	        })//end of body
	      })//end fetch
	          .then(response => response.json())
	          .then(data => {
	          	console.log(data)
	          	if(data.UserId) {
	          		dispatch({type: SIGNIN_SUCCESS, payload: data})
	          		dispatch(authenticate())
	          	} else{
	          		dispatch({type: SIGNIN_FAILED, payload: data})
	          	}	          	
	          })//end user
	          .catch(err => dispatch({type: SIGNIN_FAILED, payload: err}))
		})
}

export const checkStripe = (userId) => (dispatch, getState) => {
	// let {userId} = getState().signupR
	// let userId = 1
	fetch(`${env.rootUrl}/stripe/${userId}`)
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

// select coin and node (1st step not get input coin in exchange)
export const selectNodeQuantity = (num) => ({
	type: SELECT_NODE_QUANTITY,
	payload: num
})

export const selectCoin = (coin) => (dispatch)=>{

	dispatch({type: SELECT_COIN, payload: coin})

}

// export const calculateProfit = () =>(dispatch, getState)=>{
// 	sleep(500).then(()=>{
// 		const { nodeQuantity } = getState().selectCoinR

// 	})
// }

// fetch orders
export const fetchOrders = () => (dispatch, getState) =>{
	let userId 
	let promise = new Promise(resolve => resolve(userId = getState().fetchActivationR.userId))
	
	promise.then(userId => {
		dispatch({type: FETCH_ORDERS_LOADING, payload: true })
		return fetch(`${env.rootUrl}/fetch-orders/${userId}`)
			.then(response => response.json())
			.then(data => {
				// console.log(data)
				dispatch({type: FETCH_ORDERS_SUCCESS, payload: data[0] })
			})
			.catch(err => dispatch({type: FETCH_ORDERS_FAIL, payload: err}))
	})
}

// transaction
 // get input coin and fetch estimated output coin amount
export const getInputCoin = (coinName, type) => (dispatch, getState) => {
	type? dispatch({type: GET_INPUT_COIN, payload: coinName})
	: dispatch(({type: GET_OUTPUT_COIN, payload: coinName}))

	sleep(500).then(() => {
		const {inputCoin, outputCoin, inputAmount} = getState().getInOutCoinR
		if(inputAmount){
			fetch(`${env.rootUrl}/exchange-amount`,{
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          inputCoin: inputCoin,
	          outputCoin: outputCoin,
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

	const { inputCoin, outputCoin } = getState().getInOutCoinR
	
	
	if(amount){
		return sleep(1000).then(()=>{
		let foo = new Decimal(amount)
		const inputAmount = foo.toNumber()
		dispatch({type: GET_INPUT_AMOUNT, payload: inputAmount })
		fetch(`${env.rootUrl}/exchange-amount`,{
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          inputCoin: inputCoin,
	          outputCoin: outputCoin,
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
	const { inputCoin, outputCoin, inputAmount, address} = getState().getInOutCoinR
	return sleep(1000).then(()=>{
		fetch(`${env.rootUrl}/exchange`,{
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          inputCoin: inputCoin,
	          outputCoin: outputCoin,
	          amount: inputAmount,
	          address: address
	        })	
		})
		.then(response => response.json())
		.then(data => dispatch({type: GENERATE_TRANSACTION_SUCCESS, payload: data.result}))
		.catch(err => dispatch({type: GENERATE_TRANSACTION_FAILED, payload: err}) )
	})
}
// fetch exchange status (transaction status)
export const fetchExStats = (redirect) => (dispatch, getState) =>{
	dispatch({type: FETCH_EXSTATS_LOADING, payload: true })
	redirect()
	const { transactionId } = getState().generateTransactionR
	sleep(1000).then(() =>{
		fetch(`${env.rootUrl}/fetch-exchange-status`, {
		 	method: 'post',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          transactionId: transactionId
	        })	
		})
		.then(response => response.json())
		.then(data => {
			return dispatch({type: FETCH_EXSTATS_SUCCESS, payload: data.result})

		})
		.catch(err => dispatch({type: FETCH_EXSTATS_FAIL, payload: err}))
	})
}

// fetch node data (payments, status)
export const fetchNodeStats= () =>(dispatch) =>{
	let nodeId= 71823, page = 1, rows = 1000;

	let url =`https://securenodes2.na.zensystem.io/api/nodes/my/payments?key=ca9660f09b0ab40b1635171dc46de5bd17a7fb44&page=${page}&rows=${rows}&nid=${nodeId}`
	
	dispatch({type: FETCH_NODESTATS_LOADING, payload: true })
	
	fetch(url)
		.then(response => response.json())
		.then(data => dispatch({type: FETCH_NODESTATS_SUCCESS, payload: data}))
		.catch(err => dispatch({type: FETCH_NODESTATS_FAIL, payload: err}))
}