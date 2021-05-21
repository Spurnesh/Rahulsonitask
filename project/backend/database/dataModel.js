const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    serviceCenter: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    otherInfo: [[]],
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
