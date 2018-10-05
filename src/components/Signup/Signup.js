import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import { Redirect, NavLink } from 'react-router-dom'
import { TextField } from 'redux-form-material-ui'
// import TextField from '@material-ui/core/TextField';


const renderField = ({
  input,
  label,
  type,
  component,
  meta: { asyncValidating, touched, valid, error },
  ...custom
}) => (
  <TextField 
    {...input}
    {...custom}
    type={type}
    helperText ={touched && error || touched && valid}
  />
  /*<div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating text' : ''}>
      <input {...input} type={type} placeholder={label} autoComplete={label} component={TextField}/>
      {touched && error && <span>{error}</span>}
      {touched && valid && <span>✓</span>}
    </div>
  </div>*/

)

const Signup = props => {
  const { handleSubmit, pristine, reset, submitting, onSignup, redirectSignup, onBack, onNext } = props
  
if(redirectSignup) {
  return <Redirect to={{pathname: '/signup-thankyou'}} />;
}
return (
   <div className='tc'>
    <form onSubmit={handleSubmit(onSignup)} className='flex flex-column w-30 center'>  

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
  </div>
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