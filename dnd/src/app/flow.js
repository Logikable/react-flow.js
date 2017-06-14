import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Toolbar from './toolbar';
import Editor from './editor';

class Flow extends Component {
	render() {
		return (
			<div style={{
				width:'550px',
				height:'500px'
			}}>
				<Toolbar />
				<Editor />
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(Flow);
