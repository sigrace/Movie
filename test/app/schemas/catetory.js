var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CatetorySchema = new Schema({
	name: String,
	movies :[{type: ObjectId, ref:"Movie"}],
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

CatetorySchema.pre('save',function (next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
});

CatetorySchema.statics = {
	fetch: function (cb){             //取出目前数据可里的所有数据
		return this
			.find({})          
			.sort('meta.updateAt')     //按更新时间排序
			.exec(cb);                //执行回调方法
	},
	findById: function (id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = CatetorySchema;












