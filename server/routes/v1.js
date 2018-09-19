const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const IntentController = require('../controllers/intent.controller');
const HomeController 	= require('../controllers/home.controller');
const AccountController 	= require('../controllers/account.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

router.post(    '/account',           AccountController.create);                                                    // C
router.get(     '/account/:intent_id',           passport.authenticate('jwt', {session:false}),custom.account, AccountController.get);        // R
router.put(     '/account/:account_id',           passport.authenticate('jwt', {session:false}),custom.account, AccountController.update);     // U
router.delete(  '/account/:account_id',           passport.authenticate('jwt', {session:false}),custom.account, AccountController.remove);     // D

router.post(    '/intents',             passport.authenticate('jwt', {session:false}), IntentController.create);                  // C
router.get(     '/intents',             passport.authenticate('jwt', {session:false}), IntentController.getAll);                  // R

router.get(     '/intents/:intent_id', passport.authenticate('jwt', {session:false}), custom.intent, IntentController.get);     // R
router.put(     '/intents/:intent_id', passport.authenticate('jwt', {session:false}), custom.intent, IntentController.update);  // U
router.delete(  '/intents/:intent_id', passport.authenticate('jwt', {session:false}), custom.intent, IntentController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
