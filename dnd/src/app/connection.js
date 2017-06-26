import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Connection extends Component {
	render() {
		const { sX, sY, eX, eY } = this.props
		return (
			<path d={ 'M ' + sX + ' ' + sY + ' L ' + eX + ' ' + eY } stroke='black' />
		)
	}
}

Connection.propTypes = {
	sX: PropTypes.number.isRequired,	// start
	sY: PropTypes.number.isRequired,
	eX: PropTypes.number.isRequired,	// end
	eY: PropTypes.number.isRequired
}
