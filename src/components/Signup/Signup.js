import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import { Redirect, NavLink } from 'react-router-dom'

const renderField = ({
  input,
  label,
  placeholder,
  type,
  autocomplete,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={placeholder} autocomplete={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const SignUp = props => {
  const { handleSubmit, pristine, reset, submitting, onSignup, redirectSignup } = props
  
if(redirectSignup) {
  return <Redirect to={{pathname: '/checkout'}} />;
}
return (
    <form onSubmit={handleSubmit(onSignup)}>  
      <Field
      name="name"
      type="text"
      component={renderField}
      placeholder="山田太郎"
      label="お名前（全角）"
    />

    <div>
      <label>性別</label>
      <div>
        <label>
          <Field
            name="gender"
            component="input"
            type="radio"
            value="1"
          />{' '}
          男性
        </label>
        <label>
          <Field
            name="gender"
            component="input"
            type="radio"
            value="2"
          />{' '}
          女性
        </label>
      </div>
    </div>
    <Field
      name="birthday"
      type="text"
      component={renderField}
      placeholder="YYYY-MM-DD"
      label="生年月日"
    />
     
     <Field
      name="zipcode"
      type="text"
      component={renderField}
      placeholder="170-0011"
      label="郵便番号（半角数字）"
    />
 
      <Field
        name="state"
        type="text"
        component={renderField}
        placeholder="東京都"
        label="都道府県"
      />

        <Field
          name="city"
          type="text"
          component={renderField}
          placeholder="板橋区大和町"
          label="市区町村"
        />

        <Field
          name="line1"
          type="text"
          component={renderField}
          placeholder="1-2-3"
          label="丁番地"
        />

        <Field
          name="line2"
          type="text"
          component={renderField}
          placeholder="サンプルビル５４３号"
          label="建物名"
        />

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
          name="confirmPw"
          type="password"
          component={renderField}
          label="パスワード再入力"
        />
        

      <div>

        <button type="submit" disabled={submitting}>
          Sign Up
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signup', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncChangeFields: ['email']
})(SignUp)