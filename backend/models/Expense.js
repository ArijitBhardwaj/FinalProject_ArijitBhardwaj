
const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  category: String,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Expense', ExpenseSchema);