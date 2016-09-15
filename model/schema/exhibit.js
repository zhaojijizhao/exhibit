var database = require('../database');

//展会信息
var exhibitInfo = new database.Schema({
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
var exhibitHotel = new database.Schema({
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
  }
});
//展会用餐
var exhibitDinner = new database.Schema({
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
  people:{
    type:Number,
    validate:/.+/
  },
  days:{
    type:Number,
    validate:/.+/
  }
});
//展会用车
var exhibitCar = new database.Schema({
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
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
  }
});
//会场服务
var exhibitAreaService = new database.Schema({
  servicetype_id:{
    type:Number,
    validate:/.+/
  },
  servicetype_name:{
    type:String,
    validate:/.+/
  }
});
//展会会场
var exhibitArea = new database.Schema({
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
  exhibitAreaService:[exhibitAreaService],
  people:{
    type:Number,
    validate:/.+/
  },
  days:{
    type:Number,
    validate:/.+/
  }
});
//展会物料
var exhibitOther = new database.Schema({
  type_id:{
    type:Number,
    validate:/.+/
  },
  type_name:{
    type:String,
    validate:/.+/
  },
  need:{
    type:Boolean
  },
  num:{
    type:Number
  }
});
//展会补充
var exhibitSth = new database.Schema({
  name:{
    type:String
  },
  people:{
    type:Number
  }
});
//展会陪同
var exhibitWith = new database.Schema({
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
  catch_need:{
    type:Boolean,
    default:false
  },
  catch_people:{
    type:Number
  },
  catch_people_num:{
    type:Number
  }
});
//展会发票
var exhibitInvoice = new database.Schema({
  need:{
    type:Boolean,
    default:false
  },
  type_id:{
    type:Number
  },
  type_name:{
    type:String
  }
});
//汇总
var exhibit = new database.Schema({
  uid:{
    type:String,
    default:"zzzz"
  },
  info:exhibitInfo,
  hotel:[exhibitHotel],
  hotel_memo:{
    type:String
  },
  dinner:[exhibitDinner],
  dinner_memo:{
    type:String
  },
  car:[exhibitCar],
  car_memo:{
    type:String
  },
  area:[exhibitArea],
  area_memo:{
    type:String
  },
  other:[exhibitOther],
  other_memo:{
    type:String
  },
  sth:[exhibitSth],
  sth_memo:{
    type:String
  },
  with:exhibitWith,
  inv:exhibitInvoice,
  offer_id:{
    type:String
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


var exhibitSchema = {
  exhibit:exhibit
};

module.exports = exhibitSchema;