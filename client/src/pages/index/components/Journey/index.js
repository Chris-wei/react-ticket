import React from 'react';
import IconSwitch from '../../images/icon-switch.svg';
import './index.css'

function Journey (props) {
	const { to, from, exchangeFromTo, showCitySelector } = props;
	return (
		<div className="journey-wrapper">
			<div className="journey">
				<div
					className="journey-station"
					onClick={() => showCitySelector(true)}
				>
					<input
						type="text"
						readOnly
						name={'form'}
						value={from}
						className={'journey-input journey-from'}
					/>
				</div>
				<div
					className="journey-switch"
					onClick={() => exchangeFromTo()}
				>
					<img className={'icon-switch'} src={IconSwitch} alt="switch"/>
				</div>
				<div
					className="journey-station"
					onClick={() => showCitySelector(false)}
				>
					<input
						type="text"
						readOnly
						name={'to'}
						value={to}
						className={'journey-input journey-to'}
					/>
				</div>
			</div>
		</div>
	)
}

export default Journey
