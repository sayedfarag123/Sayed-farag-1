const router = require("express").Router();
const { getAnalytics } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleWare");





router.get('/get-analytics',roleMiddleware,authMiddleware,getAnalytics)







module.exports = router