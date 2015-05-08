var express = require('express'),
    nib = require('nib'),
    bootstrap = require('bootstrap-styl'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport');

module.exports = function(app, config){
    function compile(str, path){
        return stylus(str)
            .set('filename', path)
            .set('compress', true)
            .use(nib())
            .use(bootstrap());
    }

    //Template Engine
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    //Middlewares
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(session({
        secret: 'conectan2 unicorns',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        //dest: path.join(__dirname, '/public'),
        compile: compile
    }))
    app.use(express.static(config.rootPath + '/public'));
}
