import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button';

const renderField = ({ input, label, type, custom, className, meta: { touched, error } }) => (
  <TextField 
    {...input}
    {...custom}
    type={type}
    helperText ={touched && error}
    className ={className}
  />

)
const Submit = props => <button type="submit" disabled={props.submitting}>Signin</button>
const Signin = props => {
  const { error, handleSubmit, pristine, reset, submitting, onSignin, redirectSignin} = props
  
  if(redirectSignin) {
    return <Redirect to={{pathname: '/dashboard'}} />;
  }
  return (
    <div className='tc w-100 dt'>
      <form  className='flex flex-column w-40 center v-mid tc dtc' onSubmit={handleSubmit(onSignin)}>
        <Field
          name="email"
          component={TextField}
          hintText="Email"
          floatingLabelText="Email"
        />
        <Field
          name="password"
          type="password"
          component={ renderField }
          label="Password"
          className='mv1'
        />
        {error && <strong>{error}</strong>}
        <div>
          
          <Button variant="contained" type="submit" disabled={props.submitting}>
            Signin
          </Button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'signin' // a unique identifier for this form,
})(Signin)