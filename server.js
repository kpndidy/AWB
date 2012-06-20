var app = require('express').createServer()
		, io = require('socket.io').listen(app)
		, path = require('path')
		, fs = require('fs');

// Port
app.listen();

// Read Index.html
app.get('/', function (req, res)
{
	res.sendfile(__dirname + '/index.html');
});

// Read CSS and JS file
app.get(/^\/(?:css|js)\/.+/, function(req, res)
{
	var contentType = undefined, filePath = __dirname + req.url;
	switch( path.extname(req.url) )
	{
		case '.css':
			contentType = 'text/css';
	    	break;
		case '.js':
			contentType = 'text/javascript';
			break;
		default:
			contentType = 'text/html';
	}

	path.exists(filePath, function(exists)
	{
		console.log(exists);
		if(exists)
		{
            fs.readFile(filePath, function(error, content)
			{
				if(error)
				{
					res.writeHead(500);
					res.end();
				} else {
					res.writeHead(200, {'Content-Type': contentType});
					res.end(content, 'utf-8');
				}
			});
		} else {
			res.writeHead(404);
			res.end();
		}
	});
});

// Number
$cnt = 0;

io.sockets.on('connection', function (socket)
{
	// Check Connection
	socket.emit('connect');

	socket.on('From_Client', function(data, data2)
	{
		$cnt++;
		var GetDate = new Date();
		var PopDate = GetDate.getYear() + "Y" +
						GetDate.getMonth() + 1 + "M" +
						GetDate.getDate() + "D" +
						GetDate.getHours() + "h" +
						GetDate.getMinutes() + "m" +
						GetDate.getSeconds() + "s";

		var msg = "<div id = \"No\">No'" + $cnt + "\/<strong>" + data2 + "</strong>\/" + ":" + PopDate + "<br>" + data + "</div>";
		
		socket.emit('From_Server', msg);
		socket.broadcast.emit('From_Server', msg);
	});

	socket.on('disconnect', function()
	{
		console.log('disconnect - client');
	});
});