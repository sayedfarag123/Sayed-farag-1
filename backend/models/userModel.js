const { default: mongoose } = require("mongoose");



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true
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
        default: 'طالب'
    },
    level:{
        type:Number,
        required:true
    },
    lessons: {
        type: [],
        default: [],
    },
    comprehensiveExams: {
        type: [],
        default: [],
    }

}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
module.exports = User