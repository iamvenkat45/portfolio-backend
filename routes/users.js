const express = require("express");
const { ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");

const Message = require("./../models/message");

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sandeepvenkat1989@gmail.com",
    pass: "Venkat69!"
  }
});

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
  if (!ObjectId.isValid(id)) {
    res.status(404).send({
      message: "Invalid Id"
    });
  }

  Message.findById(id).then(
    message => {
      if (message) {
        res.status(200).send({ message });
      } else {
        res.status(404).send({
          message: "No Messages available"
        });
      }
    },
    err => {
      res.send(400).send(err);
    }
  );
});

saveMessageAndSendResponse = (messageData, res) => {
  messageData.save().then(
    mess => {
      sendEmail(messageData);
      res.status(201).send({
        messsage: "Mail sent successfully"
      });
    },
    err => {
      res.status(400).send(err);
    }
  );
};

sendEmail = (message) => {
  const mailOptions = {
    from: "sandeepvenkat1989@gmail.com",
    to: "venkat.restart@icloud.com",
    subject: message.subject,
    html: `<div>
              <h3>Hello Venkat, I am ${message.userName}</h3>
              <h3>${message.messageDescription}</h3>
          </div>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("email error", err);
    } else {
      console.log(info);
    }
  });
};

module.exports = router;
