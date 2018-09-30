import React from 'react'

class ExchangeStatus extends React.Component {
	render(){
		const {exStatus, isFExStatsLoading } = this.props
		return isFExStatsLoading?  <h1 className='tc'>Loading...</h1>
		:(
			<div>
				<h1 className='tc'>{`Status: ${exStatus}`}</h1>
			</div>
		);
	}
}

export default ExchangeStatus