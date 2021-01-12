const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  // content: String,
  content: Array,
  prompt: Array,
  password: Array,
});

module.exports = mongoose.model("Note", noteSchema);
