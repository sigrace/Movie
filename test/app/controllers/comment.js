var Comment = require('../models/comment');

//comment
exports.save = function (req,res){
	var _comment = req.body.comment;
	var movieId = _comment.movie;
	if(_comment.cid){             //检查是否有comment.cid,点击头像才会产生
		Comment.findById(_comment.cid,function (err,comment){
			var reply = {             //具体回复的内容
				from: _comment.from,
				to:_comment.tid,
				content:_comment.content
			};
			comment.reply.push(reply);
			comment.save(function (err,comment){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/' + movieId);
			})
		})
	}
	else{
		var comment = new Comment(_comment);
		comment.save(function (err,movie){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/' + movieId);
		})
	}
};




