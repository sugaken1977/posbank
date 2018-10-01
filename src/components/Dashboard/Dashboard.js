import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { sleep } from '../../modules/modules'

const initialState = {
	isLoading: true
}
class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = initialState
	}
	componentWillMount(){
		// !this.props.isAuthenticated? this.setState({isloading: true})
		sleep(1000).then(()=> this.setState({isLoading: false}))
	}
	render(){
		const { isAuthenticated } = this.props
		console.log(isAuthenticated)
		return this.state.isLoading? <h1>Loading...</h1>
		: isAuthenticated? <h1>Your Dashboard</h1>
		: <Redirect to='/'/>

		
	}
} 

export default Dashboard;