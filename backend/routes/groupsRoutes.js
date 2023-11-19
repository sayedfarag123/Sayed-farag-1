const { addGroup, getGroups, deleteGroups } = require("../controllers/groupsController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleWare");

const router = require("express").Router();



router.post('/add-group',roleMiddleware,authMiddleware,addGroup)


router.get('/get-groups/:level',roleMiddleware,authMiddleware,getGroups)


router.delete('/delete-group/:id',roleMiddleware,authMiddleware,deleteGroups)





module.exports = router
