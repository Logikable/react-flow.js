import React, { Component } from 'react';
import Tile from './tile';

export default class Toolbar extends Component {
	render() {
		const style = {
			width: 50,
			height: '96%',
			padding: '2% 0px 2% 0px',
			float: 'left',
			textAlign: 'center',
			borderColor: 'silver',
			borderStyle: 'solid'
		}

		var tiles = []
		for (var i = 0; i < 10; i += 1) {
			tiles.push(<Tile key={i} id={i} />)
		}

		return (
			<div style={style}>
				{tiles}
			</div>
		)
	}
}
