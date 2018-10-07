import React from 'react'
import ReactTable from "react-table";
import NodeList from '../NodeList/NodeList'
import Loading from '../Loading/Loading'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import "react-table/react-table.css";
import _ from "lodash";
import './MasterNodeList.css'
import { sleep } from '../../modules/modules'

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
	isClick:false,
	isLoading: true
}
class MasterNodeList extends React.Component {
	constructor(props){
		super(props)
		this.state= initialState
	}
	componentDidMount(){
		let coin = 'zen'
		this.props.onFetchAllNodeStats(coin)
		this.props.onFetchNodeStats(coin)
	}
	// componentDidUpdate(){
	// 	console.log(this.state)
	// }
	handleClick = () => {
		this.setState({
			isClick: false,
			isLoading: true
		})
	}
	render(){
			const { allNodeData, price, onFetchNodeStats, nodeData, isFNStatsLoading } = this.props
			
			const columns = [
			{
			    Header: 'Index',
			    id: 'row',
			    filterable: false,
			    className: 'tc',
			    // Footer: 'Total: ' + gpuNum,
			    Cell: row => {
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
				Header: 'Balance (Coin)',
				accessor: 'allNodeBalance'
			},
			{
				Header: 'Price',
				id:'price',
				Cell: row => <span>{`${_.round(row.original.price, 2)} USD`}</span>

			},
			{
				Header: 'Balance (Fiat)',
				id: 'fiatBalance',
				Cell: row =>{
					let {price, allNodeBalance}= row.original
					return <span>{`${_.round(_.multiply(price, allNodeBalance),2)} USD`}</span>
				}
			},
			{
				Header: 'Value change',
				accessor: 'valueChange'
			}
		]
		// console.log(this.state.isLoading)
		return allNodeData[0]  ? (
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
						         sleep(1000).then(()=> this.setState({isLoading: false}))
						         // console.log(rowInfo)
						        if (handleOriginal) {
						          handleOriginal();
						        }
						      }
						    };
						  }}
						/>
					</div>
					) : (
						<div className='flex flex-column w-80 center'> 
							{!this.state.isLoading && <IconButton variant="fab"  
													aria-label="Close" 
													className='self-center'
													onClick={this.handleClick}
													>
													<Close  />
												</IconButton>}
							<NodeList nodeData = { nodeData } 
							onFetchNodeStats = { onFetchNodeStats }
							isFNStatsLoading = { isFNStatsLoading }
							/>
						</div>
					)  
				) : <Loading />
	}
}
export default MasterNodeList;