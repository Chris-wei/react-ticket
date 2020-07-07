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
		const { highSpeed } = getState().state;
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
		const { currentSelectingLeftCity } = getState().state;

		if ( currentSelectingLeftCity ) {
			dispatch(setFrom(city))
		} else {
			dispatch(setTo(city))
		}

		dispatch(hideCitySelector())
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
		const { from, to } = getState().state;
		dispatch(setFrom(to))
		dispatch(setTo(from))
	}
}

export function fetchCityData () {
	return (dispatch, getState) => {
		const { isLoadingCityData } = getState().state;
		if ( isLoadingCityData ) return;

		const cache = JSON.parse(localStorage.getItem('city_data_cache')||'{}');

		if( Date.now() < cache.expires ){
			return dispatch(setCityData(cache.data))
		}

		dispatch(setIsLoadingCityData(true));

		fetch('/rest/cities?_' + Date.now())
			.then(res => res.json())
			.then(res => {
				const { cityData } = res;
				dispatch(setCityData(cityData))
				localStorage.setItem('city_data_cache', JSON.stringify({
					expires: Date.now() + 600 * 1000,
					data: cityData
				}))
				dispatch(setIsLoadingCityData(false));
			}).catch(() => {
			dispatch(setIsLoadingCityData(false));
		})
	}
}
