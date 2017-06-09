import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import BranchEnd from './branch-end';
import BranchHandle from './branch-handle';
import NodeTarget from './node-target';
import { ItemTypes } from './constants';

var dnd = require('react-dnd');

class Node extends Component {
	render() {
		this.update = false
		var branches = []

		if (this.props.node.branches) {
			for (var index in this.props.node.branches) {
				var branch = {}
				for (var key in this.props.node.branches[index]) {
					branch[key] = this.props.node.branches[index][key]
				}

				branch.key = 'k'+branch.branchId
				branch.BranchHandle = <BranchHandle
					BranchHandleContents={this.props.BranchHandleContents} 
					branch={branch} 
					dropBranch={this.props.dropBranch} />

				branches.push(React.createElement(this.props.BranchContents, branch))
			}
		}

		var branchesIn = []
		if (this.props.branchesIn) {
			for (var index in this.props.branchesIn) {
				branchesIn.push(<BranchEnd 
					BranchEndContents={this.props.BranchEndContents}
					branchId={this.props.branchesIn[index].branchId} />)
			}
		}

		var connectDragSource = this.props.connectDragSource;
		var isDragging = this.props.isDragging;

		var node = {}
		for (var index in this.props.node) {
			node[index] = this.props.node[index]
		}
		node.NodeTarget = <NodeTarget node={this.props.node} branchesIn={branchesIn} />
		node.NodeBranches = branches
		node.opts = this.props.opts

		var contents = React.createElement(this.props.NodeContents, node)

		var containerStyle = {
			position: 'absolute',
			top: this.props.y,
			left: this.props.x
		}

		return connectDragSource(
			<div style={containerStyle}>
				{contents}
			</div>
		)
	}
}

var nodeSource = { 
	beginDrag: function (props) {
		return {node:props.node, dropNode:props.dropNode}
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

export default DragSource(ItemTypes.nodeContainer, nodeSource, collect)(Node);