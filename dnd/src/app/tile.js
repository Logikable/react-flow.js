import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';
import { ItemTypes, ProperNames, SourceFiles } from './constants';

require('../css/styles.css');

const spec = {
	beginDrag: function(props, monitor, component) {
		return {left: component.state.left, top: component.state.top}
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
		const { name, connectDragPreview } = this.props;

		const img = new Image();
		img.src = '../img/' + SourceFiles['tile'][name];
		img.onload = () => connectDragPreview(img);

		// figuring out where the tile is located on the screen
		const rec = ReactDOM.findDOMNode(this).getBoundingClientRect()
		this.setState({
			left: rec.left,	// + window.scrollX is not included because otherwise it would be subtracted later anyways
			top: rec.top
		})
	}

	render() {
		const { name, connectDragSource } = this.props;

		return connectDragSource(
			<div>
				<img
					data-tip={ProperNames[name]}
					src={require('../img/' + SourceFiles['tile'][name])}
				/>
				<ReactTooltip class={'tooltip'} />
			</div>
		)
	}
}

Tile.propTypes = {
	name: PropTypes.string.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.tile, spec, collect)(Tile)
