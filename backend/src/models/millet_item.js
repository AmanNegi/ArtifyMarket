const mongoose = require('mongoose')
const Joi = require('joi')
const JoiObjectId = require('joi-objectid')(Joi)
const { commentSchema } = require('./comment')

const milletItemSchema = new mongoose.Schema({
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  listedAt: {
    type: Date,
    default: () => {
      return new Date()
    }
  },
  comments: [commentSchema]
})

const MilletItem = mongoose.model('MilletItem', milletItemSchema)

function validateMilletItem(item) {
  const schema = Joi.object().keys({
    listedBy: JoiObjectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    comments: Joi.array(),
    price: Joi.number().required().min(0)
  })
  return schema.validate(item)
}

exports.MilletItem = MilletItem
exports.validateMilletItem = validateMilletItem
exports.milletItemSchema = milletItemSchema
