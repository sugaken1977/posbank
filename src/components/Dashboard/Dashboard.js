import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { sleep } from '../../modules/modules'
import NodeList from '../NodeList/NodeList'
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
		const { isAuthenticated, nodeData, onFetchNodeStats } = this.props
		
		return this.state.isLoading? <h1>Loading...</h1>
		: isAuthenticated? (
			<div>
			{
				// <NodeList nodeData = { nodeData } 
				// 	onFetchNodeStats = { onFetchNodeStats }
				// /> 
			}
				<MasterNodeList />
			</div>
		)
		: <Redirect to='/'/>

		
	}
} 

export default Dashboard;