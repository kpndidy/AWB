$(function()
{
	var socket = io.connect("http://localhost");

	socket.on('connect', function()
	{
		$("p#first").html("<strong>Connect</strong>");
	});

	socket.on('From_Server', function (data)
	{
		//alert("Receve Succes");
		//$("#out").append(data);
		$("#out").prepend(data);
		$("#MsgText").attr("value", "");
	});

	// 送信ボタン。サーバーにメッセージを送る
	$("#SendButton").click(function()
	{
		if($("#MsgText").val() != "")
		{
			socket.emit('From_Client', $("#MsgText").val(), $("#NameText").val());
			//alert("Send succes");
		}
	});
});