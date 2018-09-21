import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {StripeProvider} from 'react-stripe-elements';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form'
import { createTokenR, signupR, checkStripeR, selectCardR, signinR, authenticateR,
selectCoinR, getInOutCoinR, generateTransactionR } from './store/reducers'


const logger = createLogger();
const rootReducer = combineReducers({
	createTokenR,
	signupR,
	checkStripeR,
	selectCardR,
	signinR,
	authenticateR,
	selectCoinR,
	getInOutCoinR,
	generateTransactionR,
	form: formReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

ReactDOM.render(
<Provider store={store}>
	<StripeProvider apiKey="pk_test_4AlyDaJP56agcQ3r9yYIMF5Z">
		<App />
	</StripeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
