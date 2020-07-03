const express = require('express');

const app = express();
const port = 5000;

// 路由
app.get('/rest', function (req, res) {
	res.status(200);
	res.json({ code: 1, msg: 'hello world' });
	res.end()
})

app.listen(port, () => {
	console.log(`server is running at ${port}`)
})
