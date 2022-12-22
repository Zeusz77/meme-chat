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

async function loadFont() {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  return font;
}

async function writeText(image, font, field, text) {
  const x = parseInt(field[0]);
  const y = parseInt(field[1]);
  await image.print(font, x, y, {
    text: text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  });
}

async function loopFields(imagePath, font, fields, text) {
  let image = await Jimp.read(imagePath);

  for (let i = 0; i < fields.length; i++) {
    await writeText(image, font, fields[i], text[i]);
  }
  return image;
}

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

    // Load the message template
    Template.findOne({ imageName: newMessage.template }).then((template) => {
      // Load the image into Jimp
      const directoryPath = path.join(__dirname, "../../images");
      const imagePath = path.join(directoryPath, template.imageName);
      console.log(imagePath);

      loopFields(imagePath, loadFont(), template.fields, newMessage.text).then(
        (image) => {
          // save the image
          const imageName = `${newMessage.user}-${newMessage.chat}-${newMessage.date}`;
          image.write(`../models/${imageName}.png`, (err) => {
            if (err) throw err;
            newMessage.messageImage = imageName;
          });
      });
    });
  }
);

// Get a message by id
router.get(
  "/images/:messageId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.messageId)
      .then((message) => {
        const directoryPath = path.join(__dirname, "../../messages");
        const imagePath = path.join(directoryPath, message.messageImage);
        const readStream = fs.createReadStream;
        res.sendFile(imagePath);
      })
      .catch((err) =>
        res.status(404).json({ nomessagefound: "No message found" })
      );
  }
);

module.exports = router;
