// 格式化时间
export function h0 (timestamp) {
	const target = new Date(timestamp || Date.now())
	target.setHours(0);
	target.setMinutes(0);
	target.setSeconds(0);
	target.setMilliseconds(0);
	return target.getTime()
}
