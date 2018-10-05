import React from 'react'
import ReactTable from "react-table";
import NodeList from '../NodeList/NodeList'
import "react-table/react-table.css";
import _ from "lodash";
import './MasterNodeList.css'

const db =[
	{
		coinName: 'Zen',
		balance: 4,
		price: 1000,
		valueChange: '+10%'
	},
	{
		coinName: 'Dash',
		balance: 5,
		price: 2000,
		valueChange:'-10%'
	},
	{
		coinName: 'Pivx',
		balance: 6,
		price: 2000,
		valueChange: '+15%'
	}

]
const initialState ={
	isClick:false
}
class MasterNodeList extends React.Component {
	constructor(props){
		super(props)
		this.state= initialState
	}
	componentDidMount(){
		let coin = 'zen'
		this.props.onFetchAllNodeStats(coin)
	}
	render(){
			const { allNodeData, price, onFetchNodeStats, nodeData } = this.props
			console.log(allNodeData)
			const columns = [
			{
			    Header: 'Index',
			    id: 'row',
			    filterable: false,
			    className: 'tc',
			    // Footer: 'Total: ' + gpuNum,
			    Cell: row => {
			    	// console.log(row)
			      return <span>{row.index+1}</span>;

			    },
			    Footer: row=> (
					<div>
						<strong>Total:</strong>{' '}
						<span>{ row.data.length } {' '} coins</span>
					</div>
				)
			},
			{
				Header: 'Coin name',
				accessor: 'coin'
			},
			{
				Header: 'Balance',
				accessor: 'allNodeBalance'
			},
			{
				Header: 'Price',
				id:'price',
				Cell: row => <span>{`${row.original.price} JPY`}</span>

			},
			{
				Header: 'Balance (Fiat)',
				id: 'fiatBalance',
				Cell: row =>{
					let {price, balance}= row.original
					return <span>{`${_.multiply(price, balance)} JPY`}</span>
				}
			},
			{
				Header: 'Value change',
				accessor: 'valueChange'
			}
		]
		return allNodeData? (
				
				!this.state.isClick? (
					<div className='mt4 center w-80'>
						<ReactTable data={allNodeData} 
						columns={columns}
						defaultPageSize={5}
						className="-highlight"
						getTdProps={(state, rowInfo, column, instance) => {
						    return {
						      onClick: (e, handleOriginal) => {
						         this.setState({isClick: true})
						        if (handleOriginal) {
						          handleOriginal();
						        }
						      }
						    };
						  }}
						/>
					</div>
					) :  <NodeList nodeData = { nodeData } 
					onFetchNodeStats = { onFetchNodeStats }
						/> 
				) :<h1>Loading...</h1>
	}
}
export default MasterNodeList;