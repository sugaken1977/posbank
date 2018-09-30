import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { sleep } from '../../modules/modules'

const state = {
	redirect: false
}

class Direction extends React.Component {
	constructor(props){
		super(props)
		this.state = state
	}
	async componentDidMount(){
		const { onFetchActivation, location } = this.props
		const {pathname} = location
		await onFetchActivation(pathname)
		if(this.props.activated){
			sleep(2000).then(()=>this.setState({redirect: true}))
		}
	}


	render() {

			const { isFALoading, activated} = this.props
			const {redirect} = this.state
			

			return isFALoading?<h1>Loading...</h1>
			:activated? 		<div>
									<p>Your acount has been activated. Please wait...</p>
			 						{redirect && <Redirect to={{pathname: '/checkout'}} />}
								</div>
			: <p>Page does not exist</p>		
			
		}		
}


export default Direction