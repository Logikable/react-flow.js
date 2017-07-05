import React, { Component } from 'react';
import Tile from './tile';
import { NodeNames } from './constants'

export default class Toolbar extends Component {
	render() {
		var tiles = []
		for (var i = 0; i < NodeNames.length; i += 1) {
			tiles.push(<Tile
				key={ i }
				name={ NodeNames[i] }
			/>)
		}

		return (
			<div style={{
				width: '50px',
				height: '500px',
				padding: '2% 0px 0px 0px',
				float: 'left',
				textAlign: 'center',
				borderColor: 'silver',
				borderStyle: 'solid',
				boxSizing: 'border-box'
			}}>
				{ tiles }
			</div>
		)
	}
}
