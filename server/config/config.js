var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/conectan2',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://jcvaldes:JCVjr6059$!@ds031962.mongolab.com:31962/conectan2db',
        port: process.env.PORT || 80
    }

}