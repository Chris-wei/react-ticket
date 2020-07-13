import React, {useMemo} from 'react';
import './index.css'
import PropTypes from 'prop-types'
import BottomModal from './BottomModal'
import IconTime from '../../images/icon-time.png'
import IconTrain from '../../images/icon-train.png'
import IconTicket from '../../images/icon-ticket.png'
import IconFilter from '../../images/icon-filter.png'
import {ORDER_DEPART} from "../../store/constants";

export default function Bottom (props) {
	const {
		ticketTypes,
		trainTypes,
		departStations,
		arriveStations,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTimeEnd,
		highSpeed,
		orderType,
		onlyTickets,
		isFiltersVisible,
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
	} = props;

	const noChecked = useMemo(() => {
		return Object.keys(checkedTicketTypes).length === 0
			&& Object.keys(checkedTrainTypes).length === 0
			&& Object.keys(checkedDepartStations).length === 0
			&& Object.keys(checkedArriveStations).length === 0
			&& departTimeStart === 0
			&& departTimeEnd === 24
			&& arriveTimeStart === 0
			&& arriveTimeEnd === 24
	}, [checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations,
		departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd])

	return (
		<>
			<div className='filter-bot'>
				<div className="filter-item" onClick={toggleOrderType}>
					<img className='filter-icon' src={IconTime} alt=""/>
					<div className='filter-name'>{orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}</div>
				</div>
				<div className={`filter-item ${highSpeed ? 'active' : ''}`} onClick={toggleHighSpeed}>
					<img className='filter-icon' src={IconTrain} alt=""/>
					<div className='filter-name'>只看高铁动车</div>
				</div>
				<div className={`filter-item ${onlyTickets ? 'active' : ''}`} onClick={toggleOnlyTickets}>
					<img className='filter-icon' src={IconTicket} alt=""/>
					<div className='filter-name'>只看有票</div>
				</div>
				<div className={`filter-item ${isFiltersVisible || !noChecked ? 'active' : ''}`} onClick={toggleIsFiltersVisible}>
					<img className='filter-icon' src={IconFilter} alt=""/>
					<div className='filter-name'>综合筛选</div>
				</div>
			</div>
			{
				isFiltersVisible &&
				<BottomModal
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
					setCheckedTicketTypes={setCheckedTicketTypes}
					setCheckedTrainTypes={setCheckedTrainTypes}
					setCheckedDepartStations={setCheckedDepartStations}
					setCheckedArriveStations={setCheckedArriveStations}
					setDepartTimeStart={setDepartTimeStart}
					setDepartTimeEnd={setDepartTimeEnd}
					setArriveTimeStart={setArriveTimeStart}
					setArriveTimeEnd={setArriveTimeEnd}
					toggleIsFiltersVisible={toggleIsFiltersVisible}
				/>
			}
		</>
	)
}

Bottom.props = {
	ticketTypes: PropTypes.array.isRequired,
	trainTypes: PropTypes.array.isRequired,
	departStations: PropTypes.array.isRequired,
	arriveStations: PropTypes.array.isRequired,
	checkedTicketTypes: PropTypes.object.isRequired,
	checkedTrainTypes: PropTypes.object.isRequired,
	checkedDepartStations: PropTypes.object.isRequired,
	checkedArriveStations: PropTypes.object.isRequired,
	departTimeStart: PropTypes.number.isRequired,
	departTimeEnd: PropTypes.number.isRequired,
	arriveTimeStart: PropTypes.number.isRequired,
	arriveTimeEnd: PropTypes.number.isRequired,
	highSpeed: PropTypes.bool.isRequired,
	orderType: PropTypes.number.isRequired,
	onlyTickets: PropTypes.bool.isRequired,
	isFiltersVisible: PropTypes.bool.isRequired,
	toggleHighSpeed: PropTypes.func.isRequired,
	toggleOrderType: PropTypes.func.isRequired,
	toggleOnlyTickets: PropTypes.func.isRequired,
	toggleIsFiltersVisible: PropTypes.func.isRequired,
	setCheckedTicketTypes: PropTypes.func.isRequired,
	setCheckedTrainTypes: PropTypes.func.isRequired,
	setCheckedDepartStations: PropTypes.func.isRequired,
	setCheckedArriveStations: PropTypes.func.isRequired,
	setDepartTimeStart: PropTypes.func.isRequired,
	setDepartTimeEnd: PropTypes.func.isRequired,
	setArriveTimeStart: PropTypes.func.isRequired,
	setArriveTimeEnd: PropTypes.func.isRequired
}
