const moment = require("moment/moment");
const User = require("../models/userModel");

// function groupUsersByDay(users) {
//     const groupedUsers = {};

//     users.forEach(user => {
//         const day = moment(user.createdAt).format('YYYY-MM-DD');

//         if (!groupedUsers[day]) {
//             groupedUsers[day] = [];
//         }

//         groupedUsers[day].push(user);
//     });

//     return groupedUsers;
// }

const getAnalytics = async (req, res) => {
    try {
        const endDate = new Date();
        const startDate = moment(endDate).subtract(30, 'days').startOf('day').toDate();

        // Aggregate users by day using MongoDB aggregation framework
        const groupedUsersByDay = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);



        return res.status(200).json({ error: false, data: groupedUsersByDay })

    } catch (error) {
        console.error("Error in checkLoggedIn function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })
    }
}


module.exports = {
    getAnalytics,

}