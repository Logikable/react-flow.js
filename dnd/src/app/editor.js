import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from './constants';
import Node from './node';

var spec = {
	drop: function(props, monitor, component) {
		const delta = monitor.getDifferenceFromInitialOffset()
		const rec = ReactDOM.findDOMNode(component).getBoundingClientRect()
		const tile = monitor.getItem()

		component.setState({
			nodes: component.state.nodes.concat([{
				left: tile.left + delta.x - rec.left,
				top: tile.top + delta.y - rec.top
			}])
		})
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
			nodes.push(<Node key={i} left={data.left} top={data.top} />)
		} 

		return connectDropTarget(
			<div style={style}>
				{nodes}
			</div>
		);
	}
}

Editor.propTypes = {
	connectDropTarget: PropTypes.func
}

export default DropTarget(ItemTypes.tile, spec, collect)(Editor);
