var express = require('express');
var router = express.Router();

/* GET home page. */
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

module.exports = router;
