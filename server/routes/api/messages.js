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

// Send a message to a chatroom
/*router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMessage = new Message({
      template: req.body.template,
      text: req.body.text,
      chat: req.body.chat,
      user: req.user.handle,
      userAvatar: req.user.avatar,
      messageImage: '',
    });

    // Load the message template
    Template.findOne({ imageName: newMessage.template })
      .then((template) => {
        // Load the image into Jimp
        const directoryPath = path.join(__dirname, "../../images");
        const imagePath = path.join(directoryPath, template.imageName);
        Jimp.read(imagePath, (err, image) => {
          if (err) throw err;
          // write the text to the image
          const fields = template.fields.match(/\d+/g).reduce((acc, cur, idx) => {
            idx % 2 ? acc[acc.length - 1].push(cur) : acc.push([cur]);
            return acc;
          }, []);
          fields.forEach((field, i) => {
            image.print(
              Jimp.loadFont(Jimp.FONT_SANS_32_BLACK),
              field[0],
              field[1],
              newMessage.text[i]
            );
          });

          // save the image
          const imageName = `${newMessage.user}-${newMessage.chat}-${newMessage.date}`;
          image.write(`../models/${imageName}.png`, (err) => {
            if (err) throw err;
            newMessage.messageImage = imageName;
          });
        });

    // save the message
    newMessage
      .save()
      .then((message) => res.json(message))
      .catch((err) => console.log(err));
  }
);*/

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
      Jimp.read(imagePath, (err, image) => {
        console.log(image);
        if (err) throw err;
        // write the text to the image
        const fields = template.fields.match(/\d+/g).reduce((acc, cur, idx) => {
          idx % 2 ? acc[acc.length - 1].push(cur) : acc.push([cur]);
          return acc;
        }, []);

        
        console.log(fields);
        console.log(newMessage.text);
        fields.forEach((field, i) => {
          console.log(field);
          console.log(newMessage.text[i]);
          const font = loadFont();
          writeText(image, font, field, newMessage.text[i]);
        });

        // save the image
        const imageName = `${newMessage.user}-${newMessage.chat}-${newMessage.date}`;
        image.writeAsync(`../models/${imageName}.png`, (err) => {
          if (err) throw err;
        });
        newMessage.messageImage = imageName;
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
