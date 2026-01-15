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
  unit: { 
    type: String,
    default: 'pcs',
  },
  expiresAt: {
    type: Date,
  }
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});



const User = mongoose.model('User', userSchema);

userSchema.pre('save', function (next) {
  const docToBeSaved = this
  if (docToBeSaved.username) {
    docToBeSaved.username = docToBeSaved.username[0].toUpperCase() + docToBeSaved.username.slice(1);
  }
  next();
});

module.exports = User;
