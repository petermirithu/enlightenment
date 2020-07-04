const LocalStrategy = require('passport-local').Strategy;
const User = require("../models").User;
const bcrypt = require('bcryptjs');

module.exports = function(passport){

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ where: { firstName: username } })
                 .then(function (user) {
                     if (!user) {
                         return done(null, false, { message: 'User with that first Name not found!' });
                     }
                    // match password
                    bcrypt.compare(password,user.password, function(err,isMatch){
                        if(err) throw err;
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false,{message:'Wrong password'});
                        }
                    });                     
                 })
                 .catch(err => done(err));
        }
    ));    
    
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}    