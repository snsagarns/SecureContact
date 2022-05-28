// const localStrategy = require("passport-local").Strategy;
// const { User } = require("../model/userModel");
// const bcrypt = require("bcryptjs");
// const passport = require("passport");
// module.exports = (passport) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(password, salt, function (err, hash) {
//       password = hash;
//     });
//   });
//   // Aunthentication
//   var email = "admin";
//   var password = "xxxxxxxxxx";
//   passport.use(
//     new localStrategy(
//       {
//         email: "email",
//         password: "password",
//       },
//       function (user, pwd, done) {
//         if (user != email) {
//           return done(null, false);
//         }

//         bcrypt.compare(pwd, password, function (err, loggedIn) {
//           if (err) return done(err);
//           if (!loggedIn) {
//             console.log("Wrong Password");
//           } else {
//             console.log("Successfully logged in!");
//           }
//           done(null, loggedIn);
//         });
//       }
//     )
//   );

//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
// };
