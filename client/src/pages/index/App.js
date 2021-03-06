import React, {useCallback, useMemo} from 'react';
import dayjs from 'dayjs'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './App.css';
import {
	exchangeFromTo,
	fetchCityData,
	hideCitySelector,
	hideDateSelector,
	setDepartDate,
	setSelectedCity,
	showCitySelector,
	showDateSelector,
	toggleHighSpeed
} from './store/actions'
//components
import Header from '../../components/Header'
import CitySelector from '../../components/CitySelector'
import DateSelector from '../../components/DateSelector'
import Journey from './components/Journey'
import HighSpeed from './components/HighSpeed'
import DepartDate from './components/DepartDate'
import Submit from './components/Submit'
import {h0} from "../../utils/fp";

function App (props) {
	const {
		from,
		to,
		dispatch,
		departDate,
		isCitySelectorVisible,
		cityData,
		isLoadingCityData,
		isDateSelectorVisible,
		highSpeed
	} = props;

	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	const cbs = useMemo(() => {
		return bindActionCreators({
			exchangeFromTo,
			showCitySelector
		}, dispatch)
	}, [dispatch])


	const citySelectorCbs = useMemo(() => {
		return bindActionCreators(({
			onBack: hideCitySelector,
			fetchCityData,
			onSelect: setSelectedCity
		}), dispatch)
	}, [dispatch])

	const departDateCbs = useMemo(() => {
		return bindActionCreators(({
			onClick: showDateSelector
		}), dispatch)
	}, [dispatch])

	const dateSelectorCbs = useMemo(() => {
		return bindActionCreators(({
			onBack: hideDateSelector
		}), dispatch)
	}, [dispatch])

	const onSelectDate = useCallback((day) => {
		if ( !day ) return;
		if ( day < h0() ) return;
		dispatch(setDepartDate(day))
		dispatch(hideDateSelector())
	}, [dispatch])

	const highSpeedCbs = useMemo(() => {
		return bindActionCreators(({
			toggle: toggleHighSpeed
		}), dispatch)
	}, [dispatch])


	const onSubmit = useCallback(() => {
		let date = dayjs(departDate).format('YYYY-MM-DD')
		window.location.href = `./query.html?from=${from}&to=${to}&date=${date}&highSpeed=${Number(highSpeed)}`
	}, [from, to, departDate, highSpeed])

	return (
		<div className="App">
			<Header title={'火车票'} onBack={onBack}/>
			<div className="bg-image"/>
			<div className="search-box">
				<Journey
					from={from}
					to={to}
					{...cbs}
				/>
				<DepartDate
					time={departDate}
					{...departDateCbs}
				/>
				<HighSpeed highSpeed={highSpeed} {...highSpeedCbs}/>
				<Submit onSubmit={onSubmit}/>
			</div>
			{/*	城市选择*/}
			<CitySelector
				show={isCitySelectorVisible}
				cityData={cityData}
				isLoading={isLoadingCityData}
				{...citySelectorCbs}
			/>
			{/*	日期选择*/}
			<DateSelector
				show={isDateSelectorVisible}
				onSelect={onSelectDate}
				{...dateSelectorCbs}
			/>
		</div>
	);
}

export default connect(({ state }) => ({
	...state
}))(App);
