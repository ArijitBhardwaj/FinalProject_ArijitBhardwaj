
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: String,
  password: String // In real applications, use bcrypt to hash passwords
});
module.exports = mongoose.model('User', UserSchema);


