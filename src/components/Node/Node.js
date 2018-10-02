import React from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { sleep } from '../../modules/modules'

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

			    }
			},
			{
				Header: 'Zen',
				accessor: 'zen',
				className: 'tc',
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
				<ReactTable data = { data } columns = { columns } 
							defaultPageSize={10}
         					className="-striped -highlight"
				/>
			</div>
		): <h1>Loading...</h1>
	}
}

export default Node