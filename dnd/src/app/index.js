import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import EventEmitter from 'events';
import ReactFlow from './flow';

let data = [
	{
		nodeId: 'node1',
		name: 'Node 1',
		maxBranches: 10,
		x: 20,
		y: 20,
		branches: [
			{branchId:'branch1', nodeId:"node2"},
			{branchId:'branch2', nodeId:"node2"},
			{branchId:'branch3', nodeId:"node2"}
		]
	},
	{
		nodeId: 'node2',
		name: 'Node 2',
		x: 250,
		y: 20
	},
	{
		nodeId: 'node3',
		name: 'Node 3',
		x: 250,
		y: 200
	}
]

let globalEmitter = new EventEmitter()

class MyFlowchart extends Component {
	constructor(props) {
		super(props)
		this.state = {nodes: data}
	}

	componentDidMount() {
		globalEmitter.addListener('updateNode', this._updateNode);
	}

	componentWillUnmount() {
		globalEmitter.removeListener('updateNode', this._updateNode);
	}

	_updateNode(values) {
		var nodeId = values.nodeId
		var nodes = this.state.nodes
		var node = this._findNode(nodeId, nodes)
		for (var key in values) {
			node[key] = values[key]
		}
		this.setState({nodes:nodes})
	}

	_findNode(nodeId, nodes) {
		for (var index in nodes) {
			if (nodes[index].nodeId === nodeId) {
				return nodes[index]
			}
		}
		return false
	}

	_findBranch(branchId, nodes) {
		for (var index in nodes) {
			if (nodes[index].branches) {
				for (var nindex in nodes[index].branches) {
					var branch = nodes[index].branches[nindex]
					if (branch.branchId === branchId) {
						return branch
					}
				}
			}
		}
		return false
	}

	_updateBranch(branchId, values) {
		var nodes = this.state.nodes
		var branch = this._findBranch(branchId, nodes)
		for (var key in values) {
			branch[key] = values[key]
		}
		this.setState({nodes:nodes})
	}

	_dropNode(node, coords) {
		var vals = {
			nodeId: node.nodeId,
			x: coords.x,
			y: coords.y
		}
		this._updateNode(vals)
	}

	_dropBranch(branch, node) {
		this._updateBranch(branch.branchId, {nodeId:node.nodeId})
	}

	render() {
		return (
			<div className="container">
			<ReactFlow
				NodeContents={NodeContents}
				BranchContents={BranchContents}
				dropBranch={this._dropBranch}
				dropNode={this._dropNode}
				nodes={this.state.nodes} />
			</div>
		);
	}
}

class NodeContents extends Component {
	_addNewBranch() {
		var branches = this.props.branches
		if (!branches) {
			branches = []
		}
		branches.push({branchId:uuid.v4()})

		var node = {
			nodeId: this.props.nodeId,
			branches: branches
		}
		globalEmitter.emit('updateNode', node)
	}

	render() {
		var html =
			<div className="node">
				{this.props.NodeTarget}
				<div className="branchHolder">
					{this.props.NodeBranches}
					<div onClick={this._addNewBranch}>+</div>
				</div>
			</div>
		return html
	}
}

NodeContents.propTypes = {
	NodeBranches: PropTypes.array,
	NodeTarget: PropTypes.element
}

class BranchContents extends Component {
	render() {
			var html =
			<div className='branchHandle'>
				{this.props.BranchHandle}
			</div>
		return html
	}
}

BranchContents.propTypes = {
	BranchHandle: PropTypes.element,
}

ReactDOM.render(
	<MyFlowchart />,
	document.getElementById('root')
)