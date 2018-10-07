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
		LOAD_USER,
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
		FETCH_NODESTATS_FAIL,
		FETCH_ALL_NODESTATS_LOADING,
		FETCH_ALL_NODESTATS_SUCCESS,
		FETCH_ALL_NODESTATS_FAIL
		}
from './constants';
import {Decimal} from 'decimal.js';
import env from '../config/env';
import _ from "lodash";
import { sleep } from '../modules/modules'
// console.log(env.rootUrl)
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

 export const loadUser = (data) => (
	  {
	  	type: LOAD_USER,
	  	payload: data
	  }
  )

export const createToken = (event, stripe) => (dispatch, getState) =>{
    event.preventDefault()
    dispatch({type: CREATE_TOKEN_LOADING, payload: true})
    const isAuthenticated = getState().authenticateR

    let user, userId, email, test = true

    test? (
    	user= {
    		userId: '1',
	  		email: 'peter@gmail.com'
	  	},
	  	{ userId, email } = user

    ) : (
    	isAuthenticated? { userId, email } = getState().loadUserR
 		: { userId } = getState().fetchActivationR
    )
    	

	if(userId){
		console.log(userId)
	// 	const { name, zipcode, state, city,
	//       line1, line2, userId, country } = getState().signupR
		if(!isAuthenticated){
			// console.log('signup')
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
		    .then(response =>  dispatch({type: CREATE_TOKEN_SUCCESS, payload: true}))
		    .catch(err => dispatch({type: CREATE_TOKEN_FAILED, payload: err}))
		 } else{
		 	// console.log('signin')
			let promise = new Promise((resolve, reject) => {
    		let selectedCard = getState().selectCardR.selectedCard
    		selectedCard? resolve(selectedCard): reject('cannot get selectedCard')

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
	          	// console.log(data)
	          	if(data.UserId) {
	          		dispatch(loadUser(data))
	          		dispatch({type: SIGNIN_SUCCESS, payload: data})
	          		dispatch(authenticate())
	          	} else{
	          		dispatch({type: SIGNIN_FAILED, payload: 'Wrong email or password'})
	          	}	          	
	          })//end user
	          .catch(err => {
	          	console.log(err)
	          	dispatch({type: SIGNIN_FAILED, payload: 'Wrong email or password'})
	          })
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
// generate transaction
export const generateTransaction = () => (dispatch, getState) => {
	dispatch({type: GENERATE_TRANSACTION_LOADING, payload: true })
	const { inputCoin, outputCoin, inputAmount, address} = getState().getInOutCoinR
	// console.log(address)
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
export const fetchNodeStats= () => async (dispatch, getState) =>{
	dispatch({type: FETCH_NODESTATS_LOADING, payload: true })

	
	let subUrl1, subUrl2, url1, url2, coin = 'zen';
	let userId = getState().loadUserR.userId

	if(coin === 'zen'){ 
		let page = 1, rows = 1000;
		let key = '1d1a3df982fadb7141a15048c948cedc7d540dc5'
		let baseUrl = 'https://securenodes2.na.zensystem.io/api/nodes/my/'
		let type ={
			payments: 'payments?key=',
			earnings: 'earnings?key='
		}
		subUrl1 = type.earnings,
		subUrl2 = type.payments,
		url1 =`${baseUrl}${subUrl1}${key}`,
		
		fetch(url1)
			.then(response => response.json())
			.then(data => {
				// console.log(data)
				var nodeData =[]
				for(let node of data.rows){
					let nodeId = node.nid
					url2 =`${baseUrl}${subUrl2}${key}&page=${page}&rows=${rows}&nid=${nodeId}`
					fetch(url2)
						.then(response => response.json())
						.then( oneNodeData => {
							// console.log(oneNodeData)
							for (let payment of oneNodeData.rows){
								payment.nodeId = nodeId
								nodeData.push(payment)
							}			
						}) // end then oneNodeData
				}//end for of data.rows
				
				dispatch({type: FETCH_NODESTATS_SUCCESS, payload: nodeData})
			})//end of then data
			.catch(err => dispatch({type: FETCH_NODESTATS_FAIL, payload: err}))
		
		} else {
			return null // for future
		}
	
}


// fetch all nodes
export const fetchAllNodeStats= (coin) => (dispatch, getState) => {

	let key = '1d1a3df982fadb7141a15048c948cedc7d540dc5'
	let baseUrl = 'https://securenodes2.na.zensystem.io/api/nodes/my/'
	let type ={
		payments: 'payments?key=',
		earnings: 'earnings?key='
	}
	let subUrl, url
	let userId = getState().loadUserR.userId
	if(coin === 'zen'){
		subUrl = type.earnings
		url =`${baseUrl}${subUrl}${key}`
	} 

	dispatch({type: FETCH_ALL_NODESTATS_LOADING, payload: true })
	
	fetch(url)
		.then(response => response.json())
		.then(data => {
			if(data.records){
					let allNodeBalance = data.summary.totalzen
					let price = data.summary.zenusd
				
					return fetch(`${env.rootUrl}/fetch-node-stats/${userId}`, {
				      method: "POST",
				      headers: {'Content-Type': 'application/json'},
				      body: JSON.stringify({
				      	allNodeBalance: allNodeBalance,
				      	coin: coin
				      })
				  })
			    .then(response => response.json())
			    .then(async dbData => {
			    	await _.map(dbData, item => item.price = price)
			    	
			    	dispatch({type: FETCH_ALL_NODESTATS_SUCCESS, payload: dbData})
					  // apiType === 'payments'? dispatch({type: FETCH_NODESTATS_SUCCESS, payload: dbData})
					// : dispatch({type: FETCH_ALL_NODESTATS_SUCCESS, payload: })
			    })
			    .catch(err => dispatch({type: FETCH_ALL_NODESTATS_FAIL, payload: err}))	
				}  else {
					dispatch({type: FETCH_ALL_NODESTATS_FAIL, payload: data.error})
				}
			})// end data
			.catch(err => dispatch({type: FETCH_ALL_NODESTATS_FAIL, payload: err}))
}
