import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import { observe } from './game';

const rootEl = document.getElementById('root');

observe(knightPosition =>
	ReactDOM.render(
		<Board knightPosition={knightPosition} />,
		rootEl
	)
);