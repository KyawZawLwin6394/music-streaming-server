const path = require('path'),
  rootPath = path.normalize(__dirname + '/..')

const config = {
    port:3001,
    mongooseSettings:{
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    saltRounds:10,
    db: '',
    root:rootPath,
    routes: "D:/work/2023/music-streaming-server/app/routes/*.js",
    attachmentUrl:'./uploads/music-streaming'
}
module.exports = config