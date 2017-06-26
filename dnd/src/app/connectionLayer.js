import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ConnectionLayer extends Component {
	render() {
		const { connections } = this.props
		return (
			<svg style={{
				height: '100%',
				width: '100%',
				position: 'absolute'
			}}>
				{ connections }
			</svg>
		)
	}
}

ConnectionLayer.propTypes = {
	connections: PropTypes.array.isRequired
}
