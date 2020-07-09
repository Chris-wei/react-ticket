import * as actionTypes from './types'

const defaultState = {
	from: '北京',
	to: '上海',
	//出发日期
	departDate: Date.now(),
	// 城市选择
	isCitySelectorVisible: false,
	currentSelectingLeftCity: false,
	cityData: null,
	isLoadingCityData: false,
	// 日期选择
	isDateSelectorVisible: false,
	highSpeed: false
}

export default (state = defaultState, action) => {
	switch ( action.type ) {
		case actionTypes.ACTION_SET_FROM:
			return Object.assign({}, state, {
				from: action.payload
			})
		case actionTypes.ACTION_SET_TO:
			return Object.assign({}, state, {
				to: action.payload
			})
		case actionTypes.ACTION_SET_DEPART_DATE:
			return Object.assign({}, state, {
				departDate: action.payload
			})
		case actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
			return Object.assign({}, state, {
				isCitySelectorVisible: action.payload
			})
		case actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
			return Object.assign({}, state, {
				currentSelectingLeftCity: action.payload
			})
		case actionTypes.ACTION_SET_CITY_DATA:
			return Object.assign({}, state, {
				cityData: action.payload
			})
		case actionTypes.ACTION_SET_IS_LOADING_CITY_DATA:
			return Object.assign({}, state, {
				isLoadingCityData: action.payload
			})
		case actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
			return Object.assign({}, state, {
				isDateSelectorVisible: action.payload
			})
		case actionTypes.ACTION_SET_HIGH_SPEED:
			return Object.assign({}, state, {
				highSpeed: action.payload
			})
		default:
			return state;
	}
}
