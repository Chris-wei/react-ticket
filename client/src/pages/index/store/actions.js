import * as actionTypes from './types'

export function setFrom (from) {
	return {
		type: actionTypes.ACTION_SET_FROM,
		payload: from
	}
}

export function setTo (to) {
	return {
		type: actionTypes.ACTION_SET_TO,
		payload: to
	}
}

export function setDepartDate (date) {
	return {
		type: actionTypes.ACTION_SET_DEPART_DATE,
		payload: date
	}
}

export function setIsLoadingCityData (isLoadingCityData) {
	return {
		type: actionTypes.ACTION_SET_IS_LOADING_CITY_DATA,
		payload: isLoadingCityData
	}
}

export function setCityData (cityData) {
	return {
		type: actionTypes.ACTION_SET_CITY_DATA,
		payload: cityData
	}
}

export function toggleHighSpeed () {
	return (dispatch, getState) => {
		const { highSpeed } = getState();
		dispatch({
			type: actionTypes.ACTION_SET_HIGH_SPEED,
			payload: !highSpeed
		})
	}
}

export function showCitySelector (currentSelectingLeftCity) {
	return (dispatch) => {
		dispatch({
			type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
			payload: true
		})
		dispatch({
			type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
			payload: currentSelectingLeftCity
		})
	}
}


export function hideCitySelector () {
	return {
		type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
		payload: false
	}
}

export function setSelectedCity (city) {
	return (dispatch, getState) => {
		const { currentSelectingLeftCity } = getState();

		if ( currentSelectingLeftCity ) {
			dispatch(setFrom(city))
		} else {
			dispatch(setTo(city))
		}
	}
}

export function showDateSelector () {
	return {
		type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
		payload: true
	}
}

export function hideDateSelector () {
	return {
		type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
		payload: false
	}
}

export function exchangeFromTo () {
	return (dispatch, getState) => {
		const { from, to } = getState()
		dispatch(setFrom(to))
		dispatch(setTo(from))
	}
}
