const express = require('express');
const router = express.Router();
const defaultControllers = require('../../controllers/default/defaultControllers');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
// const User = require('../../models/userModels');
const mySqlQuery = require('../../mysql');
const {isUserAuthenticated} = require('../../config/lib')






router.all('/*', (req,res,next) => {
    req.app.locals.layout = 'default';

    next();
});


router.route('/')
    .get(defaultControllers.index);








passport.use('local', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},  function(req,email,password,done){
    if(!email && !password) return done(null,false, {message:'Enter email and password'});


    mySqlQuery.query('SELECT * FROM users  WHERE ?',{email:email}, (err,results) => {
        if(err) throw err;
      
        // console.log('Data received from Db:\n');
        // console.log(results);

        if(results.length <= 0) return done(null,false, {message:'Sorry, User not found'});
        // return;
        bcryptjs.compare(password, results[0].password, (err,passwordMatched) => {
            if(err) return err;
            if(!passwordMatched) return done(null,false, {message: 'Incorrect Password'});
            let user = results;
            return done(null,user);
        });
      });



    // User.findOne({email}).then(user => {
        

    // });

}));

passport.serializeUser(function(user,done){
    //console.log(user)
    done(null, user[0].id);
});

passport.deserializeUser(function(id,done){

    mySqlQuery.query('SELECT * from users where ?', {id: id}, function(err, results)   {
        if(err) throw err;
    
      //console.log('Data received from Db:\n');
    //   console.log(results);
      let user = results;
      done(err,user[0].id);
    });


    // User.findById(id, function(err,user){
        
    // });
});

router.route('/login')
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



router.route('/about-us-page')
    .get(defaultControllers.aboutUs);


router.route('/register-page')
    .get(defaultControllers.register)
    .post(defaultControllers.registerUser);


router.route('/how-it-works-page')
    .get(defaultControllers.HowItWorks);


router.route('/category-profile-page')
    .get(defaultControllers.CategoryProfile);

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
router.route('/create-new-gig')
    .post(defaultControllers.createNewGig);



router.route('/Mynotifications')
     .get(isUserAuthenticated,defaultControllers.Mynotifications);
router.route('/createGig')
    .get(isUserAuthenticated,defaultControllers.createGig);
router.route('/View-Gigs')
    .get(isUserAuthenticated,defaultControllers.viewGigs);
router.route('/edit-Gig')
    .get(isUserAuthenticated,defaultControllers.editGigs);
router.route('/logout')
    .get((req,res)=>{
        req.logout();
        req.session.destroy();
        return res.redirect('/');
    })

module.exports = router;