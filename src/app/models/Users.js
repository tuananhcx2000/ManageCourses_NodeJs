const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema; 

const User = new Schema({
    // author: ObjectId,
    userName: {type: String, maxLength:255},
    passWord: {type: String, maxLength:255},
},{
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
User.plugin(mongooseDelete,{
    deletedAt : true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Users', User ,'Users') //(modelName se tu lowercase va them dang so nhieu)