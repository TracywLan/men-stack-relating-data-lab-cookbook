const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['dairy', 'produce', 'grains', 'canned', 'spice', 'other'],
  },
  quantity: {
    type: Number,
    default:1,
    min:0,
  },
  expiresAt: {
    type: Date,
  }
});


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]
});



const User = mongoose.model('User', userSchema);

module.exports = User;
