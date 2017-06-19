import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';
import Node from './node';

const spec = {
	drop: function(props, monitor, component) {
		const delta = monitor.getDifferenceFromInitialOffset()

		if (monitor.getItemType() === ItemTypes.tile) {
			const rec = ReactDOM.findDOMNode(component).getBoundingClientRect()
			const tile = monitor.getItem()

			component.addNode(tile.left + delta.x - rec.left,
				tile.top + delta.y - rec.top,
				tile.name)
		} else if (monitor.getItemType() === ItemTypes.node) {
			const node = monitor.getItem()

			component.moveNode(node.id,
				node.left + delta.x,
				node.top + delta.y)
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
		this.state = {
			nextId: 1,
			nodes: [{
				id: 0,
				left: 0,
				top: 0,
				nodeName: 'data_upload'
			}],
			connections: []
		}
	}

	addNode(left, top, nodeName) {
		const { nextId:id } = this.state 		// shorthand for setting id = this.state.nextId
		this.setState({
			nodes: this.state.nodes.concat([{ id, left, top, nodeName }]),
			nextId: this.state.nextId + 1
		})
	}

	moveNode(id, left, top) {
		const nodeName = this.state.nodes[id].nodeName
		var stateCopy = Object.assign({}, this.state)
		stateCopy.nodes = stateCopy.nodes.slice()
		stateCopy.nodes[id] = { id, left, top, nodeName }
		this.setState(stateCopy)
	}

	addConnection(start, end) {
		this.setState({
			connections: this.state.connections.concat([{ start, end }])
		})
		console.log(this.state.connections)
	}

	render() {
		const { connectDropTarget } = this.props;

		var nodes = []
		for (var i = 0; i < this.state.nodes.length; i += 1) {
			var data = this.state.nodes[i]
			nodes.push(<Node
				key={ i } id={ data.id } left={ data.left } top={ data.top }
				nodeName={ data.nodeName } addConnection={ this.addConnection.bind(this) } />)
		}

		return connectDropTarget(
			<div style={{
				height: '100%',
				position: 'relative',
				overflow: 'hidden',
				borderColor: 'silver',
				borderStyle: 'solid'
			}}>
				{ nodes }
			</div>
		)
	}
}

Editor.propTypes = {
	connectDropTarget: PropTypes.func
}

export default DropTarget([ItemTypes.tile, ItemTypes.node], spec, collect)(Editor)
