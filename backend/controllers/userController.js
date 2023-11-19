const jwt = require("jsonwebtoken")
const User = require("../models/userModel")




const createUser = async (req, res) => {
    const { name, phoneNumber, parentPhoneNumber, group,level,role } = req.body
    try {
        if (!name && !phoneNumber &&!role&&!level&& !parentPhoneNumber && !group) return res.status(400).json({ error: true, message: 'name and group and phone number and parent Phone Number are required' })

        const query = {
            $or: [
                { phoneNumber: { $eq: parseInt(phoneNumber) } },
                { parentPhoneNumber: { $eq: parseInt(parentPhoneNumber) } },
            ],
            name
        };

        const user = await User.findOne(query)

        if (user) return res.status(400).json({ error: true, message: 'المستخدم موجود بالفعل' })

        const createdUser = await User.create({
            name: name.toLowerCase(),
            phoneNumber,
            parentPhoneNumber,
            group,
            level,
            role,
            createdAt:new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }),
        })

console.log(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }))
        return res.status(200).json({ error: false, user: createdUser })


    } catch (error) {
        console.error("Error in login function:", error.message);
        return res.status(400).json({ error: true, message: 'internal server error' })
    }

}



const login = async (req, res) => {
    const { name, phoneNumber } = req.body
    try {
        if (!name && !phoneNumber) return res.status(400).json({ error: true, message: 'name and phone number are required' })

        const query = {
            $or: [
                { phoneNumber: { $eq: parseInt(phoneNumber) } },
                { parentPhoneNumber: { $eq: parseInt(phoneNumber) } },
            ],
            name: { $regex: new RegExp(name, 'i') }
        };

        const user = await User.findOne(query)

        if (!user) return res.status(400).json({ error: true, message: 'اسم الطالب او رقم الهاتف خطأ' })

        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '30d' })

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        return res.status(200).json({ error: false, user })


    } catch (error) {
        console.error("Error in login function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })
    }

}



const checkLoggedIn = async (req, res) => {
    try {

        return res.status(200).json({ error: false, user: req.user })


    } catch (error) {
        console.error("Error in checkLoggedIn function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })
    }
}



const logout = async (req, res) => {
    try {
        res.clearCookie("access_token")
        return res.status(200).json({ error: false, message: 'successfuly logged out' })


    } catch (error) {
        console.error("Error in checkLoggedIn function:", error);
        return res.status(400).json({ error: true, message: 'internal server error' })
    }
}





module.exports = {
    login,
    createUser,
    checkLoggedIn,
    logout,

}