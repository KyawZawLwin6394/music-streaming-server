'use strict';
const track = require('../controller/trackController');
const { multiUpload } = require('../lib/fileUploader');
const erHandler = require('../lib/util').catchError
module.exports = (app) => {
    app.route('/tracks')
        .get(erHandler(track.getTracks))

    app.route('/track')
        .post(multiUpload.single('track'), erHandler(track.uploadTrack))
        .get(erHandler( track.getTrack))
};


