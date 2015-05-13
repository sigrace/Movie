var crypto = require('crypto');
var bcrypt = require('bcrypt');

function getRandomString (len){
	if(!len) {
		len =16
	}
	return crypto.randomBytes(Math.ceil(len /2)).toString('hex');
}

var should = require('should');
var app = require('../../app');
var mongoose = require('mongoose');
// var User = require('../../app/models/user');
var User = mongoose.model('User');

var user;
//test
describe('<Unit Test', function(){
	describe('Model User:', function(){
		before(function (done){            //测试开始之前
			user = {
				name: getRandomString(),
				password:'password'
			};
			done();
		});
		describe('Before Method save', function  () {      //在save调用之前         
			it('should begin without test user', function (done){     //it代表一个测试用例，某一类型功能点
				User.find({name: user.name}, function (err,users){
					users.should.have.length(0);       
					done();
				})
			})
		});
		describe('User save',function (){             
			it('should save without problems', function (done){    //确定保存的时候没有问题
				var _user = new User(user);
				_user.save(function (err){
					should.not.exist(err);
					_user.remove(function (err){
						should.not.exist(err);
						done();
					})
				})
			});
			it('should password be hashed correctly', function (done){    //确定生成密码时候没有问题
				var password = user.password;
				var _user = new User(user);

				_user.save(function (err){
					should.not.exist(err);
					_user.password.should.not.have.length(0);

					bcrypt.compare(password,_user.password,function (err,isMatch){
						should.not.exist(err);
						isMatch.should.equal(true);

						_user.remove(function (err){
							should.not.exist(err);
							done();
						})
					})
				})
			});
			it('should have default role 0', function (done){    //确定用户权限没有问题
				var _user = new User(user);

				_user.save(function (err){
					_user.role.should.equal(0);
					_user.remove(function (err){
						done();
					});
				})
			});
			it('should fail to save existing user', function (done){    //确定没有重名用户
				var _user1 = new User(user);
				_user1.save(function (err){
					should.not.exist(err);
					var _user2 = new User(user);
					_user2.save(function (err){
						should.exist(err);
						_user1.remove(function (err){
							if(!err){
								_user2.remove(function (err){
									done();
								});
							}
						});
					})
				});
			});
		})
	})
})