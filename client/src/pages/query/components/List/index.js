import React, {memo, useMemo} from 'react';
import './index.css'
import URI from 'urijs'
import PropTypes from 'prop-types'

const ListItem = memo((props) => {
	const {
		dTime,
		aTime,
		dStation,
		aStation,
		trainNumber,
		time,
		date,
		priceMsg,
		dayAfter,
		remainTicket,
		trainStatusDes
	} = props;

	const url = useMemo(() =>
		new URI('ticket.html')
			.setSearch('aStation', aStation)
			.setSearch('dStation', dStation)
			.setSearch('trainNumber', trainNumber)
			.setSearch('date', date)
			.toString(), [aStation, dStation, trainNumber, date])

	return (
		<a href={url}>
			<li className='list-item'>
				<div className="item-cell time">
					<em className='m-lighter'>{dTime}</em>
					<br/>
					<em className='m-grayer'>{aTime} <i className='f-red'>{dayAfter}</i></em>
				</div>
				<div className="item-cell station">
					<em className='m-lighter'><i className='icon-station'>始</i>{dStation}</em>
					<br/>
					<em className='m-grayer'><i className='icon-station end'>终</i>{aStation}</em>
				</div>
				<div className="item-cell text-center">
					<em className='m-lighter'>{trainNumber}</em>
					<br/>
					<em className='m-grayer'>{time}</em>
				</div>
				<div className="item-cell text-right">
					<em className='m-lighter f-orange'>{priceMsg}</em>
					<br/>
					<em className='m-grayer'>{trainStatusDes}<span className='f-orange'>{remainTicket}</span></em>
				</div>
			</li>
		</a>
	)
})


function List (props) {
	const {
		list
	} = props;


	return (
		<ul className='train-list'>
			{
				list.map(item => <ListItem key={item.dTimeStr} {...item}/>)
			}
		</ul>
	)
}

List.props = {
	list: PropTypes.array.isRequired
}

export default memo(List);
