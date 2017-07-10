import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import keydown from 'react-keydown';
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

			const inConnectionId = component.connectionsByNode[node.id][0]			// hardcoded - assumes that inPortID is 0
			const outConnectionId = component.connectionsByNode[node.id][1]			// hardcoded - assumes that outPortID is 1
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
			cY: 0,			// unimplemented
			nodes: {
				0: {
					left: 50,
					top: 50,
					nodeName: 'data_upload',
				}
			},
			connections: {},
			selected: [],
		}	
	}

	componentWillReceiveProps(nextProps) {
		const { keydown: { event } } = nextProps
		if (event) {
			if (event.which === 46) {		// delete key
				this.deleteSelected()
			}
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

	modifySelection(id, state) {
		if (state && !this.state.selected.includes(id)) {			// change selected to true
			this.setState({
				selected: this.state.selected.concat([id])
			})
		} else if (!state && this.state.selected.includes(id)) {		// change selected to false
			this.setState({
				selected: this.state.selected.filter(i => i !== id)		// clever way of removing id from array
			})
		}
	}

	deleteSelected() {
		const nodesCopy = Object.assign({}, this.state.nodes)
		const connectionsCopy = Object.assign({}, this.state.connections)

		for (var i = 0; i < this.state.selected.length; i += 1) {
			const id = this.state.selected[i]
			delete nodesCopy[id]
			for (var portId in this.connectionsByNode[id]) {
				const connectionId = this.connectionsByNode[id][portId]
				delete connectionsCopy[connectionId]
			}
			delete this.connectionsByNode[id]
		}

		this.setState({
			nodes: nodesCopy,
			connections: connectionsCopy,
			selected: []
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

	deleteConnection(nodeId, portId) {
		const connectionId = this.connectionsByNode[nodeId][portId]

		const { sNodeId, sPortId, eNodeId, ePortId } = this.state.connections[connectionId]
		delete this.connectionsByNode[sNodeId][sPortId]
		delete this.connectionsByNode[eNodeId][ePortId]

		const copy = Object.assign({}, this.state.connections)
		delete copy[connectionId]
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
			const id = parseInt(key)
			nodes.push(<Node
				key={ i }
				id={ id }	
				left={ data.left } top={ data.top }
				inPorts={ 1 } outPorts={ 1 }				// hardcoded - assumes only one inPort and one outPort
				nodeName={ data.nodeName }
				isSelected={ this.state.selected.includes(id) }
				modifySelection={ this.modifySelection.bind(this) }
				connectedPorts={ Object.keys(this.connectionsByNode[id]) }		// keys of dictionary containing connection information sorted by node
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
				boxSizing: 'border-box'		// allows border to be contained inside div
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

export default keydown(DropTarget([ItemTypes.tile, ItemTypes.node], spec, collect)(Editor))
