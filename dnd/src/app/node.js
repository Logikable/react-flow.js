import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { ItemTypes, ProperNames } from './constants';

require('../css/react-contextmenu.css')

const spec = {
	beginDrag: function(props, monitor, component) {
		const { id, left, top, nodeName } = props
		return { id, left, top, nodeName }
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

	getBox() {
		return (
			<div style={{
				width: 90,
				height: 60,
				backgroundColor: 'silver',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				{ ProperNames[this.props.nodeName] }
			</div>
		)
	}

	componentDidMount() {
		const { connectDragPreview } = this.props;

		connectDragPreview(this.getBox())
	}

	render() {
		const { id, isDragging, connectDragSource, connectDragPreview } = this.props
		return (
			<div>
				<div style={{
					position: 'absolute',
					left: this.props.left,
					top: this.props.top
				}}>
					<ContextMenuTrigger id={ toString(id) } holdToDisplay={ -1 }>
						{
							isDragging ? null : connectDragSource(this.getBox())
						}
					</ContextMenuTrigger>
				</div>

				<ContextMenu id={toString(id)}>
					<MenuItem data={{name: 'name'}} onClick={() => { alert('name!') }}>
						Name
					</MenuItem>
					<MenuItem divider />
					<MenuItem data={{}} onClick={() => { alert('properties!') }}>
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
	nodeName: PropTypes.string.isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.node, spec, collect)(Node)
