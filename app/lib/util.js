const bcrypt = require('bcrypt');
const config = require('../../config/config')

async function   bcryptHash (password) {
    const hashedPassword = await bcrypt.hash(password,config.saltRounds)
    return hashedPassword
}

async function bcryptCompare (plain,hash) {
    const result = await bcrypt.compare(plain,hash)
    return result
}

catchError = fn => {
    return function(req, res, next) {
      return fn(req, res, next).catch(next);
    };
  };
  

module.exports = {bcryptHash,bcryptCompare,catchError}
