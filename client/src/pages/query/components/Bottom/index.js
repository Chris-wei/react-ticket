import React from 'react';
import './index.css'
import PropTypes from 'prop-types'

import IconTime from '../../images/icon-time.png'
import IconTrain from '../../images/icon-train.png'
import IconTicket from '../../images/icon-ticket.png'
import IconFilter from '../../images/icon-filter.png'
import {ORDER_DEPART} from "../../store/constants";

export default function Bottom (props) {
	const {
		highSpeed,
		orderType,
		onlyTickets,
		isFiltersVisible,
		toggleHighSpeed,
		toggleOrderType,
		toggleOnlyTickets,
		toggleIsFiltersVisible
	} = props;
	return (
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
			<div className={`filter-item ${isFiltersVisible ? 'active' : ''}`} onClick={toggleIsFiltersVisible}>
				<img className='filter-icon' src={IconFilter} alt=""/>
				<div className='filter-name'>综合筛选</div>
			</div>
		</div>
	)
}

Bottom.props = {
	highSpeed: PropTypes.bool.isRequired,
	orderType: PropTypes.number.isRequired,
	onlyTickets: PropTypes.bool.isRequired,
	isFiltersVisible: PropTypes.bool.isRequired,
	toggleHighSpeed: PropTypes.func.isRequired,
	toggleOrderType: PropTypes.func.isRequired,
	toggleOnlyTickets: PropTypes.func.isRequired,
	toggleIsFiltersVisible: PropTypes.func.isRequired
}
