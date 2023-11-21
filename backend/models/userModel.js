const mongoose = require("mongoose");
const currentDateInCairo = new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' });


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true,
    },
    parentPhoneNumber: {
        type: String,
    },
    group: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "طالب",
    },
    level: {
        type: Number,
        required: true,
    },
    lessons: {
        type: [],
        default: [],
    },
    comprehensiveExams: {
        type: [],
        default: [],
    },
    createdAt: {
        type: Date,
        default: currentDateInCairo,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
