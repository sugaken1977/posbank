import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import { Redirect, NavLink } from 'react-router-dom'
import PasswordField from '../PasswordField/PasswordField'
import EmailField from '../EmailField/EmailField'
import TextField from '@material-ui/core/TextField';
import EmailFieldSignup from '../EmailFieldSignup/EmailFieldSignup'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { styles } from '../../modules/modules'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft'

const SignupButton = props => {
  // console.log(props)
  return <button {...props} type="submit" disabled={this.submitting}>Signup</button>
}
const initialState ={
  showPassword: false
}
class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState
  }
  handleClickShowPassword = () => {
     this.setState({ showPassword: !this.state.showPassword });
    };

render(){
  const { handleSubmit, pristine, reset, submitting, onSignup, redirectSignup, onBack, 
    onNext, classes } = this.props
  const {showPassword} = this.state


  if(redirectSignup) {
    return <Redirect to={{pathname: '/signup-thankyou'}} />;
  }
  return (
     <div className='tc w-100 dt vh-75'>
      <div className='v-mid tc dtc'>
      <Paper className={classNames(classes.paper, classes.center, classes.pa4)} elevation={3}>
        <form onSubmit={handleSubmit(onSignup)} className='flex flex-column center '>  
            <EmailFieldSignup />
            <PasswordField handleClickShowPassword ={ this.handleClickShowPassword } 
              showPassword ={ showPassword }/>     
          <div>
           <div className='flex flex-row justify-center'>
             <IconButton variant="contained" className={classNames(classes.button)}
             component={NavLink} to="/select-coin">
                <BackIcon />
              </IconButton>

              <Button variant="contained" className={classNames(classes.button)}
                    component={SignupButton}>
              </Button>
            </div>
          </div>
        </form>
        </Paper>
      </div>
    </div>
    )
  }
}

Signup = withStyles(styles)(Signup)
export default reduxForm({
  form: 'signup',
  //  onSubmitSuccess: (result, dispatch, props) => {
  //   props.onNext()
  // },
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(Signup)