const User = require("../models/userModel");





const getStudents = async (req, res) => {
    try {
        const pagee = parseInt(req.body.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (pagee - 1) * limit;

        const { page, ...filter } = req.body



        const query = filter ? { role: 'طالب', ...filter } : { role: 'طالب' };


        const users = await User.find(query)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await User.countDocuments(query);

        return res.json({
            error: false,
            users,
            page: pagee,
            totalPages: Math.ceil(totalCount / limit),
            totalUsers: totalCount,
        });

    } catch (error) {

        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}
const searchStudents = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
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

const getStudent = async (req, res) => {
    const { id } = req.params
    try {
        const student = await User.findById(id)

        return res.status(200).json({ error: false, student })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}

const addCompExam = async (req, res) => {
    const { exam, id } = req.body
    try {
        const student = await User.findByIdAndUpdate(id,
            { $push: { comprehensiveExams: exam } },
            { new: true },)



        return res.status(200).json({ error: false, student })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}


const removeCompExam = async (req, res) => {
    const { exam, id } = req.body
    try {

        const student = await User.findByIdAndUpdate(id,
            { $pull: { comprehensiveExams: exam } },
            { new: true },)



        return res.status(200).json({ error: false, student })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}


const editStudent = async (req, res) => {
    const data = req.body
    try {
        const student = await User.findByIdAndUpdate(data.id, data.data, { new: true })



        return res.status(200).json({ error: false, student })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })

    }
}

const addLesson = async (req, res) => {
    const { lesson, id } = req.body

    try {
        const student = await User.findByIdAndUpdate(id,
            { $push: { lessons: lesson } },
            { new: true },)


        return res.status(200).json({ error: false, student })


    } catch (error) {
        return res.status(400).json(error.message)

    }


}


const removeLesson = async (req, res) => {
    const { lesson, id } = req.body
    try {
        const student = await User.findByIdAndUpdate(id,
            { $pull: { lessons: lesson } },
            { new: true },)


        return res.status(200).json({ error: false, student })


    } catch (error) {
        return res.status(400).json(error.message)

    }


}



const deleteStudents = async (req, res) => {
    try {
        await User.deleteMany({ role: 'طالب' })


        return res.status(200).json({ error: false, message: 'done' })


    } catch (error) {
        return res.status(400).json(error.message)

    }


}


module.exports = {
    getStudents,
    deleteStudent,
    searchStudents,
    getStudent,
    editStudent,
    addCompExam,
    removeCompExam,
    removeLesson,
    addLesson,
    deleteStudents,

}