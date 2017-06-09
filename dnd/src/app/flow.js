import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget, DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';

import Node from './node';
import { ItemTypes } from './constants';

class Container extends Component {
	componentWillUpdate() {
		var canvas = this.refs.containerCanvas.getDOMNode()
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	componentDidUpdate() {
		this._resizeCanvas()
		this._drawConnections()
	}

	componentDidMount() {
		this._resizeCanvas()
		this._drawConnections()
	}

	_resizeCanvas() {
		var container = this.refs.container.getDOMNode()
		var canvas = this.refs.containerCanvas.getDOMNode()

		canvas.width = container.offsetWidth
		canvas.height = container.offsetHeight
	}

	_drawConnections() {
		var canvas = this.refs.containerCanvas.getDOMNode()
		var context = canvas.getContext('2d');
		var thisEl = React.findDOMNode(this)
		if (thisEl) {
			for (var index in this.props.nodes) {
				var node = this.props.nodes[index]
				for (var bindex in node.branches) {
					var branchId = node.branches[bindex].branchId
					var start = thisEl.querySelector('#handle-'+branchId)
					var finish = thisEl.querySelector('#end-'+branchId)
					if (finish) {
						var scoords = start.getBoundingClientRect()
						var fcoords = finish.getBoundingClientRect()
						var ccoords = thisEl.getBoundingClientRect()

						var smidx = scoords.left + (scoords.width / 2)
						var smidy = scoords.top + (scoords.height / 2)
						var fmidx = fcoords.left
						var fmidy = fcoords.top + (fcoords.height / 2)

						context.beginPath();
						context.moveTo(smidx - ccoords.left, smidy - ccoords.top);
						context.lineTo(fmidx - ccoords.left, fmidy - ccoords.top);
						context.stroke();
					}
				}
			}
		}
	}

	_collectNodeIn() {
		var nodes = {}
		for (var index in this.props.nodes) {
			if (this.props.nodes[index].branches) {
				for (var bindex in this.props.nodes[index].branches) {
					var branch = this.props.nodes[index].branches[bindex]
					if (branch.nodeId) {
						if (!nodes[branch.nodeId]) {
							nodes[branch.nodeId] = []
						}
						nodes[branch.nodeId].push(branch)
					}
				}
			}
		}
		return nodes
	}

	_branchUsed(nodeIn, branchId) {
		for (var index in nodeIn) {
			for (var bindex in nodeIn[index]) {
				if (nodeIn[index][bindex].branchId === branchId) {
					return true
				}
			}
		}
		return false
	}

	_dropNode(node, coords) {
		var thisEl = React.findDOMNode(this)
		var offset = thisEl.getBoundingClientRect()
		var offsetCoords = {
			x: coords.x - offset.left,
			y: coords.y - offset.top
		}
		this.props.dropNode(node, offsetCoords)
	}

	render() {
		var nodes = []
		var nodeIn = this._collectNodeIn()
		for (var index in this.props.nodes) {
			var node = this.props.nodes[index]
			var branchesIn = []
			if (nodeIn[node.nodeId]) {
				var branchesIn = nodeIn[node.nodeId]
			}

			var x = (node.x) ? node.x : 0
			var y = (node.y) ? node.y : 0

			nodes.push(<Node 
				node={node} 
				branchesIn={branchesIn} 
				BranchContents={this.props.BranchContents}
				NodeContents={this.props.NodeContents}
				BranchHandleContents={this.props.BranchHandleContents}
				BranchEndContents={this.props.BranchEndContents}
				dropBranch={this.props.dropBranch}
				dropNode={this._dropNode}
				opts={this.props.opts}
				x={x}
				y={y}
				key={"n"+index} />
			)
		}

		var connectDropTarget = this.props.connectDropTarget;
		var isOver = this.props.isOver;

		return connectDropTarget(
			<div style={{width:'100%', height:'100%'}}>
				<div ref="container" className="rf-container">
				{nodes}
				{isOver &&
					<div className="rf-containerDragHover" />
				}   

				<canvas className="rf-containerCanvas" ref="containerCanvas"></canvas>
				</div>
			</div>
		)
	}
}

Container.propTypes = {
	nodes: PropTypes.array.isRequired,
	BranchContents: PropTypes.element.isRequired,
	NodeContents: PropTypes.element.isRequired,
	BranchHandle: PropTypes.node,
	BranchEnd: PropTypes.node,
	NodeContents: PropTypes.element.isRequired,
	dropBranch: PropTypes.func.isRequired,
	dropNode: PropTypes.func.isRequired,
	opts: PropTypes.object
};

let containerTarget = { 
	drop: function (props, monitor) {
		var item = monitor.getItem()
		var node = item.node
		var coords = monitor.getSourceClientOffset()
		item.dropNode(node, coords)
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

let DropContainer = DropTarget(ItemTypes.nodeContainer, containerTarget, collect)(Container);

export default DragDropContext(HTML5Backend)(DropContainer);