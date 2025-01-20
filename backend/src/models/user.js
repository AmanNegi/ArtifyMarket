const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  userType: {
    type: String,
    enum: ['admin', 'customer', 'farmer'],
    default: 'customer'
  },
  createdAt: {
    type: Date,
    default: () => {
      return new Date()
    }
  },
  images: {
    type: [String],
    default: []
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    userType: Joi.string().valid('admin', 'customer', 'farmer').default('customer'),
    phone: Joi.string().required(),
    location: Joi.object()
      .keys({
        type: Joi.string().valid('Point').default('Point'),
        coordinates: Joi.array().items(Joi.number()).required()
      })
      .required()
  })
  return schema.validate(user)
}

function validateLogin(req) {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  return schema.validate(req)
}

function validateSignUp(req) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    userType: Joi.string().valid('admin', 'customer', 'farmer').required().default('customer'),
    location: Joi.object()
      .keys({
        type: Joi.string().valid('Point').default('Point'),
        coordinates: Joi.array().items(Joi.number()).required()
      })
      .required()
  })
  return schema.validate(req)
}

function validateGLogin(req) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email()
  })

  return schema.validate(req)
}

exports.User = User
exports.validate = validateUser
exports.validateLogin = validateLogin
exports.validateSignUp = validateSignUp
exports.validateGLogin = validateGLogin
