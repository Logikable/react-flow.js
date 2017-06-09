import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import { ItemTypes } from './constants';

var dnd = require('react-dnd');

var branchSource = { 
	beginDrag: function (props) {
		return {branch:props.branch, dropBranch:props.dropBranch}
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

class BranchOut extends Component {
	componentDidMount() {
		var connectDragPreview = this.props.connectDragPreview;
		connectDragPreview(<div>▶</div>);
	}

	render() {
		var connectDragSource = this.props.connectDragSource;
		var isDragging = this.props.isDragging;

		var contents = '⬤'
		if (this.props.BranchEndContents) {
			contents = this.props.BranchEndContents
		}

		return connectDragSource(
			<div className='rf-branchHandle' id={'handle-'+this.props.branch.branchId} style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: 'move'
			}}> 
				{contents}
			</div>
		)
	}
}

BranchOut.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired,
	BranchHandleContents: PropTypes.node,
	isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.branchOut, branchSource, collect)(BranchOut);