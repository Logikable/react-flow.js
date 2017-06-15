import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { ItemTypes } from './constants';

require('../css/react-contextmenu.css')

const spec = {
	beginDrag: function(props, monitor, component) {
		const {id, left, top} = props
		return { id, left, top }
	}
}

function collect(connect, monitor) {
	return {
		isDragging: monitor.isDragging(),
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview()
	}
}

class Node extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { connectDragPreview } = this.props;

		const img = new Image();
		img.src = '../img/smile32x32.png';
		img.onload = () => connectDragPreview(img);
	}

	render() {
		const { id, isDragging, connectDragSource } = this.props
		if (isDragging) {
			return null
		}

		const style = {
			position: 'absolute',
			left: this.props.left,
			top: this.props.top
		}

		return connectDragSource(
			<div style={style}>
				<ContextMenuTrigger id={toString(id)}>
					<img src={require('../img/smile32x32.png')} />
				</ContextMenuTrigger>

				<ContextMenu id={toString(id)}>
					<MenuItem data={{name: 'name'}} onClick={() => {alert('name!')}}>
						Name
					</MenuItem>
					<MenuItem divider />
					<MenuItem data={{}} onClick={() => {alert('properties!')}}>
						Properties
					</MenuItem>
				</ContextMenu>
			</div>
		)
	}
}

Node.propTypes = {
	id: PropTypes.number.isRequired,
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.node, spec, collect)(Node)
