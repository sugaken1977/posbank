import React from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { sleep } from '../../modules/modules'

import _ from "lodash";
import {Decimal} from 'decimal.js';
import ReactTooltip from 'react-tooltip'
import Loading from '../Loading/Loading'


// Decimal.set({ precision: 9, rounding: 4 })

const initialState = {
	isLoading: true,
	nodeData: []
}


class Node extends React.Component{
	constructor(props){
		super(props)
		this.state = initialState
	}
	componentDidMount(){
		sleep(1000).then(()=> this.setState({isLoading: false}))
	}

		
	// 	this.setState({
	// 		isFNStatsLoading: this.props.isFNStatsLoading, 
	// 		nodeData: this.props.nodeData})
	// }

	// static getDerivedStateFromProps(nextProps, prevState){
	// 	// console.log(nextProps)
	// 	// console.log(prevState)
	// 	if(nextProps.isFNStatsLoading !== prevState.isFNStatsLoading){
	// 		return {
	// 			isFNStatsLoading: nextProps.isFNStatsLoading,
	// 			nodeData: nextProps.nodeData 	
	// 		}
	// 	}
	// 	 return null;
	// }

	render(){
		const { nodeData, isFNStatsLoading } = this.props
	
		const columns = [
			{
			    Header: 'Payment Index',
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
						<span>{ row.data.length } {' '} Payments</span>
					</div>
				)
			},
			{
				Header: 'Node id',
				accessor: 'nodeId',
				className: 'tc',
			},
			{
				Header: 'Zen',
				accessor: 'zen',
				className: 'tc',
				Footer: row=> {
					 let total = _.round(_.sumBy(row.data, d => {
					 	return d.status === 'paid'? new Decimal(d.zen).toNumber(): 0
					 }), 9) 

					 let totalReview = _.round(_.sumBy(row.data, d=> {
					 	return d.status === 'review'? new Decimal(d.zen).toNumber(): 0
					 }), 9)
					 
					return	<div data-tip={totalReview} data-for='total'>
									<strong>Total paid:</strong>{' '}
									<span >{ total } {' '} Zen</span> 
							</div>
				}
			},
			{
				Header: 'Status',
				accessor: 'status',
				className: 'tc',
			},
			{
				Header: 'Paid at',
				id:'paidat',
				accessor: 'paidat',
				className: 'tc',
				Cell: row => {
					return row.original.paidat? <span>{row.original.paidat}</span>
					: <span>-</span>
				}
			},
		]
		
		return !this.state.isLoading? (
			<div>
				<ReactTooltip id='total' type='dark' 
					getContent = { dataTip => <span>{`excluding review amount: ${dataTip} Zen`}</span>}
				/>
				  	

				<ReactTable data = { nodeData } columns = { columns } 
							defaultPageSize={10}
         					className="-highlight"
				/>

			</div>
		): <Loading />
	}
}

export default Node