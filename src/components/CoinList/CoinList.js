import React from 'react'
import Select from 'react-select'
import { sleep } from '../../modules/modules'
let options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const getCoinListInitialState ={
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


class CoinList extends React.Component {
	constructor(props){
		super(props)
		this.state = getCoinListInitialState
	}

	getCoinList = () => {
		return fetch('http://localhost:5001/coinlist')
		.then(response => response.json())
		.then(data =>{
			if(data.id){
				let coinList = []
				data.result.map(coinName =>{
					let coin = { 
						value: coinName,
						label: coinName
						}
					coinList.push(coin)
					return coinList
				})
				this.setState({coinList: coinList})
				sleep(1000).then(()=>this.setState({isGetCoinLoading: false}))
			}
		})
		.catch(err => console.log(err))
	}

	componentWillMount (){
		this.getCoinList()
	}
	render(){
		const { onGetInputCoin, selectInputCoin }= this.props
		// const { isGetCoinLoading }= this.state
		// console.log(this.state.coinList[0])
		let zen = 'zen'
		return selectInputCoin? <Select
			defaultInputValue={zen}
			options={this.state.coinList} 
			formatGroupLabel={formatGroupLabel}
			onChange={(...args) => {
              	onGetInputCoin(args[0].value, selectInputCoin)

            	}
          	}
         />
         :<span>{}</span>

	}
}


export default CoinList;