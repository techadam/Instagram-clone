const mongoose = require('mongoose');
const fieldConfig = {
    type: String,
    required: true,
}

const userSchema = new mongoose.Schema({
    name: fieldConfig,
    email: fieldConfig,
    password: fieldConfig
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);