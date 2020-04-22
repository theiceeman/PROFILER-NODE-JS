const express = require('express');
const router = express.Router();
const defaultControllers = require('../../controllers/default/defaultControllers');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const mySqlQuery = require('../../mysql');
const {isUserAuthenticated} = require('../../config/lib');
const lib = require('../../config/lib');






router.all('/*', (req,res,next) => {
    req.app.locals.layout = 'index';

    next();
});


router.route('/')
    .get(defaultControllers.index);





passport.use('local-end', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},  function(req,email,password,done){
    if(!email && !password) return done(null,false, {message:'Enter email and password'});
    mySqlQuery.query('SELECT * FROM users  WHERE ?',{email:email}, (err,results) => {
        if(err) throw err;
        // console.log(results);
        if(results.length <= 0) return done(null,false, {message:'Sorry, User not found'});
        if(results[0].blocked == '0') return done(null,false, {message:'Sorry, You are restricted access to this account'});
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

    mySqlQuery.query('SELECT * from users where ?', {id: id}, function(err, results)   {
        if(err) throw err;
      let user = results;
      done(err,user[0].id);
    });
});

router.route('/login')
    .post((req,res,next) => {
        //console.log(req.body);
        passport.authenticate('local-end',function(err,user,info){
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



router.route('/about-us-page')
    .get(defaultControllers.aboutUs);

    // /user_support
    
router.route('/user_support')
.get(userSupport);


router.route('/register-page')
    .get(defaultControllers.register)
    .post(defaultControllers.registerUser);


router.route('/how-it-works-page')
    .get(defaultControllers.HowItWorks);

router.route('/category-profile-page')
    .get(categoryPage);

router.route('/main-category-page')
    .get(defaultControllers.mainCategory);

router.route('/terms-condition-page')
    .get(defaultControllers.termsAndConditions);
    
router.route('/freelancer-gigs')
    .get(defaultControllers.freelancerGigs);

router.route('/user')
    .get(isUserAuthenticated,defaultControllers.userDashboard);
router.route('/my-profile')
    .get(isUserAuthenticated,defaultControllers.userProfile);
router.route('/update-personal-details')
    .post(defaultControllers.updatePersonalDetails);
router.route('/update-description-services')
    .post(defaultControllers.updateDescriptionServices);
router.route('/update-projects')
    .post(defaultControllers.updateProjects);
router.route('/gig-get-subCategory')
    .post(defaultControllers.gigGetSubCategory);
router.route('/upload-profile-image')
    .post(defaultControllers.uploadProfileImage);
router.route('/upload-gig-cover-image/:id')
    .post(defaultControllers.uploadGigCoverImage);
router.route('/create-new-gig')
    .post(defaultControllers.createNewGig);
router.route('/edit-this-gig')
    .post(defaultControllers.editThisGig);
router.route('/review-this-seller')
    .post(defaultControllers.reviewThisSeller);
router.route('/delete-this-gig')
    .post(defaultControllers.deleteThisGig);


router.route('/Mynotifications')
     .get(isUserAuthenticated,defaultControllers.Mynotifications);
router.route('/createGig')
    .get(isUserAuthenticated,defaultControllers.createGig);
router.route('/View-Gigs')
    .get(isUserAuthenticated,defaultControllers.viewGigs);
router.route('/edit-Gig/:id')
    .get(isUserAuthenticated,defaultControllers.editGigs);
router.route('/job-profile/:id')
    .get(defaultControllers.jobProfile);
router.route('/inbox/:id')
    .get(defaultControllers.inbox);
router.route('/logout')
    .get((req,res)=>{
        req.logout();
        req.session.destroy();
        return res.redirect('/');
    })

module.exports = router;

  async function categoryPage(req,res){
    let userId = req.user;
    let all_gigs = await lib.selectQuery('SELECT * from gigs ','all_rows',[]);
    let gig = all_gigs, gig_owners_emails = [], gig_owners = [];
    for (let i = 0; i < gig.length; i++) {
        let element = gig[i].email;
        let user_details = await lib.selectQuery('SELECT * from users where email = ?','with_params',[gig[i].email]);
        gig_owners.push(user_details[0].firstName+''+user_details[0].lastName);
    }
    // console.log(gig_owners); 
                if(userId){
                    mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                        // console.log(gig_owners)
                        if(err) throw err;
                        let userDetail = rows;
                        res.render('default/category', {
                            userId:userId,
                            user:userDetail,
                            gig:gig,
                            gigOwner:gig_owners,
                            page:"category",
                        });
                    });
                }else{
                    mySqlQuery.query('SELECT * from users ',  function(err, rows)   {
                    // console.log(gig_owners)
                        res.render('default/category', {
                            userId:'',
                            user:'',
                            gig:gig,
                            gigOwner:gig_owners,
                            page:"category",
                        });
                    });
                }
}

    async function userSupport(req,res){
        
        let userId = req.user;
        if(userId){
            let user_details = await lib.selectQuery('SELECT * from users where id = ?','with_params',[userId]);
            let admin_support = await lib.selectQuery('SELECT * from admin_support where user_email = ?','with_params',[user_details[0].email]);
            if (admin_support.length == 0) {
                let support_id = 'ADMINSUPPORTCHAT'+lib.genRandomNo()+Date.now();
                let conv = {
                    conversation_id:support_id,
                    user_email:user_details[0].email,
                    created_at:lib.createDate(),                                    
                }
                mySqlQuery.query('INSERT INTO admin_support SET ?', conv, (err, result) => {
                  if(err) throw err;
                //   console.log(res);
                  if(result.affectedRows == 1){
                    // console.log(support_id);
                        res.render('default/user_support', {
                        layout:'layout/index',
                        userId:userId,
                        user:user_details,
                        supportId:support_id,
                        page:"user_support",
                    });
                  }else{
                      console.log('Database Error');
                  }
                })        
            }else{
                let support_id = admin_support[0].conversation_id;
                // console.log(support_id);
                res.render('default/user_support', {
                    layout:'layout/index',
                    userId:userId,
                    user:user_details,
                    supportId:support_id,
                    page:"user_support",
                });
            }
        }
    }