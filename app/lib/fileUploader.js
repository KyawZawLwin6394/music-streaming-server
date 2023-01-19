const multer = require('multer');
const path = require('path');
const config = require('../../config/config');

  
const storage = multer.memoryStorage({
    destination: function(req, file, cb) {
        cb(null, config.attachmentUrl);
    },
  
    filename: function(req, file, cb) {
        const randomText=getRandomText()
        cb(null, randomText + Date.now() + file.fieldname +path.extname(file.originalname));
    }
});
  
const multiUpload = multer({ storage: storage });

module.exports = {
    multiUpload
  };

function getRandomText() {
var text = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

for (var i = 0; i < 3; i++)
  text += possible.charAt(Math.floor(Math.random() * possible.length));

return text;
}