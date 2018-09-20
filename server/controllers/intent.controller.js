const { Intent } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, intent;
    let user = req.user;

    let intent_info = req.body;
    intent_info.users = [{user:user._id}];

    [err, intent] = await to(Intent.create(intent_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{intent:intent.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, intents;
    [err, intents] = await to(user.Intents());

    let intents_json = []
    for (let i in intents){
        let intent = intents[i];
        intents_json.push(intent.toWeb())
    }
    return ReS(res, {intents: intents_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let intent = req.intent;
    return ReS(res, {intent:intent.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, intent, data;
    intent = req.intent;
    data = req.body;
    intent.set(data);

    [err, intent] = await to(intent.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {message: `Intent: ${intent.name} - has been updated`});
}
module.exports.update = update;

const remove = async function(req, res){
    let intent, err;
    intent = req.intent;

    [err, intent] = await to(intent.remove());
    if(err) return ReE(res, 'error occured trying to delete the intent');

    return ReS(res, {message:`Intent: ${intent.name} - has been deleted`});
}
module.exports.remove = remove;