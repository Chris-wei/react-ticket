import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types'
import IconSearch from '../../images/icon-search.svg'
import IconClear from '../../images/icon-clear.svg'
import './index.css';

// 字母表
const alphabet = Array.from(new Array(26), (ele, index) => {
	return String.fromCharCode(65 + index)
})

const CitySelector = memo(function (props) {
	const {
		show,
		cityData,
		isLoading,
		fetchCityData,
		onBack,
		onSelect
	} = props;

	const [searchKey, setSearchKey] = useState('');
	const key = useMemo(() => searchKey.trim(), [searchKey])

	const onInputChange = (val) => {
		setSearchKey(val)
	}

	useEffect(() => {
		if ( !show || cityData || isLoading ) return;
		fetchCityData();
	}, [show, cityData, isLoading, fetchCityData])

	// 热门城市
	const HotCity = memo(function (props) {
		const {
			hotCities = [],
			onSelect
		} = props;

		return (
			<div className="hot-city-wrapper">
				<div className="city-title" data-cate='hot'>热门</div>
				<div className="hot-city-li">
					{
						hotCities.map(city =>
							<div className="hot-city-item"
								 key={city.name}
								 onClick={() => onSelect(city.name)}
							>
								{city.name}
							</div>
						)
					}
				</div>
			</div>
		)
	})

	HotCity.props = {
		hotCities: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	// 条目
	const CityItem = memo(function (props) {
		const {
			name,
			onSelect
		} = props;
		return (
			<li className='city-item' onClick={() => onSelect(name)}>{name}</li>
		)
	})

	CityItem.props = {
		name: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	// 城市集合
	const CitySelection = memo(function (props) {
		const {
			cities = [],
			title,
			onSelect
		} = props;
		return (
			<ul className='city-selection'>
				<li className='city-title' data-cate={title}>{title}</li>
				{
					cities.map(city =>
						<CityItem
							className={'city-item'}
							key={city.name}
							name={city.name}
							onSelect={onSelect}
						/>
					)
				}
			</ul>
		)
	})

	CitySelection.props = {
		cities: PropTypes.array.isRequired,
		title: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired
	}


	// 右侧字母
	const AlphaIndex = memo(function (props) {
		const {
			alpha,
			onClick,
		} = props
		return (
			<i className="city-index-item" onClick={() => onClick(alpha)}>{alpha}</i>
		)
	})

	AlphaIndex.props = {
		alpha: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired
	}

	// 城市列表
	const CityList = memo(function (props) {
		const {
			selections = [],
			onSelect,
			toAlpha
		} = props;

		return (
			<div className="city-list">
				<div className="city-data">
					{
						selections.map(selection =>
							<CitySelection
								key={selection.title}
								title={selection.title}
								cities={selection.cities}
								onSelect={onSelect}
							/>
						)
					}
				</div>
				<div className="city-index">
					<div className="city-index-item" onClick={() => toAlpha('hot')}>热门</div>
					{
						alphabet.map(alpha =>
							<AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha}/>)
					}
				</div>
			</div>
		)
	})

	CityList.props = {
		selections: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	const func = useDebounce((searchKey, cb) => {
		fetch('/rest/search?key=' + encodeURIComponent(searchKey))
			.then(res => res.json())
			.then(res => cb(res.data))
	}, 300)

	// 搜索
	const Suggest = memo(function (props) {
		const {
			searchKey,
			onSelect
		} = props;

		const [result, setResult] = useState([]);
		const fallBackResult = useMemo(() => {
			if ( !result.length ) return [{ key: searchKey, display: searchKey }];
			return result;
		}, [searchKey, result])

		useEffect(() => {
			if ( !searchKey ) return;
			func(searchKey, setResult)
		}, [searchKey])

		return (
			<div className="city-suggest">
				<ul className='suggest-ul'>
					{
						fallBackResult.map(item =>
							<SuggestItem
								key={item.key}
								name={item.key}
								onClick={onSelect}
							/>
						)
					}
				</ul>
			</div>
		)
	})

	Suggest.props = {
		searchKey: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired
	}

// 搜索建议
	const SuggestItem = memo(function (props) {
		const {
			name,
			onClick
		} = props;

		const onItemClick = (name) => {
			onClick(name);
			setSearchKey('');
		}
		return (
			<li className="suggest-item" onClick={() => onItemClick(name)}>{name}</li>
		)
	})

	SuggestItem.props = {
		name: PropTypes.array.isRequired,
		onClick: PropTypes.func.isRequired
	}

	const toAlpha = useCallback(alpha => {
		document.querySelector(`[data-cate="${alpha}"]`).scrollIntoView()
	}, [])

	const outputCitySections = () => {
		if ( isLoading ) {
			return <div className='loading'>loading</div>
		}
		if ( cityData ) {
			return (
				<>
					<HotCity
						hotCities={cityData.hotCities}
						toAlpha={toAlpha}
						onSelect={onSelect}
					/>
					<CityList
						selections={cityData.cityList}
						toAlpha={toAlpha}
						onSelect={onSelect}
					/>
				</>
			)
		}
		return null;
	}

	return (
		<div className={`city-selector ${show ? '' : 'hidden'}`}>
			<div className="city-search">
				<div className="search-back" onClick={() => onBack()}>
					<svg width={40} height={40}>
						<polyline
							points={"25,13 16,21 25,29"}
							stroke={'#fff'}
							strokeWidth={2}
							fill={'none'}
						/>
					</svg>
				</div>
				<div className="search-input-wrapper">
					<img className='icon-search' src={IconSearch} alt=""/>
					<input
						type="text"
						value={searchKey}
						className='search-input'
						placeholder={'城市、车站的中文或拼音'}
						onChange={e => onInputChange(e.target.value)}
					/>

					<img className={`icon-clear ${key.length === 0 ? 'hidden' : ''}`}
						 src={IconClear} alt=""
						 onClick={() => setSearchKey('')}
					/>
				</div>
			</div>
			{
				key.length > 0 && <Suggest searchKey={key} onSelect={key => onSelect(key)}/>
			}
			{outputCitySections()}
		</div>
	)
})

export default CitySelector;

CitySelector.props = {
	show: PropTypes.bool.isRequired,
	cityData: PropTypes.object,
	isLoading: PropTypes.bool.isRequired,
	onBack: PropTypes.func.isRequired,
	fetchCityData: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired
}

function useDebounce (fn, delay) {
	const { current } = useRef({ fn, timer: null });
	/* eslint-disable */
	useEffect(function () {
		current.fn = fn;
	}, [fn]);
	return useCallback(function f (...args) {
		if ( current.timer ) {
			clearTimeout(current.timer);
		}
		current.timer = setTimeout(() => {
			current.fn.call(this, ...args);
		}, delay);
	}, [])
}
