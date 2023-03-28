const mongoose = require('mongoose');
 
// create a schema
var userSchema = new mongoose.Schema({
            username: {type: String, require: true, unique: true},
            password: {type: String, require: true}
        },
        { collection: 'users' }
        );
 
var userModel = mongoose.model('users',userSchema);
 
module.exports = userModel;