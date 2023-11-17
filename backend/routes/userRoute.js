const router = require("express").Router();
const { login, createUser, checkLoggedIn, logout } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleWare");



router.post('/login',login)

router.post('/logout',authMiddleware,logout)

router.post('/check-logged-in',authMiddleware,checkLoggedIn)

router.post('/create-user',authMiddleware,roleMiddleware,createUser)


module.exports = router