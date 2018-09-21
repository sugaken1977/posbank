import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Coins from '../Coins/Coins'
import Info from '../Info/Info'
import Checkout from '../Checkout/Checkout'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {

    const { onSignup, onSelectCoin, selectedCoin, onselectNodeQuantity } = this.props
    const { page } = this.state
    return (
      <div>
      <div>signup</div>
      <div>
        {page === 1 && (
          <Coins onNext={this.nextPage} 
                  onSelectCoin = { onSelectCoin }
                  onselectNodeQuantity = { onselectNodeQuantity }
        />)}
      
          {page === 2 && (
          <Info
            onBack={this.previousPage}
            onSignup = { onSignup }
            onNext = { this.nextPage }
          />
        )}
        {page === 3 && (
          <Checkout
            previousPage={this.previousPage}
          />
        )}

      </div>
      </div>
    )
  }
}


export default Signup