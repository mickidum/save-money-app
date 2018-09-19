const Intent 			    = require('../models/intent.model');
// const Account 			    = require('../models/account.model');
const { to, ReE, ReS } = require('../services/util.service');

let intent = async function (req, res, next) {
    let intent_id, err, intent;
    intent_id = req.params.intent_id;

    [err, intent] = await to(Intent.findOne({_id:intent_id}));
    if(err) return ReE(res,"err finding intent");

    if(!intent) return ReE(res, "Intent not found with id: "+intent_id);
    let user, users_array;
    user = req.user;
    users_array = intent.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.intent = intent;
    next();
}
module.exports.intent = intent;

let account = async function (req, res, next) {
    let account_id, err, account;
    account_id = req.params.account_id;

    [err, account] = await to(Account.findOne({_id:account_id}));
    if(err) return ReE(res,"err finding account");

    if(!account) return ReE(res, "Account not found with id: "+account_id);
    let user, users_array;
    user = req.user;
    users_array = account.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.account = account;
    next();
}
module.exports.account = account;