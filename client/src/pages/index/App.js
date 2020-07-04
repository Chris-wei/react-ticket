import React from 'react';
import {connect} from 'react-redux'
import './App.css';
//components
import Header from '../../components/Header'
import Journey from './components/Journey'
import HighSpeed from './components/HighSpeed'
import DepartDate from './components/DepartDate'
import Submit from './components/Submit'

function App (props) {
	console.log(props);
	return (
		<div className="App">
			index
			<Header/>
			<Journey/>
			<DepartDate/>
			<HighSpeed/>
			<Submit/>
		</div>
	);
}

export default connect(({ state }) => ({
	...state
}))(App);
