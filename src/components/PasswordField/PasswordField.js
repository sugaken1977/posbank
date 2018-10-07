import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { styles, renderField } from '../../modules/modules'


class PasswordField extends React.Component{
	render(){
		const { classes, handleClickShowPassword, showPassword } = this.props;
	return <Field
          name="password"
          id='password-field'
          type={showPassword ? 'text' : 'password'}
          component={ renderField }
          label='Password'
          variant='outlined'
          className={classNames(classes.margin, classes.textField, classes.customHeight)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
	}
}

export default withStyles(styles)(PasswordField)