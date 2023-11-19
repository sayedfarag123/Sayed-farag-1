const Group = require("../models/groupModel");


const addGroup = async (req, res) => {
    const data = req.body
    try {

        const group = await Group.create(data)

        return res.status(200).json({ error: false, group })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}


const getGroups = async (req, res) => {
    const { level } = req.params
    try {
        const groups = level != 'all' ? await Group.find({ level }) : await Group.find()

        return res.status(200).json({ error: false, groups })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}



const deleteGroups = async (req, res) => {
    const { id } = req.params
    try {
        await Group.findByIdAndDelete(id)

        return res.status(200).json({ error: false, id })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}






module.exports = {
    addGroup,
    getGroups,
    deleteGroups,

}