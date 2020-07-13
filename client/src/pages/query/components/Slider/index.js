import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import './index.css'
import leftPad from 'left-pad'
import useWinSize from '../../../../utils/useWinSize';

const Slider = memo(function (props) {
	const {
		title,
		currentStartHours,
		currentEndHours,
		onStartChanged,
		onEndChanged
	} = props;

	const winSize = useWinSize();

	const startHandler = useRef();
	const endHandler = useRef();

	const lastStartX = useRef();
	const lastEndX = useRef();

	const range = useRef();
	const rangeWidth = useRef();

	const prevCurrentStartHours = useRef(currentStartHours)
	const prevCurrentEndHours = useRef(currentEndHours)

	const [start, setStart] = useState(() => currentStartHours / 24 * 100)
	const [end, setEnd] = useState(() => currentEndHours / 24 * 100)

	if( prevCurrentStartHours.current !== currentStartHours ){
		setStart(currentStartHours / 24 * 100)
		prevCurrentStartHours.current = currentStartHours;
	}

	if( prevCurrentEndHours.current !== currentEndHours ){
		setEnd(currentEndHours / 24 * 100)
		prevCurrentEndHours.current = currentEndHours;
	}

	const startPercent = useMemo(() => {
		if ( start > 100 ) return 100;
		if ( start < 0 ) return 0;
		return start
	}, [start])

	const endPercent = useMemo(() => {
		if ( end > 100 ) return 100;
		if ( end < 0 ) return 0;
		return end
	}, [end])

	const startHours = useMemo(() => {
		return Math.round(startPercent * 24 / 100);
	}, [startPercent])

	const endHours = useMemo(() => {
		return Math.round(endPercent * 24 / 100);
	}, [endPercent])

	const startText = useMemo(() => {
		return leftPad(startHours, 2, '0') + ':00'
	}, [startHours])

	const endText = useMemo(() => {
		return leftPad(endHours, 2, '0') + ':00'
	}, [endHours])

	const onStartTouchBegin = (e) => {
		const touch = e.targetTouches[0];
		lastStartX.current = touch.pageX;
	}

	const onStartTouchMove = (e) => {
		const touch = e.targetTouches[0];
		const distance = touch.pageX - lastStartX.current;
		lastStartX.current = touch.pageX;

		setStart(start => start + (distance / rangeWidth.current) * 100)
	}

	const onEndTouchBegin = (e) => {
		const touch = e.targetTouches[0];
		lastEndX.current = touch.pageX;
	}

	const onEndTouchMove = (e) => {
		const touch = e.targetTouches[0];
		const distance = touch.pageX - lastEndX.current;
		lastEndX.current = touch.pageX;

		setEnd(end => end + (distance / rangeWidth.current) * 100)
	}

	useEffect(() => {
		rangeWidth.current = parseFloat(
			window.getComputedStyle(range.current).width
		)
	}, [winSize.width])

	useEffect(() => {
		startHandler.current.addEventListener('touchstart', onStartTouchBegin, false);
		startHandler.current.addEventListener('touchmove', onStartTouchMove, false)
		endHandler.current.addEventListener('touchstart', onEndTouchBegin, false);
		endHandler.current.addEventListener('touchmove', onEndTouchMove, false)
		return () => {
			/*eslint-disable*/
			startHandler.current.removeEventListener('touchstart', onStartTouchBegin, false);
			startHandler.current.removeEventListener('touchmove', onStartTouchMove, false)
			endHandler.current.removeEventListener('touchstart', onEndTouchBegin, false);
			endHandler.current.removeEventListener('touchmove', onEndTouchMove, false)
		}
	})

	useEffect(() => {
		onStartChanged(startHours)
	}, [startHours])

	useEffect(() => {
		onEndChanged(endHours)
	}, [endHours])

	return (
		<div className="option-item">
			<div className="title">{title}</div>
			<div className='ranger-slider'>
				<div className="slider" ref={range}>
					<div className="slider-range" style={{
						left: startPercent + '%',
						width: endPercent - startPercent + '%'
					}}/>

					<div ref={startHandler} className="slider-handle" style={{
						left: startPercent + '%'
					}}>
						<span className="slider-text">{startText}</span>
					</div>

					<div ref={endHandler} className="slider-handle" style={{
						left: endPercent + '%'
					}}>
						<span className="slider-text">{endText}</span>
					</div>
				</div>
			</div>
		</div>
	)
})

export default Slider

Slider.props = {
	title: PropTypes.string.isRequired,
	currentStartHours: PropTypes.number.isRequired,
	currentEndHours: PropTypes.number.isRequired,
	onStartChanged: PropTypes.func.isRequired,
	onEndChanged: PropTypes.func.isRequired
}
