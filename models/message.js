const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true, default: 'hello' },
  messageDescription: { type: String, required: true, trim: true }
}, {
    versionKey: false
});

module.exports = mongoose.model("Message", messageSchema);
