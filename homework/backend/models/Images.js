const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Images = new Schema(
  {
    id: ObjectId,
    fieldname: String,
    filename: String,
    mimetype: String,
    originalname: String,
    size: Number,
    encoding: String,
    destination: String,
    path: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('images', Images);
