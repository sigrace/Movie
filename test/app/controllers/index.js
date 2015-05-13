var Movie = require('../models/movie');
var Catetory = require('../models/catetory');

exports.index = function (req,res){
	Catetory
		.find({})
		.populate({path:'movies', optinons: {limit:5}})
		.exec(function (err,catetories){
			if(err){
				console.log(err);
			}
			res.render('index',{
				title:'imooc 首页',
				catetories: catetories
			});
		})
};


exports.search = function (req,res){
	var catId = req.query.cat;
	var page = parseInt(req.query.p,10);
	var count = 2;
	var index = page * count;

	Catetory
		.find({_id: catId})
		.populate({
			path:'movies', 
			select: 'title poster'
		})
		.exec(function (err,catetories){
			if(err){
				console.log(err);
			}
			var catetory = catetories[0] || {};
			var movies = catetory.movies || [];
			var results = movies.slice(index,index + count);
			res.render('results',{
				title: 'imooc 结果列表页面',
				keyword: catetory.name,
				currentPage :(page + 1),
				query: 'cat=' + catId,
				totalPage : Math.ceil(movies.length / count),
				movies: results
			});
		})
};