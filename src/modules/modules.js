import React from 'react'
import TextField from '@material-ui/core/TextField'

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))



//redux form render field
export const renderField = ({ input, label, type, meta: { touched, error }, ...rest }) => {
  return <TextField 
    {...input}
    {...rest}
    type={type}
    label={label}
  />
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
    width: '50%',
    maxWidth: 430,
    padding: '2rem'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  customHeight:{
	height: 'auto !important',
  },
  pa3:{
  	padding: '1rem'
  },
  pa4:{
  	padding: '2rem'
  },
  button:{
    margin: theme.spacing.unit,
  }
});