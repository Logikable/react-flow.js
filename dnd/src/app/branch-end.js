import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BranchEnd extends Component {    
	render() {
		var contents = '▶'
		if (this.props.BranchEndContents) {
			contents = this.props.BranchEndContents
		}

		return (
			<div className='rf-branchEnd' id={'end-'+this.props.branchId}>
				{contents}
			</div>
		)
	}
}

BranchEnd.propTypes = {
	BranchEndContents: PropTypes.node,
	branchId: PropTypes.string
}