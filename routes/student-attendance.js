const router = require('express').Router();
const { getAttendance, getAttendanceStatus } = require('../controller/student-attendance')


router.get('/:id', getAttendance);


router.get('/status', getAttendanceStatus);





module.exports = router;