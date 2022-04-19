const User =require('../models/user');
const extend =  require('lodash/extend');
const errorHandler = require('../helpers/dbErrorHandler.js');


exports.create = async (req, res) => {
  
  try {
    let user1 = await User.findOne({
      "email": req.body.email
    })

    console.log(user1);
    if (user1)
      return res.status('403').json({
        error: "User already exists"
      })
    const user = new User(req.body)
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to req.
 */
exports.userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

exports.read = (req, res) => {
  req.profile.password = undefined
  return res.json(req.profile)
}

exports.list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

exports.update = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.profile._id, {
      $set:
            req.body,
            updated: Date.now()
        },
        {new: true, runValidators: true}
    )
    user.password = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

exports.remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.password = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

exports.isEducator = (req, res, next) => {
  const isEducator = req.profile && req.profile.educator
  if (!isEducator) {
    return res.status('403').json({
      error: "User is not an educator"
    })
  }
  next()
}

