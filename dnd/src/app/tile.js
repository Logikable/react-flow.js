import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from './constants';

const spec = {
	beginDrag: function(props, monitor, component) {
		return {id: props.id, left: component.state.left, top: component.state.top}
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview()
	}
}

class Tile extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { connectDragPreview } = this.props;

		const img = new Image();
		img.src = '../img/smile.png';
		img.onload = () => connectDragPreview(img);

		const rec = ReactDOM.findDOMNode(this).getBoundingClientRect()
		this.setState({
			left: rec.left,	// + window.scrollX is not included because otherwise it would be subtracted later anyways
			top: rec.top
		})
	}

	render() {
		const { connectDragSource } = this.props;

		return connectDragSource(
			<img src={require('../img/smile32x32.png')} />
		)
	}
}

Tile.propTypes = {
	id: PropTypes.number.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.tile, spec, collect)(Tile)
