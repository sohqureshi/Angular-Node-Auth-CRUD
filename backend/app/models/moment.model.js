const mongoose = require("mongoose");

const Moment = mongoose.model(
  "Moment",
  new mongoose.Schema({
    files: [],
    tags: [],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = Moment;
