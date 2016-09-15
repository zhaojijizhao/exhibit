var database = require('./database');
var userSchema = require('./schema/user');
var otherSchema = require('./schema/other');
var exhibitSchema = require('./schema/exhibit');
var offerSchema = require('./schema/offer');

//state
//0已创建
//1已发送 可以修改
//2已确认 不可修改
//3已成交

//用户信息
var user = userSchema.user;
//需求商
var clienter = userSchema.clienter;
//供应商
var vendorer = userSchema.vendorer;

//申请信息
var applyer = userSchema.applyer;

//定制服务
var design = otherSchema.design;


//展会需求
var exhibit = exhibitSchema.exhibit;

//报价信息
var offer = offerSchema.offer;

var userModel = database.mongoose.model('user',user);
var clienterModel = database.mongoose.model('clienter',clienter);
var vendorerModel = database.mongoose.model('vendorer',vendorer);
var applyerModel = database.mongoose.model('applyer',applyer);
var designModel = database.mongoose.model('design',design);
var exhibitModel = database.mongoose.model('exhibit',exhibit);
var offerModel = database.mongoose.model('offer',offer);

var collection = {
	user:userModel,
	clienter:clienterModel,
	vendorer:vendorerModel,
	applyer:applyerModel,
	design:designModel,
	exhibit:exhibitModel,
	offer:offerModel
}

module.exports = collection;