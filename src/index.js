import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import env from './config/env';
import {StripeProvider} from 'react-stripe-elements';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';



import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as formReducer } from 'redux-form'
import { createTokenR, signupR, checkStripeR, selectCardR, signinR, authenticateR,
selectCoinR, getInOutCoinR, generateTransactionR, fetchActivationR, fetchExStatsR, 
fetchOrdersR, fetchNodeStatsR, fetchAllNodeStatsR, loadUserR } from './store/reducers'

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

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
	fetchActivationR,
	fetchExStatsR,
	fetchOrdersR,
	fetchNodeStatsR,
	fetchAllNodeStatsR,
	loadUserR,
	form: formReducer
})
const persistConfig = {
 key: 'root',
 storage: storage,
 blacklist:['getInOutCoinR', 'signupR', 'createTokenR', 'formReducer', 'signinR'] // not be persisted
};
const pReducer = persistReducer(persistConfig, rootReducer);
//Production config to hide redux logger
var store
process.env.REACT_APP_ENV === 'dev'? 
( store = createStore(pReducer, applyMiddleware(ReduxThunk, logger)) )
: ( store = createStore(pReducer, applyMiddleware(ReduxThunk)) )
const persistor = persistStore(store);

ReactDOM.render(
<Provider store={store}>
	<StripeProvider apiKey="pk_test_4AlyDaJP56agcQ3r9yYIMF5Z">
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</StripeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
