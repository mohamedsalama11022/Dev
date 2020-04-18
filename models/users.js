const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const TokenGenerator = require('uuid-token-generator')
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    dob: Date,
    gender: String,
    email: String,
    phoneNo: String,
    tokgen: String
})

userSchema.pre('save',function(next){
    var user = this
    if(user.isNew) {
        bcrypt.hash(user.password, 10,function(err, hashedPassword) {
            user.password = hashedPassword
            const tokgen = new TokenGenerator()
            var generatedToken = tokgen.generate()
            user.tokgen = generatedToken
            next()
        })
    }
})

//  model(nameOfModel, schemaOfTheModelThatIamCreating) method syntax
// each schema will have a model
const userModel = mongoose.model('User', userSchema)


module.exports = userModel
