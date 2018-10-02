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

import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as formReducer } from 'redux-form'
import { createTokenR, signupR, checkStripeR, selectCardR, signinR, authenticateR,
selectCoinR, getInOutCoinR, generateTransactionR, fetchActivationR, fetchExStatsR, 
fetchOrdersR, fetchNodeStatsR } from './store/reducers'


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
	form: formReducer
})
const persistConfig = {
 key: 'root',
 storage: storage,
 blacklist:['getInOutCoinR', 'fetchNodeStatsR', 'signupR'] // not be persisted
};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(ReduxThunk, logger));
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
