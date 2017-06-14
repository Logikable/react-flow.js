import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from './constants';
import Node from './node';

const spec = {
	drop: function(props, monitor, component) {
		const delta = monitor.getDifferenceFromInitialOffset()
		
		if (monitor.getItemType() === ItemTypes.tile) {
			const rec = ReactDOM.findDOMNode(component).getBoundingClientRect()
			const tile = monitor.getItem()

			component.addNode(tile.left + delta.x - rec.left,
				tile.top + delta.y - rec.top)
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
			nodes: [{
				left: 0,
				top: 0
			}]
		}
	}

	addNode(left, top) {
		this.setState({
			nodes: this.state.nodes.concat([{
				left: left,
				top: top
			}])
		})
	}

	moveNode(id, left, top) {
		var stateCopy = Object.assign({}, this.state)
		stateCopy.nodes = stateCopy.nodes.slice()
		stateCopy.nodes[id] = {left, top}
		this.setState(stateCopy)
	}

	render() {
		const { connectDropTarget } = this.props;
		const style = {
			height: '100%',
			position: 'relative',
			overflow: 'hidden',
			borderColor: 'silver',
			borderStyle: 'solid'
		}

		var nodes = []
		for (var i = 0; i < this.state.nodes.length; i += 1) {
			var data = this.state.nodes[i]
			console.log(data)
			nodes.push(<Node key={i} id={i} left={data.left} top={data.top} />)
		} 

		return connectDropTarget(
			<div style={style}>
				{nodes}
			</div>
		)
	}
}

Editor.propTypes = {
	connectDropTarget: PropTypes.func
}

export default DropTarget([ItemTypes.tile, ItemTypes.node], spec, collect)(Editor)
