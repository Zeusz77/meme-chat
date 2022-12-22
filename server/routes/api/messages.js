const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Jimp = require("jimp");
const fs = require("fs");
const stream = require("stream");
const path = require("path");

const Message = require("../../models/Message");
const Template = require("../../models/Template");
const { collection } = require("../../models/Template");

router.get("/test", (req, res) => {
  res.json({ msg: "test message" });
});

// A route to get all messages in given chatroom
router.get("/get", (req, res) => {
  Message.find({ chatId: req.params.chatId })
    .then((messages) => {
      // return all messages in order of creation from newest to oldest
      res.json(messages.reverse());
    })
    .catch((err) =>
      res.status(404).json({ nomessagesfound: "No messages found" })
    );
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMessage = new Message({
      template: req.body.template,
      text: req.body.text,
      chat: req.body.chat,
      user: req.user.handle,
      userAvatar: req.user.avatar,
      messageImage: "",
    });

    //console.log(newMessage);

    // Load the message template
    Template.findOne({ imageName: newMessage.template }).then((template) => {
      //console.log(template);
      // Load the image into Jimp
      const directoryPath = path.join(__dirname, "../../images");
      const imagePath = path.join(directoryPath, template.imageName);
      //console.log(imagePath);

      Jimp.read(imagePath).then((image) => {
        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
          const fields = template.fields.match(/\d+/g).reduce((acc, cur, idx) => {
            idx % 2 ? acc[acc.length - 1].push(cur) : acc.push([cur]);
            return acc;
          }, []);
          for(let i = 0; i < fields.length; i++) {
            //console.log(fields[i][0], fields[i][1], newMessage.text[i]);
            image.print(font, parseInt(fields[i][0]), parseInt(fields[i][1]), newMessage.text[i]);
          }
          const imageName = `${newMessage.user}-${newMessage.chat}-${newMessage.date.getTime()}.png`;
          image.write(`./messages/${
            imageName
          }`, (err) => {
            if (err) throw err;
            newMessage.messageImage = imageName;
            newMessage.save()
            .then((message) => res.json(message))
            .catch((err) => console.log(err));
          });
        });
      });
    });
  }
);

// Get a message by id
router.get(
  "/images/:messageName",
  (req, res) => {
    console.log(req.params.messageName);
    const directoryPath = path.join(__dirname, '../../messages');
    const imageName = req.params.messageName;
    const imagePath = path.join(directoryPath, imageName);
    const readStream = fs.createReadStream
    res.sendFile(imagePath);
  }
);

module.exports = router;
