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
		SIGN_OUT
		}
from './constants';

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
	  		email: 'peter@gmail.com',
	  		gender: "1", 
	  		birthday: "1990-08-01T15:00:00.000Z", 
	  		zipcode: "170-0011",
	  		state: 'tokyo',
	  		city: 'itabashi',
	  		line1: 'sample',
	  		line2: '103',
	  		country: 'JP'
	  	}
	const { userId } = getState().signupR

	if(getState().signupR.userId){
			user = Object.assign(getState().signupR, user)
			const { name, zipcode, state, city,
	      line1, line2, userId, country } = getState().signupR
			let promise = new Promise((resolve, reject) => {
    		let token = stripe.createToken({
    			name: name,
    			address_state: state,
    			address_city: city,
    			address_zip: zipcode,
    			address_line1: line1,
    			address_line2: line2,
    			address_country: 'country'
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
		    .then(response =>  dispatch({type: CREATE_TOKEN_SUCCESS, payload: {response: response, complete:true}}))
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
		    .then(response =>  dispatch({type: CREATE_TOKEN_SUCCESS, payload: {response: response, complete:true}}))
		    .catch(err => dispatch({type: CREATE_TOKEN_FAILED, payload: err}))
    })
	}
}

export const signup = (values) => (dispatch) =>{
	 dispatch({type: SIGNUP_LOADING, payload: true})

	 const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

	  return sleep(1000).then(() => {
	  
	    const {email, name, password, gender, birthday, zipcode, state, city,
	      line1, line2 } = values

	    
	    fetch('http://localhost:5001/signup',{
	          method: 'post',
	          headers: {'Content-Type': 'application/json'},
	          body: JSON.stringify({
	             email: email,
	             name: name,
	             password: password,
	             gender: gender,
	             birthday: birthday,
	             zipcode: zipcode,
	             state: state,
	             city: city,
	             line1: line1,
	             line2: line2,
	             country: 'JP'
	          })
	        })
	    .then(response => response.json())
	    .then( user => {
	    	// console.log(user)
	    	if(user.UserId){
	    		dispatch({type: SIGNUP_SUCCESS, payload: user})
	    		setTimeout(dispatch(checkStripe(user.UserId)), 10)
	    	}

	    })
	    .catch(err => dispatch({type: SIGNUP_FAILED, payload: err}))
		})//end of sleep 1000

}//end of signup

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
			console.log(savedCards)
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