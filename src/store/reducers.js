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


const initialAuthState = {
  isAuthenticated: false,
}

export const authenticateR = (state = initialAuthState, action) => {
	switch(action.type){
		case AUTHENTICATED:
			return{
				...state,
				isAuthenticated: action.payload
				
			};
		case SIGN_OUT:
			return{
				...state,
				isAuthenticated: action.payload
			};
		default:
			return state;
	}
}

const tokenInitialState = {
	complete: false,
	isLoading: false,
	error: ''
}


export const createTokenR = (state = tokenInitialState, action) =>{
	switch(action.type){
		case CREATE_TOKEN_LOADING:
			return {
				...state,
				isLoading: action.payload
			}
		case CREATE_TOKEN_SUCCESS:
			return {
				...state,
				complete: action.payload.complete,
				response: action.payload.response
			}
		case CREATE_TOKEN_FAILED:
			return{
				...state,
				error: action.payload.action
			}
		default:
			return state;
	}
}

const signupInitialState ={
	userId: '',
	name: '',
	gender: '',
	birthday: '',
	zipcode: '',
	state: '',
	city: '',
	line1: '',
	line2: '',
	signupLoading: false,
	redirectSignup: false,
	error:''
}

export const signupR = (state = signupInitialState, action)=>{
	switch(action.type){
		case SIGNUP_LOADING:
			return{
				...state,
				signupLoading: action.payload
			}
		case SIGNUP_SUCCESS:
			return{
				...state,
				userId: action.payload.UserId,
				name: action.payload.Name,
				gender: action.payload.Gender,
				birthday: action.payload.Birthday,
				zipcode: action.payload.AddressZip,
				state: action.payload.AddressState,
				city: action.payload.AddressCity,
				line1: action.payload.AddressLine1,
				line2: action.payload.AddressLine2,
				redirectSignup: true
			}
		case SIGNUP_FAILED:
			return{
				...state,
				error: action.payload
			}
		default:
			return state;
	}
}

const signinInitialState = {
	userId: '',
	name: '',
	gender: '',
	zipcode: '',
	state: '',
	city: '',
	line1: '',
	line2: '',
	signinLoading: false,
	redirectSignin: false,
	error:''
}


export const signinR = (state =signinInitialState, action) =>{
	switch(action.type){
		case SIGNIN_SUCCESS:
			return{
				...state,
				userId: action.payload.UserId,
				name: action.payload.Name,
				state: action.payload.AddressState,
				city: action.payload.AddressCity,
				line1: action.payload.AddressLine1,
				line2: action.payload.AddressLine2,
				redirectSignin: true
			}
		case SIGNIN_LOADING:
			return{
				...state,
				signinLoading: true
			}
		case SIGNIN_FAILED:
			return{
				...state,
				error: action.payload
			}
		default:
			return state
	}
}
const haveStripeInitialState ={
	savedCards: [
    	{id: '111', type: 'visa'},
    	{id: '121', type: 'master'}
    ],
	haveStripe: false
}

export const checkStripeR = (state = haveStripeInitialState, action) => {
	switch(action.type){
		case HAVE_STRIPE:
			return{
				...state,
				savedCards: action.payload,
				haveStripe: true
			}
		default:
			return state	
		}
}

const selectCardInitialState = {
	selectedCard: ''
}
export const selectCardR = (state = selectCardInitialState, action) => {
	switch(action.type){
		case SELECT_CARD:
			return {
				...state,
				selectedCard: action.payload
			}
		default:
			return state
	}
}