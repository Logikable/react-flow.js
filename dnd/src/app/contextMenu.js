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
				<MenuItem data={{}} onClick={() => { alert('Name!') }}>
					{ trigger.nodeId }
				</MenuItem>
				<MenuItem divider />
				<MenuItem data={{}} onClick={() => { Popup.alert('Properties!') }}>
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
