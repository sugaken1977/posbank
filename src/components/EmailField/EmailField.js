import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { styles, renderField } from '../../modules/modules'


class EmailField extends React.Component{
	render(){
		const { classes, handleClickShowPassword, showPassword } = this.props;
		return <Field
	          name="email"
	          type='text'
	          component={ renderField }
	          label='Email'
	          variant='outlined'
	          className={classNames(classes.margin, classes.textField)}
	        />
	}
}

export default withStyles(styles)(EmailField)