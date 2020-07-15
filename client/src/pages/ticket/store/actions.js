import * as actionTypes from './types'
import {h0} from "../../../utils/fp";

export function setDepartDate (departDate) {
	return {
		type: actionTypes.ACTION_SET_DEPART_DATE,
		payload: departDate
	}
}

export function setArriveDate (arriveDate) {
	return {
		type: actionTypes.ACTION_SET_ARRIVE_DATE,
		payload: arriveDate
	}
}

export function setDepartTimeStr (departTimeStr) {
	return {
		type: actionTypes.ACTION_SET_DEPART_TIME_STR,
		payload: departTimeStr
	}
}

export function setArriveTimeStr (arriveTimeStr) {
	return {
		type: actionTypes.ACTION_SET_ARRIVE_TIME_STR,
		payload: arriveTimeStr
	}
}

export function setDepartStation (departStation) {
	return {
		type: actionTypes.ACTION_SET_DEPART_STATION,
		payload: departStation
	}
}

export function setArriveStation (arriveStation) {
	return {
		type: actionTypes.ACTION_SET_ARRIVE_STATION,
		payload: arriveStation
	}
}

export function setTrainNumber (trainNumber) {
	return {
		type: actionTypes.ACTION_SET_TRAIN_NUMBER,
		payload: trainNumber
	}
}

export function setDurationStr (durationStr) {
	return {
		type: actionTypes.ACTION_SET_DURATION_STR,
		payload: durationStr
	}
}

export function setTickets (tickets) {
	return {
		type: actionTypes.ACTION_SET_TICKETS,
		payload: tickets
	}
}

export function toggleIsScheduleVisible () {
	return (dispatch, getState) => {
		const { isScheduleVisible } = getState().state;
		dispatch({
			type: actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE,
			payload: !isScheduleVisible
		})
	}
}

export function setSearchParsed (searchParsed) {
	return {
		type: actionTypes.ACTION_SET_SEARCH_PARSED,
		payload: searchParsed
	}
}

export function nextDate () {
	return (dispatch, getState) => {
		const { departDate } = getState().state;
		dispatch(setDepartDate(h0(departDate) + 86400 * 1000))
	}
}

export function prevDate () {
	return (dispatch, getState) => {
		const { departDate } = getState().state;
		dispatch(setDepartDate(h0(departDate) - 86400 * 1000))
	}
}
