var database = require('../database');

//展会信息
var offerInfo = new database.Schema({
  cid:{
    type:Number,
    validate:/.+/
  },
  cname:{
    type:String,
    validate:/.+/
  },
  clientname:{
    type:String,
    validate:/.+/
  },
  name:{
    type:String,
    validate:/.+/
  },
  datetime:{
    type:Date,
    default: Date.now
  },
  place:{
    type:String,
    validate:/.+/
  },
  agent:{
    type:String
  },
  agentcell:{
    type:Number,
    validate:/.+/
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});
//展会住宿
var offerHotel = new database.Schema({
  date_start:{
    type:Date,
    default: Date.now
  },
  date_end:{
    type:Date,
    default: Date.now
  },
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
  },
  price:{
    type:Number
  },
  name:{
    type:String
  },
  room:{
    type:Number,
    validate:/.+/
  },
  days:{
    type:Number,
    validate:/.+/
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会用餐
var offerDinner = new database.Schema({
  date_start:{
    type:Date,
    default: Date.now
  },
  date_end:{
    type:Date,
    default: Date.now
  },
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
  },
  price:{
    type:Number
  },
  people:{
    type:Number,
    validate:/.+/
  },
  days:{
    type:Number,
    validate:/.+/
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会用车
var offerCar = new database.Schema({
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
  },
  price:{
    type:Number
  },
  people:{
    type:Number,
    validate:/.+/
  },
  days:{
    type:Number,
    validate:/.+/
  },
  usage:{
    type:Number,
    validate:/.+/
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//服务类型
var offerAreaService = new database.Schema({
  servicetype_id:{
    type:Number,
    validate:/.+/
  },
  servicetype_name:{
    type:String,
    validate:/.+/
  },
  price:{
    type:Number
  }
});
//展会会场
var offerArea = new database.Schema({
  date_start:{
    type:Date,
    default: Date.now
  },
  date_end:{
    type:Date,
    default: Date.now
  },
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
  },
  offerAreaService:[offerAreaService],
  price:{
    type:Number
  },
  people:{
    type:Number,
    validate:/.+/
  },
  days:{
    type:Number,
    validate:/.+/
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会物料
var offerOther = new database.Schema({
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
  },
  price:{
    type:Number
  },
  num:{
    type:Number
  },
  need:{
    type:Boolean
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会补充
var offerSth = new database.Schema({
  name:{
    type:String
  },
  people:{
    type:Number
  },
  price:{
    type:Number
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会陪同
var offerWith = new database.Schema({
  with_need:{
    type:Boolean,
    default:false
  },
  with_people:{
    type:Number
  },
  with_people_num:{
    type:Number
  },
  with_price:{
    type:Number
  },
  with_total:{
    type:Number
  },
  catch_need:{
    type:Boolean,
    default:false
  },
  catch_people:{
    type:Number
  },
  catch_people_num:{
    type:Number
  },
  catch_price:{
    type:Number
  },
  catch_total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会服务费
var offerFee = new database.Schema({
  percent:{
    type:Number,
    default:0
  },
  memo:{
    type:String
  },
  total:{
    type:Number
  },
  checked:{
    type:Number,
    default:0
  }
});
//展会发票
var offerInvoice = new database.Schema({
  need:{
    type:Boolean,
    default:false
  },
  type_id:{
    type:Number
  },
  type_name:{
    type:String
  },
  checked:{
    type:Number,
    default:0
  }
});
//汇总
var offer = new database.Schema({
  uid:{
    type:String,
    default:"zzzzz"
  },
  uname:{
    type:String,
    default:"unknow"
  },
  info:offerInfo,
  hotel:[offerHotel],
  hotel_all:{
    type:Number
  },
  hotel_memo:{
    type:String
  },
  dinner:[offerDinner],
  dinner_all:{
    type:Number
  },
  dinner_memo:{
    type:String
  },
  car:[offerCar],
  car_all:{
    type:Number
  },
  car_memo:{
    type:String
  },
  area:[offerArea],
  area_all:{
    type:Number
  },
  area_memo:{
    type:String
  },
  other:[offerOther],
  other_all:{
    type:Number
  },
  other_memo:{
    type:String
  },
  sth:[offerSth],
  sth_all:{
    type:Number
  },
  sth_memo:{
    type:String
  },
  with:offerWith,
  fee:offerFee,
  inv:offerInvoice,
  total:{
    type:Number,
    validate:/.+/,
    default:0
  },
  exhibit_id:{
    type:String,
    validate:/.+/
  },
  state:{
    type:Number,
    validate:/.+/,
    default:0
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

var offerSchema = {
  offer:offer
};

module.exports = offerSchema;