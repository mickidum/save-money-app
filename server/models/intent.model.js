const mongoose 			= require('mongoose');
const {TE, to}          = require('../services/util.service');

let IntentSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    cost: {type: Number, required: true},
    done: {type: Boolean, default: false},
    image: {type: String, trim: true},
    users:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

IntentSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let intent = module.exports = mongoose.model('Intent', IntentSchema);

