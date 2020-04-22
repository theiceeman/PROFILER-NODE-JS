const express = require('express');
const router = express.Router();
const adminControllers = require('../../controllers/admin/adminControllers');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const mySqlQuery = require('../../mysql');
const {isUserAuthenticated} = require('../../config/lib');






// router.all('/*', (req,res,next) => {
//     req.app.locals.layout = 'admin';

//     next();
// });

router.route('/')
    .get(adminControllers.index);
router.route('/edit_user/:id')
    .get(isUserAuthenticated,adminControllers.editUser);
router.route('/edit_gigs/:id')
    .get(isUserAuthenticated,adminControllers.editGig);
router.route('/editcategory/:id')
    .get(isUserAuthenticated,adminControllers.editCategory);

    passport.use('local', new localStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },  function(req,email,password,done){
        if(!email && !password) return done(null,false, {message:'Enter email and password'});
        mySqlQuery.query('SELECT * FROM admin_tb  WHERE ?',{email:email}, (err,results) => {
            if(err) throw err;
            // console.log(results);
            if(results.length <= 0) return done(null,false, {message:'Sorry, Admin not found'});
            // return;
            bcryptjs.compare(password, results[0].password, (err,passwordMatched) => {
                if(err) return err;
                if(!passwordMatched) return done(null,false, {message: 'Incorrect Password'});
                let user = results;
                return done(null,user);
            });
          });
    }));


    passport.serializeUser(function(user,done){
        done(null, user[0].id);
    });
    
    passport.deserializeUser(function(id,done){
    
        mySqlQuery.query('SELECT * from admin_tb where ?', {id: id}, function(err, results)   {
            if(err) throw err;
          let user = results;
          done(err,user[0].id);
        });
    });
    
    router.route('/login-this-admin')
        .post((req,res,next) => {
            //console.log(req.body);
            passport.authenticate('local',function(err,user,info){
                //console.log('err');
                if(err) {
                    console.log(err);
                    return next(err)
                };
                if(!user) {
                    //console.log(info);
                    const errM = info;
                    return res.end(JSON.stringify(errM));
                };
                req.login(user,(err => {
                    if(err){
                        console.log(err);
                        return next(err);
                    }
                    return res.end(JSON.stringify({message:'login'}));
                }))
            })(req,res,next);
        });

router.route('/admin-dashboard')
    .get(isUserAuthenticated,adminControllers.adminDashboard);
router.route('/view_user')
    .get(isUserAuthenticated,adminControllers.viewUser);
router.route('/view_gigs')
    .get(isUserAuthenticated,adminControllers.viewGigs);
router.route('/createcategory')
    .get(isUserAuthenticated,adminControllers.createCategory);
router.route('/subcategory')
    .get(isUserAuthenticated,adminControllers.subCategory);
router.route('/view_category')
    .get(isUserAuthenticated,adminControllers.viewCategory);
router.route('/admin_user_support')
    .get(isUserAuthenticated,adminControllers.userSupport);
router.route('/create_admin')
    .get(isUserAuthenticated,adminControllers.createAdmin);
router.route('/chat/:id')
    .get(isUserAuthenticated,adminControllers.chat);

router.route('/create-new-category')
    .post(adminControllers.createNewCategory);
router.route('/create-sub-category')
    .post(adminControllers.createSubCategory);
router.route('/update-sub-category')
    .post(adminControllers.updateSubCategory);
router.route('/update-main-category')
    .post(adminControllers.updateMainCategory);
router.route('/upload-category-photo')
    .post(adminControllers.uploadCategoryPhoto);
router.route('/create-new-admin')
    .post(adminControllers.createNewAdmin);
router.route('/block-this-user')
    .post(adminControllers.blockThisUser);
router.route('/unblock-this-user')
    .post(adminControllers.unblockThisUser);
router.route('/delete-this-user')
    .post(adminControllers.deleteThisUser);
router.route('/update-this-user')
    .post(adminControllers.updateThisUser);
router.route('/block-this-gig')
    .post(adminControllers.blockThisGig);
router.route('/unblock-this-gig')
    .post(adminControllers.unblockThisGig);
router.route('/delete-this-gig')
    .post(adminControllers.deleteThisGig);
router.route('/update-this-gig')
    .post(adminControllers.updateThisGig);

    // /block-this-user




module.exports = router;