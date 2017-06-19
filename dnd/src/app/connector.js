import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';

const dragSpec = {
	beginDrag: function(props, monitor, component) {
		const { nodeId, connectorType } = props
		return { nodeId, connectorType }
	}
}

function dragCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview()
	}
}

const dropSpec = {
	drop: function(props, monitor, component) {
		const item = monitor.getItem()
		props.addConnection(item.nodeId, props.nodeId)			// connection goes from 'item' connector to this connector
	},
	canDrop: function(props, monitor) {
		const item = monitor.getItem()
		return props.nodeId !== item.nodeId && props.connectorType !== item.connectorType
	}
}

function dropCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

class Connector extends Component {
	getCircle() {
		return (
			<svg height='16' width='16'>
				<circle cx='8' cy='8' r='4' stroke='white' strokeWidth='2' fill='silver' />
			</svg>
		)
	}

	render() {
		const { connectDragPreview, connectDragSource, connectDropTarget } = this.props

		// temporary
		connectDragPreview(this.getCircle())

		return connectDropTarget(connectDragSource(
			<div>
				{ this.getCircle() }
			</div>
		))
	}
}

Connector.propTypes = {
	connectorType: PropTypes.number.isRequired,
	nodeId: PropTypes.number.isRequired,
	addConnection: PropTypes.func.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired
}

Connector = DragSource(ItemTypes.connect, dragSpec, dragCollect)(Connector)
Connector = DropTarget(ItemTypes.connect, dropSpec, dropCollect)(Connector)
export default Connector
