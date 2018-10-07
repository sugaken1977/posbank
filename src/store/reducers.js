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

// IS = Initial State

//
const initialLoadUserIS = {
	userId: '',
    // name: '',
    email: '',
    walletAddress: ''
}

export const loadUserR = (state = initialLoadUserIS, action) =>{
	switch(action.type){
		case LOAD_USER:
		 return{
		 	...state,
		 	userId: action.payload.UserId,
		 	// name: action.payload.Name,
		 	email: action.payload.Email,
		 	walletAddress: action.payload.WalletAddress
		 }
		 default:
		 	return state;
	}
}
// authenticate
const authenticateIS = {
  isAuthenticated: false,
}

export const authenticateR = (state = authenticateIS, action) => {
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

// stripe token
const tokenIS = {
	stripeComplete: false,
	isLoading: false,
	error: ''
}

// token
export const createTokenR = (state = tokenIS, action) =>{
	switch(action.type){
		case CREATE_TOKEN_LOADING:
			return {
				...state,
				isLoading: action.payload
			}
		case CREATE_TOKEN_SUCCESS:
			return {
				...state,
				stripeComplete: action.payload,
				isLoading: false
			}
		case CREATE_TOKEN_FAILED:
			return{
				...state,
				error: action.payload
			}
		default:
			return state;
	}
}
// sign up
const signupIS ={
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

export const signupR = (state = signupIS, action)=>{
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


//fetch orders
export const fetchOrdersIS = {
	userId: '',
	isFOLoading: false, // FO= fetch order
	coin: '', // user's selected coin which saved to db
	error: ''
}

export const fetchOrdersR = (state = fetchOrdersIS, action) =>{
	switch(action.type){
		case FETCH_ORDERS_LOADING: 
			return {
				...state,
				isFOLoading: true
			}
		case FETCH_ORDERS_SUCCESS:
			return {
				...state,
				userId: action.payload.UserId,
				coin: action.payload.Coin,
				isFOLoading: false
			}
		case FETCH_ORDERS_FAIL:
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}
//fetch activation
const fetchActivationIS ={
	userId: '',
	activated: null,
	isFALoading: false,
	error: ''
}

export const fetchActivationR = (state = fetchActivationIS, action)=>{
	switch(action.type){
		case FETCH_ACTIVATION_LOADING:
			return {
				...state,
				isFALoading: action.payload
			}
		case FETCH_ACTIVATION_SUCCESS:
			return {
				...state,
				userId: action.payload.userId,
				activated: action.payload.activated,
				isFALoading: false	
			}
		case FETCH_ACTIVATION_SUCCESS_NOT_FOUND:
			return {
				...state,
				activated:  action.payload.activated,
				isFALoading: false
			}
		case FETCH_ACTIVATION_FAIL:
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}
// sign in
const signinIS = {
	userId: '',
	// name: '',
	// gender: '',
	// zipcode: '',
	// state: '',
	// city: '',
	// line1: '',
	// line2: '',
	isSigninLoading: false,
	redirectSignin: false,
	email:'',
	signinError:''
}

export const signinR = (state =signinIS, action) =>{
	switch(action.type){
		case SIGNIN_SUCCESS:
			return{
				...state,
				userId: action.payload.UserId,
				// name: action.payload.Name,
				// state: action.payload.AddressState,
				// city: action.payload.AddressCity,
				// line1: action.payload.AddressLine1,
				// line2: action.payload.AddressLine2,
				email: action.payload.Email,
				redirectSignin: true,
				isSigninLoading: false
			}
		case SIGNIN_LOADING:
			return{
				...state,
				isSigninLoading: true
			}
		case SIGNIN_FAILED:
			return{
				...state,
				signinError: action.payload
			}
		case SIGN_OUT:
			return {
				...state,
				redirectSignin: false
			}
		default:
			return state
	}
}
const haveStripeIS ={
	savedCards: [
    	{id: '111', type: 'visa'},
    	{id: '121', type: 'master'}
    ],
	haveStripe: false
}

export const checkStripeR = (state = haveStripeIS, action) => {
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
// get user card for stripe
const selectCardIS = {
	selectedCard: ''
}
export const selectCardR = (state = selectCardIS, action) => {
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
// get coin that users select for nodes
const selectCoinIS ={
	selectedCoin: '',
	nodeQuantity: 1
}

export const selectCoinR = (state = selectCoinIS, action) => {
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
// get user's input coin, estimated amount
const getInOutCoinIS ={
	inputCoin: 'btc',
	outputCoin: 'zen',
	inputAmount: 0,
	outputAmount: 0,
	address: ''
}
export const getInOutCoinR = (state = getInOutCoinIS, action) =>{
	switch(action.type){
		case GET_INPUT_COIN:
			return {
				...state,
				inputCoin: action.payload
			}
		case GET_OUTPUT_COIN:
			return {
				...state,
				outputCoin: action.payload
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
// generate transaction
const generateTransactionIS ={
	transactionId:'',
	payInAddress: '',
	payOutAddress: '',
	inputCoin: '',
    outputCoin: '',
    amountToPayIn: '',
    isGenerateTrLoading: false,
    err: ''
}

export const generateTransactionR =(state=generateTransactionIS, action)=>{
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
				inputCoin: action.payload.currencyFrom,
			    outputCoin: action.payload.currencyTo,
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

// fetch exchange status (transaction status)
const fetchExStatsIS = {
	exStatus: '',
	isFExStatsLoading: false,
	error: ''
}


export const fetchExStatsR = (state = fetchExStatsIS, action)=>{
	switch(action.type){
		case FETCH_EXSTATS_LOADING:
			return {
				...state,
				isFExStatsLoading: true,
			}
		case FETCH_EXSTATS_SUCCESS:
			return {
				...state,
				exStatus: action.payload,
				isFExStatsLoading: false,
			}
		case FETCH_EXSTATS_FAIL:
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}

// fetch node data (payments, status)

const fetchNodeStatsIS = {
	nodeData: [],
	isFNStatsLoading: false,
	error: ''
}

export const fetchNodeStatsR = (state = fetchNodeStatsIS, action) =>{
	switch(action.type){
		case FETCH_NODESTATS_LOADING:
			return{
				...state,
				isFNStatsLoading: true
			}
		case FETCH_NODESTATS_SUCCESS:
			return{
				...state,
				nodeData: action.payload,
				isFNStatsLoading: false
			}
		case FETCH_NODESTATS_FAIL:
			return{
				...state,
				error: action.payload,
				isFNStatsLoading: false
			}
		default:
			return state
	}
}
// fetch all node data (payments, status)

const fetchAllNodeStatsIS = {
	allNodeData: [],
	isFANStatsLoading: false,
	error: ''
}

export const fetchAllNodeStatsR = (state = fetchAllNodeStatsIS, action) =>{
	switch(action.type){
		case FETCH_ALL_NODESTATS_LOADING:
			return{
				...state,
				isFANStatsLoading: true
			}
		case FETCH_ALL_NODESTATS_SUCCESS:
			return{
				...state,
				allNodeData: action.payload,
				isFANStatsLoading: false
			}
		case FETCH_ALL_NODESTATS_FAIL:
			return{
				...state,
				error: action.payload,
				isFANStatsLoading: false
			}
		default:
			return state
	}
}