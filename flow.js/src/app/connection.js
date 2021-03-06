import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Connection extends Component {
	render() {
		const { sX, sY, eX, eY, height } = this.props
		const leniency = 20
		const dx = eX - sX
		const dy = eY - sY

		var points = sX + ',' + sY + ' '
		var moves = []			// relative, not absolute
		if (dy == 0 && dx > 0) {
			moves = [[dx, dy]]
		} else if (dx < leniency) {
			if (Math.abs(dy) < height + leniency) {
				const fVert = height / 2 + leniency + (dy > 0 ? 0 : -dy)		// first vertical movement
				const sVert = height / 2 + leniency + (dy > 0 ? dy : 0)		// second vertical movement
				moves = [
					[leniency, 0],
					[0, -fVert],
					[dx - 2 * leniency, 0],
					[0, sVert],
					[leniency, 0]
				]
			} else {
				const halfheight = dy / 2
				moves = [
					[leniency, 0],
					[0, halfheight],
					[dx - 2 * leniency, 0],
					[0, halfheight],
					[leniency, 0]
				]
			}
		} else if (dx >= leniency) {
			const halfwidth = dx / 2
			moves = [
				[halfwidth, 0],
				[0, dy],
				[halfwidth, 0]
			]
		}

		// builds the polyline string from the relative data generated by the positions of the ports
		var cx = sX
		var cy = sY
		moves.forEach((item, index) => {
			cx = cx + item[0]
			cy = cy + item[1]
			points += cx + ',' + cy + ' '
		})

		return (
			<polyline points={ points } style={{fill: 'none', stroke: 'black', strokeWidth: 2}} />
		)
	}
}

Connection.propTypes = {
	sX: PropTypes.number.isRequired,	// start
	sY: PropTypes.number.isRequired,
	eX: PropTypes.number.isRequired,	// end
	eY: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired			// height of a node
}
