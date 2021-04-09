import React from 'react';
import { render } from 'react-dom';
import App from './js/App';
import './stylus/main.styl';

const root = document.querySelector('#root');
render(<App />, root);
