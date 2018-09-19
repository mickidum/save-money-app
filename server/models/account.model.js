const mongoose 			= require('mongoose');
// const {TE, to}          = require('../services/util.service');

let AccountSchema = mongoose.Schema({
    account_name: {type:String, lowercase:true, trim: true, index: true, unique: true},
    single_cost: {type:Number},
    month_cost: {type:Number},
    last_waisted: {type:Number},
    total_waisted: {type:Number},
    total_saved: {type:Number},
    users:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

AccountSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let Account = module.exports = mongoose.model('Account', AccountSchema);

