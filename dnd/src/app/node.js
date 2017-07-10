import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { DragSource } from 'react-dnd';
import ReactDOM from 'react-dom';
import { ItemTypes, MenuTypes, ProperNames } from './constants';
import { Port, InPort, OutPort } from './port';

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

		this._mouseUp = this._mouseUp.bind(this)		// allows function to be called from other environment frames while still being able to use 'this' keyword
	}

	_mouseUp(e) {
		if (e.button !== 0) {		// must be a left click: 0 - left, 1 - middle, 2 - right
			return
		}
		const { id, isSelected, modifySelection } = this.props
		modifySelection(id, !isSelected)
	}

	componentDidMount() {
		const { nodeName, connectDragPreview } = this.props

		connectDragPreview(
			<div style={{
				width: 120,
				height: 60,
				backgroundColor: 'silver',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
				<Port />
				{ ProperNames[nodeName] }
				<Port />
			</div>
		)

		ReactDOM.findDOMNode(this).addEventListener('mouseup', this._mouseUp)		// enables nodes to be selected by clicking
	}

	render() {
		const { id, left, top, nodeName, isSelected,
			connectedPorts, addConnection, deleteConnection, getNextConnectionId,
			isDragging, connectDragSource, connectDragPreview } = this.props

		const inPort = (<InPort
			nodeId={ id }
			portId={ 0 }
			connected={ connectedPorts.includes('0') }			// hardcoded - assumes inPortID = 0
			addConnection={ addConnection }
			deleteConnection={ deleteConnection }
			getNextConnectionId={ getNextConnectionId }
		/>)
		const outPort = (<OutPort
			nodeId={ id }
			portId={ 1 }
			connected={ connectedPorts.includes('1') }			// hardcoded - assumes outPortID = 1
			getNextConnectionId={ getNextConnectionId }				// out port does not need to be able to create, modify, or delete connections
		/>)

		const box = (
			<div style={{
				width: 120,
				height: 60,
				backgroundColor: 'silver',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				borderColor: 'aqua',
				borderStyle: 'solid',
				borderWidth: isSelected ? '1px' : '0px',
				boxSizing: 'border-box'
			}}>
				{ inPort }					{/* hardcoded - assumes there is only one inPort */}
				{ ProperNames[nodeName] }
				{ outPort }					{/* hardcoded - assumes there is only one outPort */}
			</div>
		)

		const trigger = (
			<ContextMenuTrigger
				id={ MenuTypes.node }
				holdToDisplay={ -1 }		/* holdToDisplay makes drag and drop still work */
				nodeId={ id }
				collect={ props => { return props } }
			>
				{ isDragging ? null : connectDragSource(box) }		{/* tertiary operator */}
			</ContextMenuTrigger>
		)

		return (
			<div>
				<div style={{
					position: 'absolute',
					left: left,
					top: top
				}}>
					{ trigger }
				</div>
			</div>
		)
	}
}

Node.propTypes = {
	id: PropTypes.number.isRequired,
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired,
	inPorts: PropTypes.number.isRequired,
	outPorts: PropTypes.number.isRequired,
	nodeName: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	modifySelection: PropTypes.func.isRequired,
	connectedPorts: PropTypes.array.isRequired,
	addConnection: PropTypes.func.isRequired,
	deleteConnection: PropTypes.func.isRequired,
	getNextConnectionId: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.node, spec, collect)(Node)
