'use strict';
var express, server, compression, bodyParser, path, html;

express = require('express');
compression = require('compression');
path = require('path');
bodyParser = require('body-parser');

html = require('./html');

server = express();

server.use(compression());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function cors(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

if(process.env.NODE_ENV === 'production') {
	server.use(
		'/public',
		express.static(path.resolve('../public')),
		{ maxAge: 7 * 24 * 3600000 }
	);
} else {
	server.use(
		'/public',
		express.static(path.resolve('../public'))
	);
}

server.use(html);

server.listen(process.env.PORT);

if(process.env.NODE_ENV === 'development') {
	console.log('Server is now listening on port %s', process.env.PORT);
}
