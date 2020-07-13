import React, {memo, useMemo, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import Slider from '../Slider'

function checkedReducer (state, action) {
	const { type, payload } = action;
	switch ( type ) {
		case 'toggle':
			const newState = { ...state }
			if ( payload in state ) {
				delete newState[payload]
			} else {
				newState[payload] = true
			}
			return newState;
		case 'reset':
			return {};
		default :
			return state;
	}
}

const Filter = memo(function (props) {
	const {
		name,
		checked,
		value,
		dispatch
	} = props;
	return (
		<li
			className={`option ${checked ? 'checked' : ''}`}
			onClick={() => dispatch({ type: 'toggle', payload: value })}
		>{name}</li>
	)
})

Filter.props = {
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

const Options = memo(function (props) {
	const {
		title,
		options,
		checkedMap,
		dispatch
	} = props;

	return (
		<div className="option-item">
			<div className="title">{title}</div>
			<ul className='option-ul'>
				{
					options.map(option =>
						<Filter
							key={option.value}
							{...option}
							checked={option.value in checkedMap}
							dispatch={dispatch}
						/>
					)
				}
			</ul>
		</div>
	)
})

Options.props = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	checkedMap: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}


const BottomModal = memo(function (props) {
	const {
		ticketTypes,
		trainTypes,
		departStations,
		arriveStations,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTimeEnd,
		toggleIsFiltersVisible,
		setCheckedTicketTypes,
		setCheckedTrainTypes,
		setCheckedDepartStations,
		setCheckedArriveStations,
		setDepartTimeStart,
		setDepartTimeEnd,
		setArriveTimeStart,
		setArriveTimeEnd
	} = props;

	const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(checkedReducer, checkedTicketTypes, (checkedTicketTypes) => ({
		...checkedTicketTypes
	}))

	const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(checkedReducer, checkedTrainTypes, (checkedTrainTypes) => ({
		...checkedTrainTypes
	}))

	const [localCheckedDepartStations, localCheckedDepartStationsDispatch] = useReducer(checkedReducer, checkedDepartStations, (checkedDepartStations) => ({
		...checkedDepartStations
	}))

	const [localCheckedArriveStations, localCheckedArriveStationsDispatch] = useReducer(checkedReducer, checkedArriveStations, (checkedArriveStations) => ({
		...checkedArriveStations
	}))

	const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart)
	const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd)
	const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart)
	const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd)

	const optionsGroup = [{
		title: '坐席类型',
		options: ticketTypes,
		checkedMap: localCheckedTicketTypes,
		dispatch: localCheckedTicketTypesDispatch
	}, {
		title: '车次类型',
		options: trainTypes,
		checkedMap: localCheckedTrainTypes,
		dispatch: localCheckedTrainTypesDispatch
	}, {
		title: '出发车站',
		options: departStations,
		checkedMap: localCheckedDepartStations,
		dispatch: localCheckedDepartStationsDispatch
	}, {
		title: '到达车站',
		options: arriveStations,
		checkedMap: localCheckedArriveStations,
		dispatch: localCheckedArriveStationsDispatch
	}]

	const isResetDisabled = useMemo(() => {
		return Object.keys(localCheckedTicketTypes).length === 0
			&& Object.keys(localCheckedTrainTypes).length === 0
			&& Object.keys(localCheckedDepartStations).length === 0
			&& Object.keys(localCheckedArriveStations).length === 0
			&& localDepartTimeStart === 0
			&& localDepartTimeEnd === 24
			&& localArriveTimeStart === 0
			&& localArriveTimeEnd === 24
	}, [localCheckedTicketTypes, localCheckedTrainTypes, localCheckedDepartStations,
		localCheckedArriveStations, localDepartTimeStart, localDepartTimeEnd,
		localArriveTimeStart, localArriveTimeEnd])

	const onReset = () => {
		if ( isResetDisabled ) return;

		localCheckedTicketTypesDispatch({ type: 'reset' })
		localCheckedTrainTypesDispatch({ type: 'reset' })
		localCheckedDepartStationsDispatch({ type: 'reset' })
		localCheckedArriveStationsDispatch({ type: 'reset' })
		setLocalDepartTimeStart(0)
		setLocalDepartTimeEnd(24)
		setLocalArriveTimeStart(0)
		setLocalArriveTimeEnd(24)
	}

	const onSure = () => {
		setCheckedTicketTypes(localCheckedTicketTypes)
		setCheckedTrainTypes(localCheckedTrainTypes)
		setCheckedDepartStations(localCheckedDepartStations)
		setCheckedArriveStations(localCheckedArriveStations)
		setDepartTimeStart(localDepartTimeStart)
		setDepartTimeEnd(localDepartTimeEnd)
		setArriveTimeStart(localArriveTimeStart)
		setArriveTimeEnd(localArriveTimeEnd)

		toggleIsFiltersVisible()
	}

	return (
		<div className="bottom-modal">
			<div className="bottom-dialog">
				<div className="bottom-dialog-content">
					<div className="bottom-header">
						<div className={`bottom-reset ${isResetDisabled ? 'disabled' : ''}`} onClick={onReset}>重置</div>
						<div className="bottom-confirm" onClick={onSure}>确定</div>
					</div>
					<div className="options">
						<>
							{
								optionsGroup.map(group =>
									<Options key={group.title} {...group} />
								)
							}
						</>
						<Slider
							title={'开始时间'}
							currentStartHours={localDepartTimeStart}
							currentEndHours={localDepartTimeEnd}
							onStartChanged={setLocalDepartTimeStart}
							onEndChanged={setLocalDepartTimeEnd}
						/>
						<Slider
							title={'到达时间'}
							currentStartHours={localArriveTimeStart}
							currentEndHours={localArriveTimeEnd}
							onStartChanged={setLocalArriveTimeStart}
							onEndChanged={setLocalArriveTimeEnd}
						/>
					</div>
				</div>
			</div>
		</div>
	)
})

export default BottomModal;

BottomModal.props = {
	ticketTypes: PropTypes.array.isRequired,
	trainTypes: PropTypes.array.isRequired,
	departStations: PropTypes.array.isRequired,
	arriveStations: PropTypes.array.isRequired,
	checkedTicketTypes: PropTypes.object.isRequired,
	checkedTrainTypes: PropTypes.object.isRequired,
	checkedDepartStations: PropTypes.object.isRequired,
	checkedArriveStations: PropTypes.object.isRequired,
	departTimeStart: PropTypes.number.isRequired,
	departTimeEnd: PropTypes.number.isRequired,
	arriveTimeStart: PropTypes.number.isRequired,
	arriveTimeEnd: PropTypes.number.isRequired,
	toggleIsFiltersVisible: PropTypes.func.isRequired,
	setCheckedTicketTypes: PropTypes.func.isRequired,
	setCheckedTrainTypes: PropTypes.func.isRequired,
	setCheckedDepartStations: PropTypes.func.isRequired,
	setCheckedArriveStations: PropTypes.func.isRequired,
	setDepartTimeStart: PropTypes.func.isRequired,
	setDepartTimeEnd: PropTypes.func.isRequired,
	setArriveTimeStart: PropTypes.func.isRequired,
	setArriveTimeEnd: PropTypes.func.isRequired
}
