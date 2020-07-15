import * as actionTypes from './types'

const defaultState = {
	departDate: Date.now(),
	arriveDate: Date.now(),
	departTimeStr: null,
	arriveTimeStr: null,
	departStation: '',
	arriveStation: '',
	trainNumber: '',
	durationStr: '',
	tickets: [],
	isScheduleVisible: false,
	searchParsed: false
}

export default (state = defaultState, action) => {
	switch ( action.type ) {
		case actionTypes.ACTION_SET_DEPART_DATE:
			return Object.assign({}, state, {
				departDate: action.payload
			});
		case actionTypes.ACTION_SET_ARRIVE_DATE:
			return Object.assign({}, state, {
				arriveDate: action.payload
			});
		case actionTypes.ACTION_SET_DEPART_TIME_STR:
			return Object.assign({}, state, {
				departTimeStr: action.payload
			});
		case actionTypes.ACTION_SET_ARRIVE_TIME_STR:
			return Object.assign({}, state, {
				arriveTimeStr: action.payload
			});
		case actionTypes.ACTION_SET_DEPART_STATION:
			return Object.assign({}, state, {
				departStation: action.payload
			});
		case actionTypes.ACTION_SET_ARRIVE_STATION:
			return Object.assign({}, state, {
				arriveStation: action.payload
			});
		case actionTypes.ACTION_SET_TRAIN_NUMBER:
			return Object.assign({}, state, {
				trainNumber: action.payload
			});
		case actionTypes.ACTION_SET_TICKETS:
			return Object.assign({}, state, {
				tickets: action.payload
			});
		case actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE:
			return Object.assign({}, state, {
				isScheduleVisible: action.payload
			});
		case actionTypes.ACTION_SET_SEARCH_PARSED:
			return Object.assign({}, state, {
				searchParsed: action.payload
			});
		default:
			return state;
	}
}
