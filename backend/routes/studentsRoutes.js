const router = require("express").Router();
const roleMiddleware = require("../middlewares/roleMiddleWare");
const authMiddleware = require("../middlewares/authMiddleware");
const { getStudents, deleteStudent, searchStudents, getStudent, editStudent, addCompExam, removeCompExam, removeLesson, addLesson, deleteStudents } = require("../controllers/studentsController");







router.post('/get-students', roleMiddleware, authMiddleware, getStudents)

router.post('/search-students', roleMiddleware, authMiddleware, searchStudents)

router.delete('/delete-student/:uid', roleMiddleware, authMiddleware, deleteStudent)

router.delete('/delete-all-students', roleMiddleware, authMiddleware, deleteStudents)

router.get('/get-student/:id', roleMiddleware, authMiddleware, getStudent)

router.put('/edit-student', roleMiddleware, authMiddleware, editStudent)

router.put('/add-comp-exam', roleMiddleware, authMiddleware, addCompExam)

router.put('/remove-comp-exam', roleMiddleware, authMiddleware, removeCompExam)

router.put('/add-lesson', roleMiddleware, authMiddleware, addLesson)

router.put('/remove-lesson', roleMiddleware, authMiddleware, removeLesson)


module.exports = router
