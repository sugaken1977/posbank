import React from 'react'
import { Redirect } from 'react-router-dom'


class Dashboard extends React.Component {

	render(){
		const { isAuthenticated } = this.props
		return(
			isAuthenticated? <h1>Your Dashboard</h1>: <Redirect to='/' />
			)
	}
} 

export default Dashboard;