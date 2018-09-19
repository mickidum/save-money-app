const mongoose 			= require('mongoose');
const {TE, to}          = require('../services/util.service');

let IntentSchema = mongoose.Schema({
    name: {type:String},
    users:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

IntentSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let intent = module.exports = mongoose.model('Intent', IntentSchema);

