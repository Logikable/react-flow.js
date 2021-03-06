import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import { ItemTypes } from './constants';

const dragSpec = {
	beginDrag: function(props, monitor, component) {
		const { nodeId, portId } = props
		return { nodeId, portId, connected: props.connected, getPosition: component.getPosition.bind(component) }
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
		if (props.connected) {
			props.deleteConnection(props.nodeId, props.portId)
		}
		if (item.connected) {
			props.deleteConnection(item.nodeId, item.portId)
		}
		
		const nextId = props.getNextConnectionId()
		const outPosition = item.getPosition()
		const inPosition = component.getPosition()

		props.addConnection(nextId, item.nodeId, item.portId, props.nodeId, props.portId,
			outPosition.left, outPosition.top, inPosition.left, inPosition.top)
	},
	canDrop: function(props, monitor) {
		const item = monitor.getItem()
		return props.nodeId !== item.nodeId			// cannot be same node
	}
}

function dropCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

function circle() {
	return (
		<svg height='16' width='16'>
			<circle cx='8' cy='8' r='4' stroke='white' strokeWidth='2' fill='silver' />
		</svg>
	)
}

class Port extends Component {		// Port acts as a superclass to InPort and OutPort
	constructor(props) {			// and also acts as a template when drawing Node's dragPreview
		super(props)
	}

	render() {
		return (
			<div>
				{ circle() }
			</div>
		)
	}
}

class OutPort extends Port {
	getPosition() {
		const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
		return { left: rect.left + 12, top: rect.top + 4 }	// hard coded numbers
	}

	componentDidMount() {
		const { connectDragPreview } = this.props
		
		connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		})
	}

	render() {
		const { connectDragSource } = this.props

		return connectDragSource(
			<div>
				{ circle() }
			</div>
		)
	}
}

OutPort.propTypes = {
	nodeId: PropTypes.number.isRequired,
	portId: PropTypes.number.isRequired,
	connected: PropTypes.bool.isRequired,
	getNextConnectionId: PropTypes.func.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

class InPort extends Port {
	getPosition() {
		const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
		return { left: rect.left, top: rect.top + 4 }	// hard coded numbers
	}

	render() {
		const { connectDropTarget } = this.props

		return connectDropTarget(
			<div>
				{ circle() }
			</div>
		)
	}
}

InPort.propTypes = {
	nodeId: PropTypes.number.isRequired,
	portId: PropTypes.number.isRequired,
	connected: PropTypes.bool.isRequired,
	addConnection: PropTypes.func.isRequired,
	deleteConnection: PropTypes.func.isRequired,
	getNextConnectionId: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired
}

OutPort = DragSource(ItemTypes.connect, dragSpec, dragCollect)(OutPort)
InPort = DropTarget(ItemTypes.connect, dropSpec, dropCollect)(InPort)
export { Port, InPort, OutPort }
