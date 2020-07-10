import React, {memo, useMemo} from 'react';
import './index.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import PropTypes from 'prop-types'

dayjs.locale('zh-cn')

function Nav (props) {
	const {
		date,
		isPrevDisabled,
		isNextDisabled,
		onPrev,
		onNext
	} = props;

	const currentString = useMemo(() => {
		const d = dayjs(date)
		return d.format('M月D日') + ' ' + d.format('ddd')
	}, [date])

	return (
		<div className='nav'>
			<div
				className={`nav-switch-btn ${isPrevDisabled ? 'disabled' : ''}`}
				onClick={onPrev}
			>前一天</div>
			<div className="nav-date-label">{currentString}</div>
			<div
				className={`nav-switch-btn ${isNextDisabled ? 'disabled' : ''}`}
				onClick={onNext}
			>后一天</div>
		</div>
	)
}

Nav.props = {
	date: PropTypes.number.isRequired,
	isPrevDisabled: PropTypes.bool.isRequired,
	isNextDisabled: PropTypes.bool.isRequired,
	onPrev: PropTypes.func.isRequired,
	onNext: PropTypes.func.isRequired
}

export default memo(Nav)
