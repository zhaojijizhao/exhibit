var database = require('../database');

//用户信息
var user = new database.Schema({
  name:{
    type:String,
    validate:/.+/
  },
  cell:{
    type:Number,
    validate:/.+/
  },
  psw:{
    type:String,
    validate:/.+/
  },
  created_at:{
    type:Date,
    default: Date.now
  },
  receive:[String]
});
//需求商
var clienter = new database.Schema({
  name:{
    type:String
  },
  type:{
    type:String,
    default:"client"
  },
  cell:{
    type:Number,
    validate:/.+/
  },
  psw:{
    type:String
  },
  realname:{
    type:String,
  },
  gender:{
    type:Number,
  },
  mail:{
    type:String,
  },
  city:{
    type:Number,
  },
  company:{
    type:String,
  },
  state:{
    type:String
  },
  code:{
    type:Number
  },
  created_at:{
    type:Date,
    default: Date.now
  },
  receive:[String]
});
//供应商
var vendorer = new database.Schema({
  name:{
    type:String
  },
  cid:{
    type:String
  },
  type:{
    type:String,
    default:"vendor"
  },
  cell:{
    type:Number,
    validate:/.+/
  },
  psw:{
    type:String
  },
  realname:{
    type:String
  },
  gender:{
    type:Number
  },
  mail:{
    type:String
  },
  city:{
    type:Number
  },
  company:{
    type:String
  },
  state:{
    type:String
  },
  code:{
    type:Number
  },
  created_at:{
    type:Date,
    default: Date.now
  },
  receive:[String]
});

//申请信息
var applyer = new database.Schema({
  company:{
    type:String,
    validate:/.+/
  },
  address:{
    type:String,
    validate:/.+/
  },
  field:{
    type:String,
    validate:/.+/
  },
  name:{
    type:String,
    validate:/.+/
  },
  cell:{
    type:Number,
    validate:/.+/
  },
  type:{
    type:String,
    validate:/.+/
  },
  state:{
    type:Number,
    default: 0
  }
});

var userSchema = {
  user:user,
  clienter:clienter,
  vendorer:vendorer,
  applyer:applyer
};

module.exports = userSchema;