import React from 'react';
import PropTypes from 'prop-types'
import './index.css'

function Submit (props) {
	const {
		onSubmit
	} = props;
	return (
		<div className="submit-btn" onClick={onSubmit}>搜索</div>
	)
}

Submit.props = {
	onSubmit: PropTypes.func.isRequired
}

export default React.memo(Submit);
