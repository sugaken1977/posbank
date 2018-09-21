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
		FETCH_ESTIMATED_OUTPUT
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

const selectCoinInitialState ={
	selectedCoin: '',
	nodeQuantity: 0
}

export const selectCoinR = (state = selectCoinInitialState, action) => {
	switch(action.type){
		case SELECT_COIN:
			return{
				...state,
				selectedCoin: action.payload
			}
		case SELECT_NODE_QUANTITY:
			return{
				...state,
				nodeQuantity: action.payload

			}
		default:
			return state
	}
}
const getInOutCoinInitialState ={
	from: 'btc',
	to: 'zen',
	inputAmount: 0,
	outputAmount: 0,
	address: ''
}
export const getInOutCoinR = (state = getInOutCoinInitialState, action) =>{
	switch(action.type){
		case GET_INPUT_COIN:
			return {
				...state,
				from: action.payload
			}
		case GET_OUTPUT_COIN:
			return {
				...state,
				to: action.payload
			}
		case GET_INPUT_AMOUNT:
			return {
				...state,
				inputAmount: action.payload
			}
		case FETCH_ESTIMATED_OUTPUT:
			return {
				...state,
				outputAmount: action.payload
			}
		case GET_WALLET_ADDRESS:
			return {
				...state,
				address: action.payload
			}
		default:
			return state
	}
}

const generateTransactionInitialState ={
	transactionId:'',
	payInAddress: '',
	payOutAddress: '',
	from: '',
    to: '',
    amountToPayIn: '',
    isGenerateTrLoading: false,
    err: ''
}

export const generateTransactionR =(state=generateTransactionInitialState, action)=>{
	switch(action.type){
		case GENERATE_TRANSACTION_LOADING:
			return {
				...state,
				isGenerateTrLoading: action.payload
			}
		case GENERATE_TRANSACTION_SUCCESS:
			return {
				...state,
				transactionId: action.payload.id,
				payInAddress: action.payload.payinAddress,
				payOutAddress: action.payload.payoutAddress,
				from: action.payload.currencyFrom,
			    to: action.payload.currencyTo,
			    amountToPayIn: action.payload.amountExpectedFrom
			}
		case GENERATE_TRANSACTION_FAILED:
			return{
				...state,
				err: action.payload
			}
		default:
			return state
	}
}	