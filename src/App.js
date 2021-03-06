import React, { Component } from 'react';
import './App.css';
import Checkout from './components/Checkout/Checkout';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
// import Navigation from './components/Navigation/Navigation';
import Navigation2 from './components/Navigation/Navigation2';
import SelectCoins from './components/SelectCoins/SelectCoins';
import Dashboard from './components/Dashboard/Dashboard';
import Exchange from './components/Exchange/Exchange';
import Send from './components/Send/Send';
import AfterSignup from './components/AfterSignup/AfterSignup';
import ExchangeStatus from './components/ExchangeStatus/ExchangeStatus';
import Direction from './components/Direction/Direction';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Decimal} from 'decimal.js';
import 'tachyons';

import { connect } from 'react-redux';
import { createToken, signup, checkStripe, selectCard, signin, signout,
selectCoin, selectNodeQuantity, getCoinList, getInputCoin, getOutputAmount, getWalletAddress, 
fetchActivation, generateTransaction, fetchExStats, fetchOrders, fetchNodeStats, fetchAllNodeStats} from './store/actions';


const mapStateToProps = (state) =>{
  return{
    stripeComplete: state.createTokenR.stripeComplete,
    redirectSignup: state.signupR.redirectSignup,
    zipcode: state.signupR.zipcode,
    verifiedHash: state.signupR.VerifiedHash,
    redirectSignin: state.signinR.redirectSignin,
    email: state.signinR.email,
    signinError: state.signinR.signinError,
    savedCards: state.checkStripeR.savedCards,
    haveStripe: state.checkStripeR.haveStripe,
    selectedCard: state.selectCardR.selectedCard,
    isAuthenticated: state.authenticateR.isAuthenticated,
    selectedCoin: state.selectCoinR.selectedCoin,
    nodeQuantity: state.selectCoinR.nodeQuantity,
    outputAmount: state.getInOutCoinR.outputAmount,
    inputCoin: state.getInOutCoinR.inputCoin, //input coin (from as used in changelly)
    transactionState: state.generateTransactionR,
    transactionId: state.generateTransactionR.transactionId,
    activated: state.fetchActivationR.activated,
    isFALoading: state.fetchActivationR.isFALoading,
    exStatus: state.fetchExStatsR.exStatus,
    isFExStatsLoading: state.fetchExStatsR.isFExStatsLoading,
    coin: state.fetchOrdersR.coin, // the coin (from db) that user selected
    isFOLoading: state.fetchOrdersR.isFOLoading,
    nodeData: state.fetchNodeStatsR.nodeData,
    allNodeData: state.fetchAllNodeStatsR.allNodeData,
    price: state.fetchNodeStatsR.price,
    // isFANStatsLoading: state.fetchNodeStatsR.isFNStatsLoading

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
    onSelectCoin: (coin) => dispatch(selectCoin(coin)),
    onselectNodeQuantity: (event) => dispatch(selectNodeQuantity(event.target.value)),
    onGetInputCoin: (coinName, type) => dispatch(getInputCoin(coinName, type)),
    onGetOutputAmount: (event)=>dispatch(getOutputAmount(event.target.value)),
    onGetWalletAddress: (event)=>dispatch(getWalletAddress(event.target.value)),
    onGenerateTransaction: ()=>dispatch(generateTransaction()),
    onFetchActivation: (pathname) => dispatch(fetchActivation(pathname)),
    onFetchExStats: (redirect)=>dispatch(fetchExStats(redirect)),
    onFetchOrders: () =>dispatch(fetchOrders()),
    onFetchNodeStats: (coin) => dispatch(fetchNodeStats(coin)),
    onFetchAllNodeStats: (coin) => dispatch(fetchAllNodeStats(coin)) 
  }
}
class App extends Component {

  render() {
     const { onCreateToken,stripeComplete, onSignup, onSignin, isAuthenticated, onSignout, redirectSignup, verifiedHash, 
      zipcode, onCheckStripe, savedCards, haveStripe, selectedCard, onSelectCard, redirectSignin, selectedCoin, onSelectCoin, 
      onselectNodeQuantity, onGetInputCoin, onGetOutputAmount, inputCoin, onGetWalletAddress, onGenerateTransaction, transactionState,
      transactionId, outputAmount, nodeQuantity, onFetchActivation, activated, isFALoading, exStatus, isFExStatsLoading, onFetchExStats, 
      coin, onFetchOrders, isFOLoading, nodeData, onFetchNodeStats,onFetchAllNodeStats, email, allNodeData, price, isFNStatsLoading, 
      signinError } = this.props

    return (
     <Router> 
      <div className="App">
      <Navigation2 onSignout = { onSignout } isAuthenticated = { isAuthenticated } email = { email }/>
        <Switch>
          <Route path='/dashboard' exact
              render = {
                (props) => {
                  return <Dashboard { ...props } 
                  isAuthenticated = { isAuthenticated } 
                  nodeData = { nodeData }
                  onFetchNodeStats = { onFetchNodeStats }
                  onFetchAllNodeStats = { onFetchAllNodeStats }
                  allNodeData = { allNodeData }
                  price = { price }
                  isFNStatsLoading ={ isFNStatsLoading }
                  />
                }
              } />

          <Route path='/checkout' exact
            render = {
              (props) => {
                return <Checkout { ...props }
                onCreateToken = { onCreateToken } 
                zipcode={ zipcode }
                onCheckStripe = { onCheckStripe }
                savedCards = { savedCards }
                haveStripe = { haveStripe }
                selectedCard = { selectedCard }
                onSelectCard = { onSelectCard }
                stripeComplete = { stripeComplete }
                onFetchOrders  = { onFetchOrders }
                selectedCoin = { selectedCoin }
                coin = { coin }
                isFOLoading = { isFOLoading }
                isAuthenticated = { isAuthenticated }
                />
               }
          } />

          <Route path='/signin' exact
            render={
              (props) => {
                return <Signin { ...props } 
                onSignin = { onSignin } 
                redirectSignin = { redirectSignin }
                signinError = { signinError }
                />
              }
            } />  
             <Route path='/select-coin' exact
            render={
              (props) => {
                return <SelectCoins { ...props } 
                selectedCoin = { selectedCoin } 
                onSelectCoin = { onSelectCoin }
                nodeQuantity = { nodeQuantity }
                onselectNodeQuantity = { onselectNodeQuantity }
                isAuthenticated = { isAuthenticated } 
                />
              }
            } />

            <Route path='/signup' exact
              render={
                (props) =>{
                  return <Signup { ...props } onSignup = { onSignup } 
                  redirectSignup ={ redirectSignup }
                  selectedCoin = { selectedCoin }
                  onSelectCoin = { onSelectCoin }
                  
                  />
                }
              } />
              <Route path='/signup-thankyou' exact
              render={
                (props) =>{
                  return <AfterSignup />
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
                  onFetchOrders = { onFetchOrders }
                  coin = { coin }
                  isAuthenticated = { isAuthenticated }
                  inputCoin = { inputCoin }
                  />
                }
              } />  
              <Route path='/send' exact
               render={
                (props) => {
                  return <Send {...props} 
                    transactionState = { transactionState }
                    onFetchExStats = { onFetchExStats }

                  />
                }
              } />

              <Route path='/exchange-status' exact
               render={
                (props) => {
                  return <ExchangeStatus {...props} 
                    exStatus = { exStatus }
                    
                  />
                }
              } />

              {
                // Direction route for directing after email verification
              }
               <Route path='/verify/:verifiedHash' exact
               render={
                (props) => {
                  return <Direction {...props} 
                      verifiedHash = {verifiedHash}
                      activated = { activated }
                      onFetchActivation = { onFetchActivation }
                      isFALoading = { isFALoading }
                  />
                }
              } />

              


        </Switch>

      </div>
    </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
