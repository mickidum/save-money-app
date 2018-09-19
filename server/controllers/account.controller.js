// const {Account} = require('../models');
const authService   = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');


const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    console.log('Create Account: ', body);
    if(!body.unique_key && !body.account_name){
        return ReE(res, 'Please enter an account name to register.');
    }
    else{
        let err, account;
        

        [err, account] = await to(authService.createAccount(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new account.', account:account.toWeb()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, account;
    [err, account] = await to(user.Account());

    return ReS(res, {account:account.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
  let err, account, data;
  account = req.user;
  data = req.body;
  account.set(data);

  [err, account] = await to(account.save());
  if(err){
      return ReE(res, err);
  }
  return ReS(res, {account:account.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
  let account, err;
  account = req.account;

  [err, account] = await to(account.remove());
  if(err) return ReE(res, 'error occured trying to delete the account');

  return ReS(res, {message:'Deleted Account'}, 204);
}
module.exports.remove = remove;
