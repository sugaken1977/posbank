import React from 'react'
import { reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import PasswordField from '../PasswordField/PasswordField'
import EmailField from '../EmailField/EmailField'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { styles } from '../../modules/modules'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const initialState ={
  showPassword: false
}
const Submit = props => {
  // console.log(props)
  return <button {...props} type="submit" disabled={this.submitting}>Signin</button>
}

class Signin extends React.Component  {
  constructor(){
    super()
    this.state = initialState
  }
 
  handleClickShowPassword = () => {
     this.setState({ showPassword: !this.state.showPassword });
    };
  handleSubmitting = () =>{
    this.setState({submitting: true})
  }
  
 
  render(){
    const { error, handleSubmit, pristine, reset, onSignin, redirectSignin,
    signinError, classes} = this.props
    const { showPassword, submitting } = this.state
    if(redirectSignin) {
      return <Redirect to={{pathname: '/dashboard'}} />;
    }

  return (
    <div className='tc w-100 dt vh-75'>
      <div className='v-mid tc dtc'>
      <Paper className={classNames(classes.paper, classes.center, classes.pa4)} elevation={3}>
        <form  className='flex flex-column center' onSubmit={handleSubmit(onSignin)}>
          <Typography variant="headline" gutterBottom>
            Sigin to your account
        </Typography>
         {signinError && <span className='red w-100 center pt2 pb2'>{signinError}</span>}
          <EmailField />
          <PasswordField handleClickShowPassword ={ this.handleClickShowPassword } 
          showPassword ={ showPassword }/> 
          <div className='mv2'>
            
          <Button variant="contained"
                  classNames={classNames(classes.button)}
                  component={Submit}>
          </Button> 
          
          </div>
        </form>
    </Paper>
      </div>
    </div>
  )
}
}
Signin = withStyles(styles)(Signin)
export default reduxForm({
  form: 'signin' // a unique identifier for this form,
})(Signin)