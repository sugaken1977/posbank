import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
    </div>
  </div>
)

const Signin = props => {
  const { error, handleSubmit, pristine, reset, submitting, onSignin, redirectSignin} = props
  
  if(redirectSignin) {
  return <Redirect to={{pathname: '/dashboard'}} />;
  }
  return (
    <form onSubmit={handleSubmit(onSignin)}>
      <Field
        name="email"
        type="text"
        component={renderField}
        label="Email"
      />
      <Field
        name="password"
        type="password"
        component={ renderField }
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Sign In
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signin' // a unique identifier for this form,
})(Signin)