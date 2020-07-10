const express = require('express');
const request = require('sync-request');
const cors = require('cors')
const app = express();
const port = 5000;

const Mock = require('./mock')

app.use(cors())

// 路由
app.get('/rest/cities', function (req, res) {
	res.status(200);
	res.json({
		err_code: 0,
		msg: 'success',
		cityData: Mock.CITY_DATA
	});
	res.end()
})

app.get('/rest/search', function (req, res) {
	const { key = '' } = req.query;

	const request_url = `https://touch.train.qunar.com/api/train/TrainStationSuggest?keyword=${key}&rtype=4`;

	const response = request('GET',request_url);

	const result = JSON.parse(response.getBody('utf-8'))

	if( result.status === 0 ){
		res.json({
			err_code: 0,
			data : result.dataMap.result,
			msg: 'success'
		})
	}else{
		res.json({
			err_code: 0,
			data : [],
			msg: 'success'
		})
	}
	res.end();
})

app.get('/rest/query', function (req, res) {
	const {from,to,date} = req.query;
	const request_url = `https://touch.train.qunar.com/api/train/trains2s?startStation=${from}&endStation=${to}&date=${date}&wakeup=1`;

	const response = request('GET',request_url);

	const result = JSON.parse(response.getBody('utf-8'))

	if( result.status === 0 ){
		res.json({
			err_code: 0,
			data : result.dataMap,
			msg: 'success'
		})
	}else{
		res.json({
			err_code: 0,
			data : {},
			msg: 'success'
		})
	}
	res.end();
})


app.listen(port, () => {
	console.log(`server is running at ${port}`)
})
