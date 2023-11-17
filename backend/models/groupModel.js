const { default: mongoose } = require("mongoose");



const GroupSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
    },
    level: {
        required: true,
        type: String,
    }
    

}, { timestamps: true })

const Group = mongoose.model('Group', GroupSchema)
module.exports = Group