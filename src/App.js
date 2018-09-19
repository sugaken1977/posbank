import React, { Component } from 'react';
import './App.css';
import Checkout from './components/Checkout/Checkout';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'tachyons';

import { connect } from 'react-redux';
import { createToken, signup, checkStripe, selectCard, signin, authenticate, signout } from './store/actions';

const mapStateToProps = (state) =>{
  return{
    tokenState: state.createTokenR,
    redirectSignup: state.signupR.redirectSignup,
    zipcode: state.signupR.zipcode,
    redirectSignin: state.signinR.redirectSignin,
    savedCards: state.checkStripeR.savedCards,
    haveStripe: state.checkStripeR.haveStripe,
    selectedCard: state.selectCardR.selectedCard,
    isAuthenticated: state.authenticateR.isAuthenticated
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    onCreateToken: (event, stripe) => dispatch(createToken(event, stripe)),
    onSignup: (values) => dispatch(signup(values)),
    onCheckStripe: (userId) => dispatch(checkStripe(userId)),
    onSelectCard: (id) =>dispatch(selectCard(id)),
    onSignin: (values) => dispatch(signin(values)),
    onSignout:  () => dispatch(signout()),
    onAuthenticate: () => dispatch(authenticate())
  }
}
class App extends Component {

  render() {
     const { onCreateToken, onSignup, onSignin, redirectSignup, zipcode, onCheckStripe, savedCards, 
      haveStripe, selectedCard, onSelectCard, redirectSignin, isAuthenticated, signout } = this.props
    return (
     <Router> 
      <div className="App">
        <h1>POSbank</h1>

        <Switch>


          <Route path='/checkout' exact
            render= {
              (props) => {
                return <Checkout {...props}
                onCreateToken = { onCreateToken } 
                zipcode={ zipcode }
                onCheckStripe = { onCheckStripe }
                savedCards = { savedCards }
                haveStripe = { haveStripe }
                selectedCard = { selectedCard }
                onSelectCard = { onSelectCard }
                />
               }
          } />

          <Route path='/signin' exact
            render={
              (props) => {
                return <Signin {...props} onSignin = { onSignin } redirectSignin = { redirectSignin }/>
              }
            } />

            <Route path='/info' exact
              render={
                (props) =>{
                  return <Signup {...props} onSignup = { onSignup } redirectSignup ={ redirectSignup }/>
                }
              } />
              <Route path='/signup' exact
              render={
                (props) =>{
                  return <WizardForm {...props} onSignup = { onSignup } redirectSignup ={ redirectSignup }/>
                }
              } />
              <Route path='/dashboard/:userId' exact
              render={
                (props) =>{
                  return <Dashboard {...props} isAuthenticated = { isAuthenticated } />
                }
              } />
        </Switch>

      </div>
    </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
