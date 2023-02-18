const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String,  
    user_name: String,
    password: String
});

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

var User = mongoose.model('users', userSchema);

module.exports = User;