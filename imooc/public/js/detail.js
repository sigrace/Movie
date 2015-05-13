$(function(){
	$(".comment").click(function (e){
		var target  = $(this);
		var toId = target.data('tid');          //comment来自于from的id标识符得值
		var commentId = target.data('cid');      //生产一个新的comment的id的值

		if($('#toId').length >0){
			$('#toId').val(toId);
		}
		else{
			$('<input>').attr({
				type:'hidden',
				id: 'toId',
				name:'comment[tid]',
				value:toId
			}).appendTo('#commentForm');
		}
		if($('#commentId').length >0){
			$('#commentId').val(commentId);
		}
		else{
			$('<input>').attr({
				type:'hidden',
				id: 'commentId',
				name:'comment[cid]',
				value:commentId
			}).appendTo('#commentForm');
		}
	})
});
