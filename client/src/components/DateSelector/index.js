import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import {h0} from "../../utils/fp";

function Month (props) {
	const {
		startingTimeMonth,
		onSelect
	} = props;

	const startDay = new Date(startingTimeMonth);
	const currentDay = new Date(startingTimeMonth);

	let days = []

	while ( currentDay.getMonth() === startDay.getMonth() ) {
		days.push(currentDay.getTime())
		currentDay.setDate(currentDay.getDate() + 1)
	}

	days = new Array(startDay.getDay() ? startDay.getDay() : 7).fill(null).concat(days)

	const lastDay = new Date(days[days.length - 1])

	days = days.concat(new Array(lastDay.getDay() ? 6 - lastDay.getDay() : 1).fill(null));

	const weeks = [];

	for ( let row = 0; row < days.length / 7; row++ ) {
		const week = days.slice(row * 7, row * 7 + 7)
		weeks.push(week)
	}

	return (
		<table className='date-table' border={0}>
			<thead>
			<tr>
				<td colSpan={7} className='date-title'>{startDay.getFullYear()}年{startDay.getMonth() + 1}月</td>
			</tr>
			</thead>
			<tbody>
			<tr className='data-table-weeks'>
				<th className='weekend'>日</th>
				<th>一</th>
				<th>二</th>
				<th>三</th>
				<th>四</th>
				<th>五</th>
				<th className='weekend'>六</th>
			</tr>
			{
				weeks.map((week, index) =>
					<Week
						key={index}
						days={week}
						onSelect={onSelect}
					/>
				)
			}
			</tbody>
		</table>
	)
}

Month.props = {
	startingTimeMonth: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired
}


function Week (props) {
	const {
		days,
		onSelect
	} = props;

	return (
		<tr className="date-table-days">
			{
				days.map((day, index) =>
					<Day
						key={index}
						day={day}
						onSelect={onSelect}
					/>
				)
			}
		</tr>
	)
}

Month.props = {
	days: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired
}


function Day (props) {
	const {
		day,
		onSelect
	} = props;

	if ( !day ) return <td className='date-table-day null'/>

	const classes = ['date-table-day']

	const now = h0();
	// 过去
	if ( day < now ) classes.push('td-disabled')

	// 周末
	if ( [6, 0].includes(new Date(day).getDay()) ) classes.push('td-weekly')

	// 今天
	if ( day === now ) classes.push('td-active')

	// 格式化字母
	const dateString = now === day ? '今天' : new Date(day).getDate()

	const onHandleDaySelect = (e, day) => {
		const target = e.target;
		document.querySelector('td.td-active').classList.remove('td-active');
		//添加样式
		target.classList.add('td-active')
		onSelect(day)
	}

	return (
		<td className={classes.join(' ')} onClick={(e) => onHandleDaySelect(e, day)}>{dateString}</td>
	)
}

Day.props = {
	day: PropTypes.number,
	onSelect: PropTypes.func.isRequired
}

function DateSelector (props) {
	const {
		show,
		onSelect,
		onBack,
	} = props;

	// 当前日期
	const resetNow = () => {
		const time = new Date();
		time.setHours(0)
		time.setMinutes(0)
		time.setSeconds(0)
		time.setMilliseconds(0)
		time.setDate(1)
		return time
	}

	const now = resetNow();

	//当前月
	const monthSequence = [now.getTime()];
	// 后一个月
	now.setMonth(now.getMonth() + 1)
	monthSequence.push(now.getTime());
	// 后两个月
	now.setMonth(now.getMonth() + 1)
	monthSequence.push(now.getTime())

	return (
		<div className={`date-selector ${!show ? 'hidden' : ''}`}>
			<div className="date-selector-header">
				<div className="arrow-back" onClick={() => onBack()}>
					<svg width={42} height={42}>
						<polyline
							points={"25,13 16,21 25,29"}
							stroke={'#fff'}
							strokeWidth={2}
							fill={'none'}
						/>
					</svg>
				</div>
				<div className="date-selector-title">日期选择</div>
			</div>
			<div className="date-selector-tables">
				{
					monthSequence.map(month =>
						<Month key={month} startingTimeMonth={month} onSelect={onSelect}/>
					)
				}
			</div>
		</div>
	)
}


export default DateSelector;

DateSelector.props = {
	show: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired
}
