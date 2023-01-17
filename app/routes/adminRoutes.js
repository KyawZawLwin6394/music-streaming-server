'use strict';
const admin = require('../controller/adminController');
const erHandler = require('../lib/util').catchError
module.exports = (app) => {
    app.route('/admins').get(erHandler(admin.getAdmins))

    app.route('/admin')
        .post(admin.createAdmin)
        .put(erHandler(admin.updateAdmin))
        .delete(erHandler(admin.deleteAdmin))
        .get(erHandler(admin.getAdmin))

    app.route('/error')
        .get (admin.errorHandling)
};


