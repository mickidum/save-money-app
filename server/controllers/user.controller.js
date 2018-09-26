const { Intent, User }      = require('../models');
const authService   = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');


const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    if(user.role && user.role !== 'admin') {
        return ReE(res, 'You are not allowed to view this!');
    }
    
    [err, users] = await to(User.find());
    let users_json = []
    for (let i in users){
        let user = users[i];
        users_json.push(user.toWeb())
    }
    return ReS(res, {users: users_json});

    // return ReS(res, {user:user.toWeb()});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    // if(!user.settings.monthCost && !user.email && !user.phone){
    //     return ReE(res, 'Please enter an email or phone number to register.');
    // } else if(!user.password){
    //     return ReE(res, 'Please enter a password to register.');
    // }

    [err, user] = await to(user.save());
    if(err){
        console.log(err, user);

        if(err.message.includes('E11000')){
            if(err.message.includes('phone')){
                err = 'This phone number is already in use';
            } else if(err.message.includes('email')){
                err = 'This email address is already in use';
            }else{
                err = 'Duplicate Key Entry';
            }
        }

        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err, intents;
    user = req.user;

    [err, intents] = await to(Intent.deleteMany({'users.user':user._id}, function (err) {
        if (err) return res.status(500).send(err);
    }));

    if(err) return ReE(res, 'error occured trying to delete intents');

    [err, intent] = await to(user.remove());
    if(err) return ReE(res, 'error occured trying to delete user');
    
    return ReS(res, {message:`User: ${user.email} and all intents - have been deleted`});
}
module.exports.remove = remove;

const removeUser = async function(req, res){
    let user, err, currentUser;
    currentUser = req.currentUser;
    user = req.user;
    // console.log('Admin: ', user);
    // console.log('Current User: ', currentUser)
    if (user.role !== "admin") {
        return ReE('You are not allowed to create an admin account.');
    }

    [err, intents] = await to(Intent.deleteMany({'users.user':currentUser._id}, function (err) {
        if (err) return res.status(500).send(err);
    }));

    if(err) return ReE(res, 'error occured trying to delete intents');

    [err, intent] = await to(currentUser.remove());
    // [err, currentUser] = await console.log(currentUser);
    if(err) return ReE(res, 'error occured trying to delete user');
    
    return ReS(res, {message:`User: ${currentUser.email} and all intents - have been deleted`});
}
module.exports.removeUser = removeUser;


const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;