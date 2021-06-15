const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema; 

const SessionSchema = new Schema({
    // author: ObjectId,
    id: {type: String, maxLength:255},
    cart: {type: Object, maxLength:255},
},{
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
SessionSchema.plugin(mongooseDelete,{
    deletedAt : true,   //hiện ngày delete
    overrideMethods: 'all', //ghi đè
})

module.exports = mongoose.model('Session', SessionSchema ,'Sessions') //(modelName se tu lowercase va them dang so nhieu)