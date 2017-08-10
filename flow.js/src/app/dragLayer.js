import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragLayer } from 'react-dnd';
import Connection from './connection';
import { ItemTypes } from './constants';

function collect(monitor) {
	var data = {
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}
	if (data.itemType === ItemTypes.connect) {
		data.initialPosition = data.item.getPosition()
	}
	return data
}

class EditorDragLayer extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
	}

	render() {
		const { item, itemType, initialOffset, currentOffset, isDragging } = this.props

		var contents = null
		if (itemType === ItemTypes.node) {

		} else if (itemType === ItemTypes.connect) {
			if (currentOffset != null && initialOffset != null) {
				const dx = currentOffset.x - initialOffset.x
				const dy = currentOffset.y - initialOffset.y
				const { initialPosition } = this.props

				const sX = initialPosition.left - this.rect.left
				const sY = initialPosition.top - this.rect.top
				const eX = initialPosition.left - this.rect.left + dx
				const eY = initialPosition.top - this.rect.top + dy

				contents = (
					<svg style={{
						height: '100%',
						width: '100%'
					}}>
						<Connection sX={ sX } sY={ sY } eX={ eX } eY={ eY } height={ 60 } />
					</svg>
				)
			}
		}

		return (
			<div style={{
				position: 'absolute',
				height: '500px',
				width: '500px',
				left: '50px',
				top: '0px',
				pointerEvents: 'none',
				zIndex: 10,
				borderColor: 'transparent',
				borderStyle: 'solid',
				boxSizing: 'border-box'
			}}>
				{ contents }
			</div>
		)
	}
}

EditorDragLayer.propTypes = {
	item: PropTypes.object,
	itemType: PropTypes.string,
	initialOffset: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}),
	currentOffset: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}),
	initialPosition: PropTypes.shape({
		left: PropTypes.number.isRequired,
		top: PropTypes.number.isRequired
	}),
	isDragging: PropTypes.bool.isRequired
}

export default DragLayer(collect)(EditorDragLayer)
