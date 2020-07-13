import * as actionTypes from './types'
import {h0} from "../../../utils/fp";
import {ORDER_DEPART} from "./constants";

const defaultState = {
	from: '',
	to: '',
	departDate: h0(Date.now()),
	highSpeed: false,
	//列表
	trainList: [],
	orderType: ORDER_DEPART,
	onlyTickets: false,
	// 坐席类型
	ticketTypes: [],
	checkedTicketTypes: {},
	// 车次类型
	trainTypes: [],
	checkedTrainTypes: {},
	// 出发车站
	departStations: [],
	checkedDepartStations: {},
	// 到达车站
	arriveStations: [],
	checkedArriveStations: {},
	// 出发时间
	departTimeStart: 0,
	departTimeEnd: 24,
	// 到达时间
	arriveTimeStart: 0,
	arriveTimeEnd: 24,
	// 浮层
	isFiltersVisible: false,
	//
	searchParsed: false
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
		case actionTypes.ACTION_SET_HIGH_SPEED:
			const newCheckedTrainTypes = {}
			if ( action.payload ) {
				newCheckedTrainTypes[1] = true;
				newCheckedTrainTypes[5] = true;
			}
			return Object.assign({}, state, {
				highSpeed: action.payload,
				checkedTrainTypes: newCheckedTrainTypes
			})
		case actionTypes.ACTION_SET_TRAIN_LIST:
			return Object.assign({}, state, {
				trainList: action.payload
			})
		case actionTypes.ACTION_SET_ORDER_TYPE:
			return Object.assign({}, state, {
				orderType: action.payload
			})
		case actionTypes.ACTION_SET_ONLY_TICKETS:
			return Object.assign({}, state, {
				onlyTickets: action.payload
			})
		case actionTypes.ACTION_SET_TICKET_TYPES:
			return Object.assign({}, state, {
				ticketTypes: action.payload
			})
		case actionTypes.ACTION_SET_CHECKED_TICKET_TYPES:
			return Object.assign({}, state, {
				checkedTicketTypes: action.payload
			})
		case actionTypes.ACTION_SET_TRAIN_TYPES:
			return Object.assign({}, state, {
				trainTypes: action.payload
			})
		case actionTypes.ACTION_SET_CHECKED_TRAIN_TYPES:
			let highSpeed = false;

			if ( action.payload[1] && action.payload[5] ) highSpeed = true;

			return Object.assign({}, state, {
				checkedTrainTypes: action.payload,
				highSpeed
			})
		case actionTypes.ACTION_SET_DEPART_STATIONS:
			return Object.assign({}, state, {
				departStations: action.payload
			})
		case actionTypes.ACTION_SET_CHECKED_DEPART_STATIONS:
			return Object.assign({}, state, {
				checkedDepartStations: action.payload
			})
		case actionTypes.ACTION_SET_ARRIVE_STATIONS:
			return Object.assign({}, state, {
				arriveStations: action.payload
			})
		case actionTypes.ACTION_SET_CHECKED_ARRIVE_STATIONS:
			return Object.assign({}, state, {
				checkedArriveStations: action.payload
			})
		case actionTypes.ACTION_SET_DEPART_TIME_START:
			return Object.assign({}, state, {
				departTimeStart: action.payload
			})
		case actionTypes.ACTION_SET_DEPART_TIME_END:
			return Object.assign({}, state, {
				departTimeEnd: action.payload
			})
		case actionTypes.ACTION_SET_ARRIVE_TIME_START:
			return Object.assign({}, state, {
				arriveTimeStart: action.payload
			})
		case actionTypes.ACTION_SET_ARRIVE_TIME_END:
			return Object.assign({}, state, {
				arriveTimeEnd: action.payload
			})
		case actionTypes.ACTION_SET_IS_FILTERS_VISIBLE:
			return Object.assign({}, state, {
				isFiltersVisible: action.payload
			})
		case actionTypes.ACTION_SET_SEARCH_PARSED:
			return Object.assign({}, state, {
				searchParsed: action.payload
			})
		default:
			return state;
	}
}
