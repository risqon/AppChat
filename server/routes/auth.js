var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
//require('dotenv').config()
const secret = 'rubicamp'


/* GET users listing. */
router.get('/list', async (req, res) => {
  try {
    const result = await User.find({})
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ result });
  }
})

router.post('/register', async (req, res, next) => {
  let response = { data: {}, token: null, message: "" }
  const {email, username, password, retypepassword } = req.body
  if (password === retypepassword) {
    try {
      const usersDb = await User.findOne({ username })
      if (usersDb) {
        response.message = `Username already exists`
        return res.status(200).json(response)
      }
      const token = jwt.sign({ username, email}, secret)
      const newUser = new User({ email , username, password, token })
      await newUser.save()
      response.data =  {username, email }
      response.message = 'register success'
      response.token = token
      res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(response)
    }
  } else {
    response.message = "Username or password wrong!"
    res.status(200).json(response)
  }
});

router.post('/login', async (req, res, next) => {

  let response = { data: {}, token: null, message: "", }
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      response.message = 'Username or password wrong!'
      return res.status(200).json(response)
    }

    const check = await bcrypt.compare(password, user.password)

    if (check) {

      if (user.token) {
        response.data.username = username
        response.message = "login success"
        response.token = user.token
        res.status(201).json(response)
      } else {

        const newToken = jwt.sign({ username }, secret)
        const updateUser = await User.updateOne({ username: user.username }, { token: newToken })
        response.data.username = username
        response.message = "login success"
        response.token = newToken
        res.status(201).json(response)

        if (!updateUser) {
          response.message = "update token failed"
          return res.status(500).json(response)
        }

      }

    } else {
      response.message = 'Username or password wrong!'
      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error)
    response.message = "Username or password wrong"
    res.status(500).json(response)
  }

});

router.post('/check', async (req, res, next) => {

  const token = req.header("Authorization")

  console.log('ini', token)

  let response = {
    valid: false
  };

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(200).json(response)


    const user = await User.findOne({ email: decoded.email })
    if (!user) return res.status(200).json(response)

    response.valid = true
    res.status(200).json(response)

  } catch (error) {
    console.log(error);
    res.status(500).json(response)
  }

});

router.get('/destroy', async (req, res, next) => {
  const token = req.header("Authorization")

  let response = {
    logout: false
  };
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      if (!decoded) return res.status(500).json(response)

      const user = await User.findOneAndUpdate({ email: decoded.email }, { token: undefined })
      if (!user) return res.status(500).json(response)

      response.logout = true
      res.status(200).json(response)

    } catch (error) {
      console.log(error)
      res.status(200).json(response)
    }
  } else {
    res.status(500).json(response)
  }
});

module.exports = router;
