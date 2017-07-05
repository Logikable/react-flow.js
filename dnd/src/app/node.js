import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { DragSource } from 'react-dnd';
import { Port, InPort, OutPort } from './port';
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

	componentDidMount() {
		const { connectDragPreview } = this.props

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
				{ ProperNames[this.props.nodeName] }
				<Port />
			</div>
		)
	}

	render() {
		const { id, addConnection, deleteConnection, getNextConnectionId,
			isDragging, connectDragSource, connectDragPreview } = this.props

		const inPort = (<InPort
			nodeId={ this.props.id }
			portId={ 0 }
			addConnection={ addConnection }
			deleteConnection={ deleteConnection }
			getNextConnectionId={ getNextConnectionId }
		/>)
		const outPort = (<OutPort
			nodeId={ this.props.id }
			portId={ 1 }					// out port does not need to be able to create, modify, or delete connections
			getNextConnectionId={ getNextConnectionId }
		/>)

		const box = (
			<div style={{
				width: 120,
				height: 60,
				backgroundColor: 'silver',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
				{ inPort }
				{ ProperNames[this.props.nodeName] }
				{ outPort }
			</div>
		)

		const trigger = (
			<ContextMenuTrigger id={ toString(id) } holdToDisplay={ -1 }>	{/* holdToDisplay makes drag and drop still work */}
				{ isDragging ? null : connectDragSource(box) }		{/* tertiary operator */}
			</ContextMenuTrigger>
		)

		const contextMenu = (
			<ContextMenu id={ toString(id) }>
				<MenuItem data={{name: 'name'}} onClick={() => { alert('name!') }}>
					Name
				</MenuItem>
				<MenuItem divider />
				<MenuItem data={{}} onClick={() => { alert('properties!') }}>
					Properties
				</MenuItem>
			</ContextMenu>
		)

		return (
			<div>
				<div style={{
					position: 'absolute',
					left: this.props.left,
					top: this.props.top
				}}>
					{ trigger }
				</div>
				{ contextMenu }
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
	addConnection: PropTypes.func.isRequired,
	deleteConnection: PropTypes.func.isRequired,
	getNextConnectionId: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.node, spec, collect)(Node)
