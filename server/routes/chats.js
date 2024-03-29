var express = require('express');
var router = express.Router();
const Chat = require('../models/Chat')
const helpers = require('../helpers/util')

/* GET users listing. */
router.get('/', helpers.verifyToken, function (req, res, next) {
  Chat.find().then((data) => {
    res.status(200).json(data)
  }).catch((err) => {
    res.status(500).json(err)
  })
});

router.post('/',helpers.verifyToken, function (req, res, next) {
  const {id, message, username } = req.body
  Chat.create({id, username, message}).then((data) => {
    res.status(201).json(data)
  }).catch(() => {
    res.status(500).json(err)
  })
});

// router.put('/:id',helpers.verifyToken, function (req, res, next) {
//   const { name, message } = req.body
//   const id = req.params.id
//   Chat.findOneAndUpdate({id}, {name, message},{new: true}).then((data) => {
//     res.status(201).json(data)
//   }).catch(() => {
//     res.status(500).json(err)
//   })
// });


router.delete('/:id',helpers.verifyToken, function(req, res, next) {
  Chat.findOneAndRemove({id:req.params.id}).then((data)=>{
    res.status(200).json(data)
  }).catch(()=>{
    res.status(500).json(err)
  })
});

module.exports = router;
