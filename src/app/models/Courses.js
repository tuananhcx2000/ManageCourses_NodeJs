const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema; //luoc do quy dinh model
// const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
    // author: ObjectId,
    _id: {type:Number},
    name: {type: String, default: '', maxLength:255},
    image: {type: String, maxLength:255},
    slug: { type: String, slug: "name", unique:true },
    videoId: {type: String, maxLength:255},
    decription: {type: String, maxLength:600},
},{
    _id:false,
    timestamps: true,
});

//add plugin
CourseSchema.plugin(AutoIncrement);
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete,{
    deletedAt : true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', CourseSchema,'courses') //(modelName se tu lowercase va them dang so nhieu) [modelName,scheama,colection]