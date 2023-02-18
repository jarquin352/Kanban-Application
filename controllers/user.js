const User = require('../models/user.js');

const login = ((req, res, next) => {
  let loginName = req.body.username;
  let password_attempt = req.body.password;
  User.findOne({ user_name: loginName }, async(err, user) => {
    if (err || !user) {
      console.log("User with user_name:" + loginName + " not found.");
      res.status(400).send("Login name was not recognized");
      return;
    }
    const isPasswordCorrect = await user.comparePassword(password_attempt);
    if(!isPasswordCorrect){
      res.status(400).send("Wrong Password!");
      return;
    }
    
    req.session.regenerate(function (err) {
      if (err) next(err)

      // store user information in session, typically a user id
      req.session.user_id = user._id;
      req.session.user = user.first_name;
      req.session.cookie.originalMaxAge = 3600000; // 1 hr
      req.session.cookie.reSave = true;
      req.session.save(function (err) {
        if (err) return next(err)
        res.status(200).send('Success');
      })
    })
  });
})

const checkLogin = ((req, res, next) => {
  if (!req.session.user_id) {
      res.status(401).send('Please Login.');
      return;
  }
  res.status(200).send(req.session.user);
  next();
})

const logout = ((req, res, next) => {
  req.session.destroy(function(err) {
    if (err) {
      res.status(400).send("unable to logout");
      return;
    }
    res.status(200).send();
  });
});


const regist = ((req, res) => {
  let {
    user_name,
    password,
    first_name,
    last_name
  } = req.body;

  if (!user_name) {
    res.status(400).send("Please fill in the Username.");
    return;
  }
   if (!password) {
    console.log("password cannot be blank")
    res.status(400).send("Password cannot be blank.");
    return;
  } else {
    User.findOne({user_name}, function(err, user) {
      if (user) {
        res.status(400).send("Username is already taken.")
        return;
      }
      User.create({
        user_name, password, first_name, last_name
      }, function(err, newUser) {
        if (err) {
           res.status(400).send('Unable to register new user.');
           return;
        }
        req.session.user_id = newUser._id;
        req.session.user = first_name;
        res.status(200).send(first_name);
      })
    })

  }
});


module.exports = {
    login,
    logout,
    checkLogin,
    regist
};