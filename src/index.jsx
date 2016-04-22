import 'babel-polyfill';

require('./styles/bootstrap/css/bootstrap-paper.css');
require('./styles');

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));
