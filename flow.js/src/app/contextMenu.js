import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectMenu, ContextMenu, MenuItem } from 'react-contextmenu';
import Popup from 'react-popup';
import { MenuTypes } from './constants';

class NodeContextMenu extends Component {
	render() {
		const { id, trigger } = this.props
		if (!trigger) {
			return (
				<ContextMenu id={ id }> {} </ContextMenu>
			)
		}
		return (
			<ContextMenu id={ id }>
				<MenuItem data={{}} onClick={() => {}}>
					Node ID: { trigger.nodeId }
				</MenuItem>
				<MenuItem divider />
				<MenuItem data={{}} onClick={() => { Popup.alert(
					'Node Name: ' + trigger.nodeName + '\n'
					+ 'Node ID: ' + trigger.nodeId + '\n'
					+ 'Left: ' + trigger.left + '\n'
					+ 'Top: ' + trigger.top + '\n'
					+ 'Port IDs: ' + trigger.ports + '\n'
					+ 'Connected Ports: ' + trigger.connectedPorts)
				}}>
					Properties
				</MenuItem>
			</ContextMenu>
		)
	}
}

NodeContextMenu.propTypes = {
	id: PropTypes.string.isRequired,
	trigger: PropTypes.shape({
		nodeId: PropTypes.number.isRequired
	})
}

export default connectMenu(MenuTypes.node)(NodeContextMenu)
