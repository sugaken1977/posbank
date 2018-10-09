import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { styles, asyncRenderField } from '../../modules/modules'



class EmailFieldSignup extends React.Component{
	render(){
		const { classes, handleClickShowPassword, showPassword } = this.props;
		return <Field
	          name="email"
	          type='text'
	          component={ asyncRenderField }
	          label='Email'
	          variant='outlined'
	          className={classNames(classes.textField)}
	        />
	}
}

export default withStyles(styles)(EmailFieldSignup)