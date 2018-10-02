import React from 'react'
import Select from 'react-select'
import { sleep } from '../../modules/modules'
import env from '../../config/env';

const initialState ={
	coinList: [],
	isGetCoinLoading: true,
	err: ''
}

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


class InputCoins extends React.Component {
	constructor(props){
		super(props)
		this.state = initialState
	}

	getCoinList = () => {
		return fetch(`${env.rootUrl}/coinlist`)
		.then(response => response.json())
		.then(async data =>{
			if(data.id){
				let coinList = []
				await data.result.map(coinName =>{
					let coin = { 
						value: coinName,
						label: coinName
						}
					coinList.push(coin)
					return coinList
				})
				this.setState({coinList: coinList})
				
				coinList[0]? this.setState({isGetCoinLoading: false}): null
			}
		})
		.catch(err => console.log(err))
	}

	componentWillMount (){
		this.getCoinList()
	}
	render(){
		const { onGetInputCoin, selectInputCoin, inputCoin }= this.props
		const { isGetCoinLoading } = this.state

		
		return <Select
			defaultValue={{ label: "btc", value: inputCoin }}
			isLoading={isGetCoinLoading}
			options={this.state.coinList} 
			formatGroupLabel={formatGroupLabel}
			onChange={(...args) => {
              	onGetInputCoin(args[0].value, selectInputCoin)

            	}
          	}
         />

	}
}


export default InputCoins;