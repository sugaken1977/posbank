import React, { Component } from 'react';
import './App.css';
import Checkout from './components/Checkout/Checkout';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Coins from './components/Coins/Coins';
import Dashboard from './components/Dashboard/Dashboard';
import Exchange from './components/Exchange/Exchange';
import Send from './components/Send/Send';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'tachyons';

import { connect } from 'react-redux';
import { createToken, signup, checkStripe, selectCard, signin, authenticate, signout,
selectCoin, selectNodeQuantity, getCoinList, getInputCoin, getOutputAmount, getWalletAddress, generateTransaction} from './store/actions';


const mapStateToProps = (state) =>{
  return{
    tokenState: state.createTokenR,
    redirectSignup: state.signupR.redirectSignup,
    zipcode: state.signupR.zipcode,
    redirectSignin: state.signinR.redirectSignin,
    savedCards: state.checkStripeR.savedCards,
    haveStripe: state.checkStripeR.haveStripe,
    selectedCard: state.selectCardR.selectedCard,
    isAuthenticated: state.authenticateR.isAuthenticated,
    selectedCoin: state.selectCoinR.selectedCoin,
    nodeQuantity: state.selectCoinR.nodeQuantity,
    outputAmount: state.getInOutCoinR.outputAmount,
    transactionState: state.generateTransactionR,
    transactionId: state.generateTransactionR.transactionId
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    onCreateToken: (event, stripe) => dispatch(createToken(event, stripe)),
    onSignup: (values, props) => dispatch(signup(values, props)),
    onCheckStripe: (userId) => dispatch(checkStripe(userId)),
    onSelectCard: (id) =>dispatch(selectCard(id)),
    onSignin: (values) => dispatch(signin(values)),
    onSignout:  () => dispatch(signout()),
    onAuthenticate: () => dispatch(authenticate()),
    onSelectCoin: (coin) => dispatch(selectCoin(coin)),
    onselectNodeQuantity: (event) => dispatch(selectNodeQuantity(event.target.value)),
    onGetInputCoin: (coinName, type) => dispatch(getInputCoin(coinName, type)),
    onGetOutputAmount: (event)=>dispatch(getOutputAmount(event.target.value)),
    onGetWalletAddress: (event)=>dispatch(getWalletAddress(event.target.value)),
    onGenerateTransaction: ()=>dispatch(generateTransaction())
  }
}
class App extends Component {

  render() {
     const { onCreateToken, onSignup, onSignin, redirectSignup, zipcode, onCheckStripe, savedCards, 
      haveStripe, selectedCard, onSelectCard, redirectSignin, isAuthenticated, signout, selectedCoin,
      onSelectCoin, onselectNodeQuantity, onGetInputCoin, onGetOutputAmount, onGetWalletAddress, 
      onGenerateTransaction, transactionState, transactionId, outputAmount, nodeQuantity} = this.props
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
             <Route path='/choosecoin' exact
            render={
              (props) => {
                return <Coins {...props} 
                selectedCoin = { selectedCoin } 
                onSelectCoin = { onSelectCoin }
                nodeQuantity = { nodeQuantity }
                onselectNodeQuantity = { onselectNodeQuantity }
                />
              }
            } />

            <Route path='/signup' exact
              render={
                (props) =>{
                  return <Signup {...props} onSignup = { onSignup } 
                  redirectSignup ={ redirectSignup }
                  selectedCoin = { selectedCoin }
                  onSelectCoin = { onSelectCoin }
                  
                  />
                }
              } />

              <Route path='/exchange' exact
               render={
                (props) => {
                  return <Exchange {...props} selectedCoin = { selectedCoin }
                  onGetInputCoin = { onGetInputCoin }
                  onGetOutputAmount = { onGetOutputAmount }
                  onGetWalletAddress = { onGetWalletAddress }
                  onGenerateTransaction = { onGenerateTransaction }
                  outputAmount = { outputAmount }
                  transactionId = { transactionId }
                  />
                }
              } />  
              <Route path='/send' exact
               render={
                (props) => {
                  return <Send {...props} 
                    transactionState = { transactionState }
                  />
                }
              } />

              <Route path='/dashboard/:userId' exact
              render={
                (props) =>{
                  return <Dashboard {...props} isAuthenticated = { isAuthenticated } signout />
                }
              } />
        </Switch>

      </div>
    </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
