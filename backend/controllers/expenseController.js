const Expense = require('../models/Expense');

// Fetch all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses.' });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  const { name, amount, category, date, user } = req.body;
  const newExpense = new Expense({
    name,
    amount,
    category,
    date,
    user
  });
  try {
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expense.' });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Expense deleted.' });
    } else {
      res.status(404).json({ message: 'Expense not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Deleting expense failed.' });
  }
};
