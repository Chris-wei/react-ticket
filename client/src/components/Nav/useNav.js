import {h0} from "../../utils/fp";
import {useCallback} from "react";

export default function useNav (departDate, dispatch, prevDate, nextDate) {
	const isPrevDisabled = h0(departDate) <= h0();
	const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;

	const prev = useCallback(() => {
		if ( isPrevDisabled ) return;
		dispatch(prevDate())
	}, [dispatch, prevDate, isPrevDisabled])

	const next = useCallback(() => {
		if ( isNextDisabled ) return;
		dispatch(nextDate())
	}, [dispatch, nextDate, isNextDisabled])

	return {
		isPrevDisabled,
		isNextDisabled,
		prev,
		next
	}
}
