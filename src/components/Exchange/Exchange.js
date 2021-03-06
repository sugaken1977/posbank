import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import InputCoins from '../InputCoins/InputCoins'
import OutputCoins from '../OutputCoins/OutputCoins'
import { Redirect } from 'react-router-dom'

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={placeholder} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderField2 = ({
  input,
  type,
  value,
  placeholder,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
    <div className={'w-70'}>
      <input {...input} type={type} placeholder={placeholder} value={value} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const Exchange = props => {
  const { handleSubmit, submitting, onGetInputCoin, onGetOutputAmount, onGetWalletAddress, 
  	onGenerateTransaction, transactionId, outputAmount, onFetchOrders, coin, isAuthenticated, inputCoin} = props
  const selectInputCoin= true;
  let selectedCoin = 'Horizen'
 //  if(transactionId) {
 //  return <Redirect to={{pathname: '/send'}} />;
	// }
  return isAuthenticated? (
  	<div>
  		<div className='flex flex-row'>
	  		<div className='flex flex-row w-50'>
		  		<Field
			        name="inputCoin"
			        type="text"
			        component={renderField2}
			      	onChange ={onGetOutputAmount}
			        value="2"
			        placeholder="Require"
			        label={`Your ${selectedCoin} wallet`}
			      />
		  		<div className='mh1 w-30'>
		  			<InputCoins selectInputCoin = {selectInputCoin} 
		  			onGetInputCoin ={onGetInputCoin} 
		  			inputCoin = { inputCoin }
		  			/>
		  		</div>
	  		</div>
		  			<OutputCoins selectInputCoin = {!selectInputCoin} 
		  			onFetchOrders = { onFetchOrders }
		  			onGetInputCoin ={onGetInputCoin} 
		  			coin = { coin }
		  			outputAmount = { outputAmount }
		  			/>

  		</div>
	    <form onSubmit={handleSubmit(onGenerateTransaction)}>
	      <Field
	        name="userWalletAddress"
	        type="text"
	        onChange ={onGetWalletAddress}
	        component={renderField}
	        placeholder="Horizen address"
	        label={`Your ${selectedCoin} wallet`}
	      />
	      <div>
	        <button type="submit" disabled={submitting}>
	          Generate transaction
	        </button>
	      </div>
	    </form>
    </div>
  ): <h1>Please sign in or sign up</h1>
}

export default reduxForm({
  form: 'exchange', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncChangeFields: ['username']
})(Exchange)