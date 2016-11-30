const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
        name: String,
        surname: String,
        age: Number
    }
);
User = mongoose.model('User',userSchema);
module.exports = User;
