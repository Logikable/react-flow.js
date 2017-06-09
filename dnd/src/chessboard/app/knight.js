import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './constants';
import { DragSource } from 'react-dnd';

const knightSource = {
	beginDrag(props) {
		return {};
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

class Knight extends Component {
	render() {
		const {connectDragSource, isDragging } = this.props;
		return connectDragSource(
			<div style={{
				fontSize: 50,
				opacity: isDragging ? 0.5 : 1,
				fontWeight: 'bold',
				cursor: 'move'
			}}>
				♘
			</div>
		);
	}
}

Knight.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);