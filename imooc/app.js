var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var multipart = require('connect-multiparty');
var fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc');


//models loading
var models_path = __dirname + '/app/models';
var walk = function (path){     //遍历目录
	fs
		.readdirSync(path)
		.forEach(function (file){
			var newPath = path +'/'+file;
			var stat = fs.statSync(newPath);
			if(stat.isFile()){
				if(/(.*)\.(js|coffee)/.test(file)){
					require(newPath);
				}
			}
			else if (stat.isDirectory()){
				walk(newPath)
			}
		})
}
walk(models_path);


app.set('views','./app/views/pages');
app.set('view engine','jade');

app.use(require('body-parser').urlencoded({extended: true}));
app.use(multipart());
app.use(cookieParser());
app.use(session({
	secret: 'iommc',
	store: new MongoStore({
		url: 'mongodb://localhost/imooc',
		collection:'sessions'
	})
}));
//开发环境
if("development" === app.get('env')){
	app.set('showStaticError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname,'public')));

require('./config/routes')(app);

app.listen(port);

console.log('app is listening on port ' + port);

