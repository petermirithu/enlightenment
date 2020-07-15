var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require("../models").users;
const Profile = require("../models").profiles;
const multer = require('multer');

/* GET users listing. */
function isAuthenticated(req, res, next) {
    if (req.user){
      return next();      
    }
    else{
      req.session.redirectTo = req.originalUrl; 
      req.flash('success','Please Sign In if you have an Account'),            
      res.redirect('/users/signup');     
    }
  }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/profile')
  },
  filename: function (req, file, cb) {      
    cb(null, file.originalname)
  }
});

var upload = multer({storage: storage})

router.post('/update/profile/pic',isAuthenticated, upload.single('photo') , async(req, res) => {    
  try {
    return Profile
      .update(        
        { profile_pic: req.file.filename},        
        { where: { id: parseInt(req.user.id)} 
      })
      .then(
        req.flash('success','Profile picture has been updated'),        
        res.redirect('/profile'))

  } catch(error){
      res.status(400).send(error)                  
  }        
});

router.post('/profile',isAuthenticated, async(req, res) => {           
  try {
    return Profile
      .update({ firstname: req.body.fname,lastname: req.body.lname,status: req.body.status},
        { where: {userId: parseInt(req.user.id) } 
      })
      .then(
        req.flash('success','Your Profile has been updated'),        
        res.redirect('/profile'))

  } catch(error){    
    res.status(400).send(error)                  
  }
})

router.post('/register',async(req,res) => {
    const username = req.body.username;  
    const email = req.body.email;  
    const password = req.body.password;
    const password2 = req.body.password2;
  
    req.checkBody('username', 'Username is *required').notEmpty();  
    req.checkBody('email', 'Email is *required').notEmpty();
    req.checkBody('password', 'Password is *required').notEmpty();
    req.checkBody('password2', 'Confirm password is *required').notEmpty();
    req.checkBody('password2', 'Passwords do not *match. Try again!').equals(req.body.password);
  
    let errors = req.validationErrors();
    let foundx = await User.findOne({where: {username: username}})
    if(errors){    
      req.flash('error',errors[0].msg,)          
      res.redirect('/signup')                                          
    }else if(foundx){
      req.flash('error','That Username is taken.')          
      res.redirect('/signup')                                          
    }
    else{
      
      bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password, salt, function(err,hash){
          if(err){
            console.log(err);
          }               
          const hashedpwd=hash
          return User.create({ username:username, email:email, password:hashedpwd}).then(
            req.flash('success','You are now registered and can Log in for verification purpose.'),
            res.redirect('/')                                      
          );                          
        })
      })    
    }
  });
  
router.post('/login',function(req,res,next){  
    passport.authenticate('local', {
        successRedirect: req.session.redirectTo || '/',
        failureRedirect:'/',
        failureFlash:true,
    })(req,res,next);    
});

router.get('/logout',isAuthenticated,function(req,res){
    req.logOut();
    req.flash('success', ' Your Logged Out!');
    res.redirect('/')
})


module.exports = router;
