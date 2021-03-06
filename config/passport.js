var models = require("../models");
var passport = require("passport");

module.exports = function(app) {
    // Pull in passport middleware to set up framework that it needs
    app.use(passport.initialize());
    app.use(passport.session());

    // Passport uses to place into the session
    passport.serializeUser(function(user, done) {
        console.log(`DONE DONE DONE SERIALIZE USER`);
        done(null, user);
    });
    // Passport uses to pull from session
    passport.deserializeUser(function(user, done) {
        models.User.findByPk(user.empID).then(function(user) {
          console.log(`DONE DONE DONE DEserialize USER`);
          done(null, user);
        }).catch(function(err) {
          done(err);
        });
    });

    require("./strategies/googleStrategy")();

    // require("./strategies/twitterStrategy")();
};
