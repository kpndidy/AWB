var app = require('express').createServer()
		, io = require('socket.io').listen(app)
		, path = require('path')
		, fs = require('fs');

// ポート
app.listen(8080);

// indexを読み込み
app.get('/', function (req, res)
{
	res.sendfile(__dirname + '/index.html');
});

// CSSとJSを読み込む
app.get(/^\/(?:css|js)\/.+/, function(req, res)
{
	var contentType = undefined, filePath = __dirname + req.url;
	// req.url は絶対パスになってるので
	// __dirnameでファイルパスへ置き換える

	// ファイルタイプでcontentTypeを切り替え
	switch( path.extname(req.url) )
	{
		// extname(hoge)はURLの最後の.以降を返す
		// hoge.css => .css
		case '.css':
			contentType = 'text/css';
	    	break;
		case '.js':
			contentType = 'text/javascript';
			break;
		default:
			contentType = 'text/html';
	}

	// ファイルがあればほげほげ
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

// 番号
$cnt = 0;

io.sockets.on('connection', function (socket)
{
	// クライアントとの接続確認
	socket.emit('connect');

	socket.on('From_Client', function(data, data2)
	{
		$cnt++;
		var GetDate = new Date();
		var PopDate = GetDate.getYear() + "年" +
						GetDate.getMonth() + 1 + "月" +
						GetDate.getDate() + "日" +
						GetDate.getHours() + "時" +
						GetDate.getMinutes() + "分" +
						GetDate.getSeconds() + "秒";

		var msg = "<div id = \"No\">No'" + $cnt + "\/<strong>" + data2 + "</strong>\/" + ":" + PopDate + "<br>" + data + "</div>";
		
		socket.emit('From_Server', msg);
		socket.broadcast.emit('From_Server', msg);
	});

	socket.on('disconnect', function()
	{
		console.log('disconnect - client');
	});
});