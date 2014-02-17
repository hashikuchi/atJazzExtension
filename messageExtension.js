$(function(){
	function sendToAllMembers(IDList){
		$.each(IDList, function(){
			sendMessage(this);
		});
		alert("送信完了しました！");
	}

	function sendMessage(recipientID){
		var title = $("[name='title']").val();
		var article = $("[name='article']").val();
		$.ajax({
			beforeSend: function(xhr){
				xhr.overrideMimeType("text/html;charset=Shift_JIS");
			},
			type: "POST",
			url: "message_send.html",
			data:"to_Menber_ID=" + recipientID
				+ "&title=" + EscapeSJIS(title)
				+ "&article=" + EscapeSJIS(article)
			,
			failure:function(){
				alert("送信に失敗しました。送信先:" + recipientID);
			},
		});
	}

	// Recipients ID Lists
	var IDList = new Array(
			// example
			"XXXXX",
			"YYYYY",
			"ZZZZZ"
		)

	var normalcss = {
		"border": "1px #1a5bb0 solid",
		"padding": "2px 30px",
		"margin-left": "20px",
		"color": "#fff",
		"background-color": "#206fd8",
		"font-size": "1.2em",
		"font-weight": "bold",
		"cursor": "pointer"
	}

	var hovercss = {
		"background-color": "#87c339",
		"border": "1px #72b023 solid"
	}

	var sendToAllMembersButton =
		$("<input>").attr({
			type: "button",
			value: "全員に送信する"
		}).css(normalcss).hover(function(){
			$(this).css(hovercss);
		},function(){
			$(this).css(normalcss);
		}).click(function(){
			sendToAllMembers(IDList);
		});

	$("[value='送信する']").after(sendToAllMembersButton);
})();