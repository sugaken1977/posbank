import React from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { sleep } from '../../modules/modules'
import _ from "lodash";
import {Decimal} from 'decimal.js';
import ReactTooltip from 'react-tooltip'

// Decimal.set({ precision: 9, rounding: 4 })

const initialState = {
	isLoading: true
}

class Node extends React.Component{
	constructor(props){
		super(props)
		this.state = initialState
	}
	async componentDidMount(){
		this.props.onFetchNodeStats()
	}
	render(){
		const { nodeData } = this.props
		
		const data = nodeData.rows
		
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

		return data? (
			<div>
				<ReactTooltip id='total' type='dark' 
					getContent = { dataTip => <span>{`excluding review amount: ${dataTip} Zen`}</span>}
				/>
				  	

				<ReactTable data = { data } columns = { columns } 
							defaultPageSize={10}
         					className="-striped -highlight"
				/>
			</div>
		): <h1>Loading...</h1>
	}
}

export default Node