var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstname: {type:String, required:'{PATH} is required!'},
    lastname: {type:String, required:'{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        index: true,
        unique: true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String]
});


userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jcvaldes');
            User.create({
                firstname: 'Juan Carlos',
                lastname: 'Valdés',
                username: 'jcvaldes.ingenieria@gmail.com',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joaquin');
            User.create({
                firstname: 'Joaquín',
                lastname: 'Valdés',
                username: 'joaquin',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;