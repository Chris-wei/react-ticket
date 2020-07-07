import React, {useMemo} from 'react';
import PropTypes from 'prop-types'
import './index.css'
import dayjs from 'dayjs'
import {h0} from '../../../../utils/fp'

function DeparteDate (props) {
	const {
		time,
		onClick
	} = props;

	const h0OfDepart = h0(time);
	const departDate = new Date(h0OfDepart)

	const departDateString = useMemo(() => {
		return dayjs(h0OfDepart).format('YYYY-MM-DD')
	}, [h0OfDepart])

	const isToday = h0OfDepart === h0();

	const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]

	return (
		<div className="depart-date" onClick={onClick}>
			<div className='depart-day'>{departDateString}</div>
			<div className='depart-week'>{weekString}</div>
			{ isToday && <div className='today-tag'>（今天）</div> }
		</div>
	)
}

export default DeparteDate;

DeparteDate.props = {
	time: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}
