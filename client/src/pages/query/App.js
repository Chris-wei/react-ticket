import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {
	nextDate,
	prevDate,
	setArriveStations,
	setDepartDate,
	setDepartStations,
	setFrom,
	setHighSpeed,
	setSearchParsed,
	setTicketTypes,
	setTo,
	setTrainList,
	setTrainTypes,
	toggleHighSpeed,
	toggleIsFiltersVisible,
	toggleOnlyTickets,
	toggleOrderType,
	setCheckedTicketTypes,
	setCheckedTrainTypes,
	setCheckedDepartStations,
	setCheckedArriveStations,
	setDepartTimeStart,
	setDepartTimeEnd,
	setArriveTimeStart,
	setArriveTimeEnd
} from "./store/actions";
import URI from 'urijs'
import dayjs from 'dayjs'
import './App.css';
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Loading from "../../components/Loading";
import useNav from '../../components/Nav/useNav'
import List from './components/List'
import Bottom from './components/Bottom'
import {h0} from "../../utils/fp";

function App (props) {
	const {
		from,
		to,
		trainList,
		departDate,
		highSpeed,
		searchParsed,
		orderType,
		onlyTickets,
		ticketTypes,
		trainTypes,
		departStations,
		arriveStations,
		isFiltersVisible,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTimeEnd,
		dispatch
	} = props;

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = URI.parseQuery(window.location.search)
		const { from, to, date, highSpeed } = query;
		dispatch(setFrom(from))
		dispatch(setTo(to))
		dispatch(setDepartDate(h0(dayjs(date).valueOf())))
		dispatch(setHighSpeed(Boolean(Number(highSpeed))))
		dispatch(setSearchParsed(true))
	}, [dispatch])

	useEffect(() => {
		if ( !searchParsed ) return;
		const url = new URI('/rest/query')
			.setSearch('from', encodeURIComponent(from))
			.setSearch('to', encodeURIComponent(to))
			.setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
			.setSearch('highSpeed', highSpeed)
			.setSearch('orderType', orderType)
			.setSearch('onlyTickets', onlyTickets)
			.setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join(''))
			.setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join(''))
			.setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join(''))
			.setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join(''))
			.setSearch('departTimeStart', departTimeStart)
			.setSearch('departTimeEnd', departTimeEnd)
			.setSearch('arriveTimeStart', arriveTimeStart)
			.setSearch('arriveTimeEnd', arriveTimeEnd)
			.toString()

		setIsLoading(true)
		fetch(url).then(res => res.json())
			.then(res => {
				let dataMap = res.data.directTrainInfo;
				const { trains, filter: { ticketType, trainType, depStation, arrStation } } = dataMap;
				dispatch(setTrainList(trains))
				dispatch(setTicketTypes(ticketType))
				dispatch(setTrainTypes(trainType))
				dispatch(setDepartStations(depStation))
				dispatch(setArriveStations(arrStation))
				setIsLoading(false)
			})
	}, [
		searchParsed,
		from,
		to,
		departDate,
		highSpeed,
		orderType,
		onlyTickets,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTimeEnd,
		dispatch
	])

	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	const {
		isPrevDisabled,
		isNextDisabled,
		prev,
		next
	} = useNav(departDate, dispatch, prevDate, nextDate)


	const bottomCbs = useMemo(() => {
		return bindActionCreators({
			toggleHighSpeed,
			toggleOrderType,
			toggleOnlyTickets,
			toggleIsFiltersVisible,
			setCheckedTicketTypes,
			setCheckedTrainTypes,
			setCheckedDepartStations,
			setCheckedArriveStations,
			setDepartTimeStart,
			setDepartTimeEnd,
			setArriveTimeStart,
			setArriveTimeEnd
		}, dispatch)
	}, [dispatch])


	return (
		<div className="App">
			<Header
				title={`${from}-${to}`}
				onBack={onBack}
			/>
			<Nav
				date={departDate}
				isPrevDisabled={isPrevDisabled}
				isNextDisabled={isNextDisabled}
				onPrev={prev}
				onNext={next}
			/>

			{isLoading ? <Loading/> : <List list={trainList}/>}
			<Bottom
				highSpeed={highSpeed}
				onlyTickets={onlyTickets}
				orderType={orderType}
				isFiltersVisible={isFiltersVisible}
				ticketTypes={ticketTypes}
				trainTypes={trainTypes}
				departStations={departStations}
				arriveStations={arriveStations}
				checkedTicketTypes={checkedTicketTypes}
				checkedTrainTypes={checkedTrainTypes}
				checkedDepartStations={checkedDepartStations}
				checkedArriveStations={checkedArriveStations}
				departTimeStart={departTimeStart}
				departTimeEnd={departTimeEnd}
				arriveTimeStart={arriveTimeStart}
				arriveTimeEnd={arriveTimeEnd}
				{...bottomCbs}/>
		</div>
	);
}

export default connect(({ state }) => ({
	...state
}))(App);

