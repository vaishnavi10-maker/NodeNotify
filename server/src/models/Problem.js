const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  difficulty:{
    type:String,
    enum:["Easy","Medium","Hard"]
  },

  leetcodeLink:{
    type:String,
    required:true
  },

  completed:{
    type:Boolean,
    default:false
  },

  date:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Problem", problemSchema);
