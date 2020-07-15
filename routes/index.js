var express = require('express');
var router = express.Router();
const User = require("../models").users;
const Profile = require("../models").profiles;

/* GET home page. */
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

router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact' });
});

router.get('/courses', function(req, res) {
  res.render('courses', { title: 'Courses' });
});

router.get('/primary_courses', function(req, res) {
  res.render('primary_courses', { title: 'Primary Courses' });
});

router.get('/secondary_courses', function(req, res) {
  res.render('secondary_courses', { title: 'Secondary Courses' });
});

router.get('/university_courses', function(req, res) {
  res.render('university_courses', { title: 'University Courses' });
});

router.get('/primary_class', function(req, res) {
  res.render('primary_class', { title: 'Primary Class' });
});

router.get('/secondary_class', function(req, res) {
  res.render('secondary_class', { title: 'Secondary Class' });
});

router.get('/university_class', function(req, res) {
  res.render('university_class', { title: 'University Class' });
});

router.get('/live_classes_1', function(req, res) {
  res.render('live_classes_1', { title: 'Live Classes Primary' });
});

router.get('/live_classes_2', function(req, res) {
  res.render('live_classes_2', { title: 'Live Classes Secondary' });
});

router.get('/live_classes_3', function(req, res) {
  res.render('live_classes_3', { title: 'Live Classes University' });
});

// sign up
router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Sign Up' });
});


router.get('/profile', async(req, res) => {
  let profile= await Profile.findOne({where: {userId: req.user.id}})
  res.render('profile', { title: 'Profile',profile:profile});
});

module.exports = router;
