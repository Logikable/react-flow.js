import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Node extends Component {
	constructor(props) {
		super(props)
		this.state = {
			left: props.left,
			top: props.top
		}
	}

	render() {
		return (
			<div style={{
				position: 'absolute',
				left: this.state.left,
				top: this.state.top
			}}>
				<img src={require('../img/smile32x32.png')} />
			</div>
		)
	}
}

Node.propTypes = {
	left: PropTypes.number.isRequired,
	top: PropTypes.number.isRequired
}
