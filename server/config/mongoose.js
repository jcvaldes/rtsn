var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config)
{
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log(config.db + ' connected...');
    });

    //var messageSchema = mongoose.Schema({message: String});
    //var Message = mongoose.model('Message', messageSchema);
    //var mongoMessage;
    //Message.findOne().exec(function(err, messageDoc){
    //    mongoMessage = messageDoc.message;
    //});

    var userShema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        salt: String,
        hashed_pwd: String
    });

    userShema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userShema);

    User.find({}).exec(function(err, collection){
       if(collection.length === 0)
       {
           var salt, hash;
           salt = createSalt();
           hash = hashPwd(salt, 'jcvaldes');
           User.create({firstname: 'Juan Carlos', lastname: 'Valdés', username:'jcvaldes', salt:salt, hashed_pwd:hash});
           salt = createSalt();
           hash = hashPwd(salt, 'joaquin');
           User.create({firstname: 'Joaquín', lastname: 'Valdés', username:'joaquin', salt:salt, hashed_pwd:hash});
       }
    });
}

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd)
{
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}