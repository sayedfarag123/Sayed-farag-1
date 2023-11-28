const moment = require("moment/moment");
const User = require("../models/userModel");
const Group = require("../models/groupModel");


const getAnalytics = async (req, res) => {
    try {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const timeZone = 'Africa/Cairo';

        // Use Promise.all to execute multiple queries concurrently
        const [groupedUsersByDay, getAllStudentsCount, l1StudentsCount, l2StudentsCount, l3StudentsCount, allGroups] = await Promise.all([
            User.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate },
                        role:'طالب'
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: timeZone } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]),
            User.countDocuments({ role: 'طالب' }),
            User.countDocuments({ level: '1', role: 'طالب' }),
            User.countDocuments({ level: '2', role: 'طالب' }),
            User.countDocuments({ level: '3', role: 'طالب' }),
            Group.countDocuments()
        ]);

        const studentsNums = [l1StudentsCount, l2StudentsCount, l3StudentsCount];
        return res.status(200).json({
            error: false,
            data: {
                groupedUsersByDay,
                getAllStudentsCount,
                studentsNums,
                allGroups
            }
        });
    } catch (error) {
        console.error("Error in getAnalytics function:", error.message);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
};




module.exports = {
    getAnalytics,

}