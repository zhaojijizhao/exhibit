var database = require('../database');

var design = new database.Schema({
  user:{
    type:Object
  },
  cid:{
    type:Number,
    validate:/.+/
  },
  people:{
    type:String
  },
  date:{
    type:Date,
    default: Date.now
  },
  hotel:{
    type:String
  },
  price:{
    type:String
  },
  state:{
    type:Number,
    default: 0
  }
});

var otherSchema = {
  design:design
};

module.exports = otherSchema;