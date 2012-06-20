$(function()
{
	var socket = io.connect("http://localhost");

	socket.on('connect', function()
	{
		$("p#first").html("<strong>Connect</strong>");
	});

	socket.on('From_Server', function (data)
	{
		$("#out").prepend(data);
		$("#MsgText").attr("value", "");
	});

	$("#SendButton").click(function()
	{
		if($("#MsgText").val() != "")
			socket.emit('From_Client', $("#MsgText").val(), $("#NameText").val());
	});
});