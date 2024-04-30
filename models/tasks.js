const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Name"],
    trim: true,
    maxlength: [20, "Number of characters should be not more than 20"],
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports= mongoose.model("Task", taskSchema)
