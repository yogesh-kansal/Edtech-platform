const express = require('express');
const enrollmentCtrl = require('../controllers/enrollmentController');
const courseCtrl = require('../controllers/courseController');
const authCtrl = require('../controllers/authController');

const router = express.Router()

router.route('/enrolled')
  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

router.route('/new/:courseId')
  .post(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create)  

router.route('/stats/:courseId')
  .get(enrollmentCtrl.enrollmentStats)

router.route('/complete/:enrollmentId')
  .put(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete) 

router.route('/:enrollmentId')
  .get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
  .delete(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.remove)

router.param('courseId', courseCtrl.courseByID)
router.param('enrollmentId', enrollmentCtrl.enrollmentByID)

module.exports = router;
