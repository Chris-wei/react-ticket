import React, {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import URI from 'urijs'
import './App.css';
import {
	nextDate,
	prevDate,
	setArriveStation,
	setDepartDate,
	setDepartStation,
	setSearchParsed,
	setTrainNumber
} from './store/actions'
import dayjs from 'dayjs'
import {h0} from "../../utils/fp";
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Detail from '../../components/Detail'
import Candidate from './components/Candidate'
import Schedule from './components/Schedule'
import useNav from "../../components/Nav/useNav";

function App (props) {
	const {
		departDate,
		arriveDate,
		departTimeStr,
		arriveTimeStr,
		departStation,
		arriveStation,
		trainNumber,
		durationStr,
		tickets,
		isScheduleVisible,
		searchParsed,
		dispatch
	} = props;

	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	const {
		isPrevDisabled,
		isNextDisabled,
		prev,
		next
	} = useNav(departDate, dispatch, prevDate, nextDate)

	useEffect(() => {
		const query = URI.parseQuery(window.location.search);
		const { aStation, dStation, date, trainNumber } = query;
		// 解析url参数
		dispatch(setDepartStation(dStation))
		dispatch(setArriveStation(aStation))
		dispatch(setTrainNumber(trainNumber))
		dispatch(setDepartDate(h0(dayjs(date).valueOf())))
		dispatch(setSearchParsed(true))
	}, [])

	useEffect(() => {
		document.title = trainNumber;
	}, [trainNumber])

	useEffect(()=>{
		if(!searchParsed) return;
		const url = new URI('/rest/ticket')
			.setSearch('startStation',departStation)
			.setSearch('endStation',arriveStation)
			.setSearch('date',dayjs(departDate).format('YYYY-MM-DD'))
			.setSearch('trainNumber',trainNumber)
			.toString()

		fetch(url).then(res=>res.json())
			.then(res=>{
				console.log(res);
			})

	},[searchParsed])

	if ( !searchParsed ) {
		return null;
	}

	return (
		<div className="App">
			<Header
				title={trainNumber}
				onBack={onBack}
			/>
			<Nav
				date={departDate}
				isPrevDisabled={isPrevDisabled}
				isNextDisabled={isNextDisabled}
				onPrev={prev}
				onNext={next}
			/>

			<Detail/>
			<Candidate/>
			<Schedule/>
		</div>
	);
}

export default connect(({ state }) => ({
	...state
}))(App);
