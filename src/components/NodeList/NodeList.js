import React from 'react'
import Node from '../Node/Node'
class NodeList extends React.Component{
	render(){
		const { nodeData, onFetchNodeStats } = this.props
		return <Node nodeData = { nodeData } 
					onFetchNodeStats = { onFetchNodeStats }
				/>
	}
}

export default NodeList