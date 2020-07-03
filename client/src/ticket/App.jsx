import React from 'react';
import {connect} from 'react-redux'
import './App.css';

function App () {
	return (
		<div className="App">
			hello world
		</div>
	);
}

export default connect()(App);
