import PropTypes from 'prop-types';
import React, { Component } from 'react';

const style = {
	off: {},
	on: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 32,
		border: 'inset 2px'
	}
}

export default class ConnectTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			connectMode: false,
			style: style.off
		}
	}

	toggleConnect() {
		const newMode = !this.state.connectMode

		this.props.setConnectMode(newMode)
		this.setState({
			connectMode: newMode,
			style: newMode ? style.on : style.off
		})
	}

	render() {
		return (
			<div style={ this.state.style }>
				<img src={ '../img/connect.png' } onClick={ this.toggleConnect.bind(this) } />
			</div>
		)
	}
}

ConnectTile.propTypes = {
	setConnectMode: PropTypes.func.isRequired
}
