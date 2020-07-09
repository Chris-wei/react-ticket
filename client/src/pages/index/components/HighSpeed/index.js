import React from 'react';
import PropTypes from 'prop-types'
import './index.css'

function HighSpeed (props) {
	const {
		highSpeed,
		toggle
	} = props;
	return (
		<div className="high-speed">
			<div className="high-speed-label">只看高铁/动车</div>
			<div className={`high-speed-switch ${highSpeed ? 'switch-on' : ''}`} onClick={() => toggle()}>
				<div className="switch-node"/>
			</div>
		</div>
	)
}


export default HighSpeed;

HighSpeed.props = {
	highSpeed: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired
}
