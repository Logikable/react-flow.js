import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import EditorDragLayer from './dragLayer';
import Editor from './editor';
import Toolbar from './toolbar';

class Flow extends Component {
	render() {		
		return (
			<div style={{
				width: '550px',
				height: '500px'
			}}>
				<Toolbar />
				<Editor />
				<EditorDragLayer /> 
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(Flow);
