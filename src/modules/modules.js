import React from 'react'
import TextField from '@material-ui/core/TextField'

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))



//redux form render field
export const renderField = ({ input, label, type, meta: { touched, error }, ...rest }) => {
  return (
  		<TextField 
		    {...input}
		    {...rest}
		    error={touched && error? true: false}
		    helperText={touched && error? error: null}
		    type={type}
		    label={label}
		  />
		 )
}

export const asyncRenderField = ({ input, label, type, meta: { asyncValidating, touched, valid, error }, ...rest }) => {
  return (

	  	<TextField 
		    {...input}
		    {...rest}
		    type={type}
		    label={label}
		    className={asyncValidating ? 'async-validating text w-100' : ''}
		    error={touched && error? true: false}
		    helperText={touched && error? error: null}
	  	/>

  );
}
// material ui style
export const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
   paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '32em',
    padding: '2rem'
  },
  orderedCoins:{
  	...theme.mixins.gutters(),
  	paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'transparent',
    border: '1px solid rgba(14,41,57,.1)',
    boxShadow: 'inset 0 1px 0 hsla(0,0%,100%,.5), 0 1px 0 hsla(0,0%,100%,.5)',
    maxWidth: '32em',
  },
  textField: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  center:{
  	marginLeft: 'auto',
    marginRight: 'auto'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  containerFlex:{
  	flexGrow: 1
  },
  typographyButton: {
    ...theme.typography.button,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit,
  },
  customHeight:{
	height: 'auto !important',
  },
  pa3:{
  	padding: '1rem'
  },
  pa4:{
  	padding: '2rem'
  },
  mh3:{
  	margin: 10,
  },
  button:{
    margin: theme.spacing.unit,
  }
});