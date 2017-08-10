import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import { ItemTypes } from './constants';
var dnd = require('react-dnd')

var nodeInTarget = {
	drop: function (props, monitor) {
		var item = monitor.getItem()
		item.dropBranch(item.branch, props.node)
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class NodeIn extends Component {
	render() {
		var connectDropTarget = this.props.connectDropTarget;
		var isOver = this.props.isOver;

		return connectDropTarget(
			<div className="rf-dropTarget">
				{this.props.branchesIn}
				{isOver &&
					<div className="rf-nodeDragHover" />
				}
			</div>
		);
	}
}

NodeIn.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	isOver: PropTypes.bool.isRequired
}

export default DropTarget(ItemTypes.branchOut, nodeInTarget, collect)(NodeIn);