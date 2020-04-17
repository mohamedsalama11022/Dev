const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    dob: Date,
    gender: String,
    email: String,
    phoneNo: String
})

//  model(nameOfModel, schemaOfTheModelThatIamCreating) method syntax
// each schema will have a model
const userModel = mongoose.model('User', userSchema)

module.exports = userModel 