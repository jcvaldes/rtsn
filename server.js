var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

/*
app.use(function(req, res, next) {
    console.log(req.user);
    next();
});
*/

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);
console.log('Servidor corriendo en http://localhost:' + config.port + '\n Oprime CTRL + C para apagar el servidor');
