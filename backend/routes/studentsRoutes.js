const router = require("express").Router();
const roleMiddleware = require("../middlewares/roleMiddleWare");
const authMiddleware = require("../middlewares/authMiddleware");
const { getStudents, deleteStudent, searchStudents } = require("../controllers/studentsController");







router.post('/get-students',roleMiddleware,authMiddleware,getStudents)

router.post('/search-students',roleMiddleware,authMiddleware,searchStudents)

router.delete('/delete-student/:uid',roleMiddleware,authMiddleware,deleteStudent)



module.exports = router
