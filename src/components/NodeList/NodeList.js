import React from 'react'
import Node from '../Node/Node'
class NodeList extends React.Component{
	render(){
		const { nodeData, onFetchNodeStats, isFNStatsLoading } = this.props
		return <Node nodeData = { nodeData } 
					onFetchNodeStats = { onFetchNodeStats }
					isFNStatsLoading ={isFNStatsLoading}
				/>
	}
}

export default NodeList