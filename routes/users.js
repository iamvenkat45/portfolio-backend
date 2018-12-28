var express = require("express");
const { ObjectId } = require("mongodb");
const Message = require("./../models/message");

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/", (req, res, next) => {
  console.log(req.body);
  const messageData = new Message({
    userName: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    messageDescription: req.body.message
  });
  saveMessageAndSendResponse(messageData, res);
});

router.get("/", (req, res, next) => {
  Message.find().then(
    messages => {
      res.status(200).send({ messages });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  if(!ObjectId.isValid(id)) {
    res.status(404).send({
      message: 'Invalid Id'
    });
  }

  Message.findById(id).then((message)=> {
    if(message) {
      res.status(200).send({message})
    }else{
      res.status(404).send({
        message: 'No Messages available'
      });
    }
  }, (err)=> {
    res.send(400).send(err);
  })
});

saveMessageAndSendResponse = (messageData, res) => {
  messageData.save().then(
    mess => {
      res.status(201).send({
        messsage: "Mail sent successfully"
      });
    },
    err => {
      res.status(400).send(err);
    }
  );
};

module.exports = router;
