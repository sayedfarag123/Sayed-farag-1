const User = require("../models/userModel");





const getStudents = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const filter = req.body.group

        const query = filter ? { group: filter, role: 'طالب' } : { role: 'طالب' }


        const users = await User.find(query)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await User.countDocuments({ role: 'طالب' });

        return res.json({
            error: false,
            users,
            page,
            totalPages: Math.ceil(totalCount / limit),
            totalUsers: totalCount,
        });

    } catch (error) {

        console.error("Error in checkLoggedIn function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}
const searchStudents = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const searchQuery = req.body.query



        if (!searchQuery) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const query = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { phoneNumber: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        const users = await User.find(query)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await User.countDocuments({ role: 'طالب', ...query });

        return res.json({
            error: false,
            users,
            page,
            totalPages: Math.ceil(totalCount / limit),
            totalUsers: totalCount,
        });

    } catch (error) {

        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}
const deleteStudent = async (req, res) => {
    const id = req.params.uid
    try {

        await User.findByIdAndDelete(id)
        return res.status(200).json({ error: false, id })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}


module.exports = {
    getStudents,
    deleteStudent,
    searchStudents,
}