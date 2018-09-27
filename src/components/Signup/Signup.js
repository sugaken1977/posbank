import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import { Redirect, NavLink } from 'react-router-dom'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const renderField = ({
  input,
  label,
  type,
  autoComplete,
  meta: { asyncValidating, touched, valid, error }
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label} autoComplete={label}/>
      {touched && error && <span>{error}</span>}
      {touched && valid && <span>✓</span>}
    </div>
  </div>
)

const Signup = props => {
  const { handleSubmit, pristine, reset, submitting, onSignup, redirectSignup, onBack, onNext } = props
  
if(redirectSignup) {
  return <Redirect to={{pathname: '/checkout'}} />;
}
return (
    <form onSubmit={handleSubmit(onSignup)}>  
        <Field
          name="email"
          type="text"
          component={renderField}
          label="メールアドレス"
        />

        <Field
          name="password"
          type="password"
          component={renderField}
          label="パスワード"
        />

        <Field
          name="pwConfirm"
          type="password"
          component={renderField}
          label="パスワード再入力"
        />
        

      <div>

        <button type="button" disabled={submitting} onClick={onBack}>
          Back
        </button>

        <button type="submit" disabled={submitting}>
          Sign Up
        </button>
        
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signup',
  //  onSubmitSuccess: (result, dispatch, props) => {
  //   props.onNext()
  // },
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(Signup)