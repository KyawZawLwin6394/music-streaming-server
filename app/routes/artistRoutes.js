'use strict';
const artist = require('../controller/artistController')
const erHandler = require('../lib/util').catchError
module.exports = (app) => {
    app.route('/artists').get(erHandler(artist.getUsers))

    app.route('/artist')
        .post(erHandler(artist.createUser))
        .put (erHandler(artist.updateUser))
        .delete(erHandler(artist.deleteUser))
        .get(erHandler(artist.getUser))
};


