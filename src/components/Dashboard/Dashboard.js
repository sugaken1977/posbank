import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { sleep } from '../../modules/modules'
import NodeList from '../NodeList/NodeList'
import Loading from '../Loading/Loading'
import MasterNodeList from '../MasterNodeList/MasterNodeList'

const initialState = {
	isLoading: true
}
class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = initialState
	}
	componentWillMount(){
		
		sleep(1000).then(()=> this.setState({isLoading: false})) //wait for redux's props
	}
	render(){
		const { isAuthenticated, nodeData, onFetchNodeStats, allNodeData, price, onFetchAllNodeStats } = this.props
		
		return this.state.isLoading? <Loading />
		: isAuthenticated? (
			<div>
			{
				// <NodeList nodeData = { nodeData } 
				// 	onFetchNodeStats = { onFetchNodeStats }
				// /> 
			}
				<MasterNodeList onFetchAllNodeStats = { onFetchAllNodeStats }
								onFetchNodeStats = {  onFetchNodeStats }
								allNodeData = { allNodeData }
								nodeData = { nodeData } 
								price = { price }
				/>
			</div>
		)
		: <Redirect to='/'/>

		
	}
} 

export default Dashboard;