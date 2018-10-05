import React from 'react'
import ReactTable from "react-table";
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
class MasterNodeList extends React.Component {

	render(){
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
				accessor: 'coinName'
			},
			{
				Header: 'Balance',
				accessor: 'balance'
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
		return(
			<div>

				<div className='mt4 center w-80'>
					<ReactTable data={db} 
					columns={columns}
					defaultPageSize={5}
					className="-highlight"
					/>
				</div>
			</div>
			)
	}
}

export default MasterNodeList;