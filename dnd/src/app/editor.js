import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import Connection from './connection';
import { ItemTypes } from './constants';
import NodeContextMenu from './contextMenu';
import Node from './node';

const spec = {
	drop: function(props, monitor, component) {
		const delta = monitor.getDifferenceFromInitialOffset()

		if (monitor.getItemType() === ItemTypes.tile) {
			const rect = ReactDOM.findDOMNode(component).getBoundingClientRect()
			const tile = monitor.getItem()

			component.addNode(tile.left + delta.x - rect.left,
				tile.top + delta.y - rect.top,
				tile.name)
		} else if (monitor.getItemType() === ItemTypes.node) {
			const node = monitor.getItem()

			component.moveNode(node.id,
				node.left + delta.x,
				node.top + delta.y)

			const inConnectionId = component.connectionsByNode[node.id][0]
			const outConnectionId = component.connectionsByNode[node.id][1]
			const connectionsCopy = JSON.parse(JSON.stringify(component.state.connections))		// deep copy

			if (inConnectionId != undefined) {
				connectionsCopy[inConnectionId].eX += delta.x
				connectionsCopy[inConnectionId].eY += delta.y
			}
			if (outConnectionId != undefined) {
				connectionsCopy[outConnectionId].sX += delta.x
				connectionsCopy[outConnectionId].sY += delta.y
			}
			component.setState({ connections: connectionsCopy })
		}
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

class Editor extends Component {
	constructor(props) {
		super(props)

		// non-reactive state
		this.nextId = 1
		this.nextConnectionId = 0
		this.connectionsByNode = {
			0: {}
		}
		// react state
		this.state = {			// IMPORTANT: DO NOT PUT STATE VARIABLES THAT DO NOT REQUIRE RE-RENDERING IN THIS.STATE
			cX: 0,			// camera location
			cY: 0,
			nodes: {
				0: {
					left: 0,
					top: 0,
					nodeName: 'data_upload',
				}
			},
			connections: {}
		}
	}

	addNode(left, top, nodeName) {
		const id = this.nextId

		const copy = Object.assign({}, this.state.nodes)
		copy[id] = { left, top, nodeName, connections: {} }

		this.nextId = id + 1
		this.connectionsByNode[id] = {}
		this.setState({
			nodes: copy,
		})
	}

	moveNode(id, left, top) {
		const copy = Object.assign({}, this.state.nodes)
		copy[id].left = left
		copy[id].top = top
		this.setState({
			nodes: copy
		})
	}

	addConnection(id, sNodeId, sPortId, eNodeId, ePortId, sX, sY, eX, eY) {
		const connectionsCopy = Object.assign({}, this.state.connections)
		const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

		connectionsCopy[id] = { sNodeId, sPortId, eNodeId, ePortId,
			sX: sX - rect.left, sY: sY - rect.top, eX: eX - rect.left, eY: eY - rect.top }

		this.connectionsByNode[sNodeId][sPortId] = id
		this.connectionsByNode[eNodeId][ePortId] = id

		this.setState({
			connections: connectionsCopy
		})
	}

	deleteConnection(id) {
		const copy = Object.assign({}, this.state.connections)
		delete copy[id]
		this.setState({
			connections: copy
		})
	}

	getNextConnectionId() {
		const nextId = this.nextConnectionId
		this.nextConnectionId = nextId + 1
		return nextId
	}

	render() {
		const { connectDropTarget } = this.props;

		var nodes = []
		var i = 0
		for (var key in this.state.nodes) {
			const data = this.state.nodes[key]
			nodes.push(<Node
				key={ i }
				id={ parseInt(key) }
				left={ data.left } top={ data.top }
				inPorts={ 1 } outPorts={ 1 }
				nodeName={ data.nodeName }
				addConnection={ this.addConnection.bind(this) }
				deleteConnection={ this.deleteConnection.bind(this) }
				getNextConnectionId={ this.getNextConnectionId.bind(this) }
			/>)
			i += 1
		}

		var connections = []
		i = 0
		for (var key in this.state.connections) {
			const data = this.state.connections[key]
			connections.push(<Connection
				key={ i }
				sX={ data.sX } sY={ data.sY }
				eX={ data.eX } eY={ data.eY }
				height={ 60 }
			/>)
			i += 1
		}

		return connectDropTarget(
			<div style={{
				height: '500px',
				width: '500px',
				position: 'relative',
				overflow: 'hidden',
				borderColor: 'silver',
				borderStyle: 'solid',
				boxSizing: 'border-box'
			}}>
				{ nodes }
				<NodeContextMenu />
				<svg style={{
					height: '100%',
					width: '100%'
				}}>
					{ connections }
				</svg>
			</div>
		)
	}
}

Editor.propTypes = {
	connectDropTarget: PropTypes.func
}

export default DropTarget([ItemTypes.tile, ItemTypes.node], spec, collect)(Editor)
