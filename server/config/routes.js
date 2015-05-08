var auth = require('./auth');

module.exports = function(app) {
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params[0]);
    });

    //app.get('/partials/:partialPath', function(req, res){
    //    res.render('partials/' + req.params.partialPath);
    //});
    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {;
        res.render('index', {
            bootstrappedUser: req.user
        });
        //res.render('index', {
        //        mongoMessage: mongoMessage
        //    }
        //);
    });

}