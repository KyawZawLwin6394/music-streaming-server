'use strict';
const user = require('../controller/userController')
const erHandler = require('../lib/util').catchError
module.exports = (app) => {
    app.route('/users').get(erHandler(user.getUsers))

    app.route('/user')
        .post(erHandler(user.createUser))
        .put (erHandler(user.updateUser))
        .delete(erHandler(user.deleteUser))
        .get(erHandler(user.getUser))
};


