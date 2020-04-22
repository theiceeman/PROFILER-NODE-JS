const bcrypt = require('bcryptjs');
const express = require('express');
const mySqlQuery = require('../../mysql');
const lib = require('../../config/lib');
const fs = require('fs');
const path = require("path");
const multer = require('multer');


//MULTER FILE UPLOAD CONFIG
const storage_profile_img = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/default/uploads/profile-images')
    },
    filename: (req, file, cb) => {
        // console.log('diskStorage');
      cb(null, 'ProfileImage-'+ lib.genRandomNo() + Date.now() + path.extname(file.originalname))
    }
});
const upload_profile_img = multer({
    storage: storage_profile_img,
    limits:{fileSize:1000000},
    fileFilter:function (req,file,cb) {
        // console.log(req.file)
        lib.checkFile(req,file, cb);
    }
}).single('uploadedFile');

//MULTER FILE UPLOAD CONFIG FOR GIG COVER
const storage_gig_cover_img = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/default/uploads/gig-cover')
    },
    filename: (req, file, cb) => {
        // console.log('diskStorage');
      cb(null, 'GigCoverImage-'+ lib.genRandomNo() + Date.now() + path.extname(file.originalname))
    }
});
const upload_gig_cover_img = multer({
    storage: storage_gig_cover_img,
    limits:{fileSize:1000000},
    fileFilter:function (req,file,cb) {
        // console.log(req.file)
        lib.checkFile(req,file, cb);
    }
}).single('uploadedGigFile');





module.exports = {
    index: (req,res) => {
        let userId = req.user;
        
        if(userId){
            console.log(userId);
            mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                if(err) throw err;
                let userDetail = {
                    
                };
                res.render('default/home', {
                    layout:'layout/index',
                    userId:userId,
                    user:rows,
                    page:"home",
                });

            });
        }else{
            res.render('default/home', {
                layout:'layout/index',
                userId:'',
                user:'',
                page:"home",
            });

        }
        
    },

    aboutUs: (req,res)=> {
        // res.render('default/aboutUs');
        let userId = req.user;
        if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
          let userDetail = {
            
        };
        res.render('default/aboutUs', {
            layout:'layout/index',
            userId:userId,
            user:rows,
            page:"aboutUs",
        });

        });
        }else{
            res.render('default/aboutUs', {
                layout:'layout/index',
                userId:'',
                user:'',
                page:"aboutUs",
            });
        }
        
    },

    register: (req,res) => {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
        
        //   console.log('Data received from Db:\n');
        //   console.log(rows);

        res.render('default/register', {
            layout:'layout/index',
            userId:userId,
            user:rows,
            page:"register",
        });


        });
        }else{
            res.render('default/register', {
                layout:'layout/index',
                userId:'',
                user:'',
                page:"register",
            });
        }
        
    },
    registerUser: (req,res)=> {
        //console.log(req.body);
        const {email, password, cpassword } = req.body;
        let errors = [];
        if(!email){
            errors.push({message:'Please Enter Email'});
        }else if(!password){
            errors.push({message: 'Please, Enter Password'});
        }else if(!cpassword){
            errors.push({message: 'Please Confirm Password'});
        }
        if(password !== cpassword){
            errors.push({message: 'Passwords do not match'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            //User.findOne({email: email})
            mySqlQuery.query('SELECT * FROM users  WHERE ?',{email:email}, (err, results) => {
                if(err) throw err;
                //console.log('Data received from Db:\n');
                //console.log(results);
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'This email already exists'}]));
                    } else{
                        const newUser = {
                            email:email,
                            password:password,
                            date_joined:lib.createDate(),
                        };
                        //console.log(newUser)
                        bcrypt.genSalt(10, (err,salt) => {
                            bcrypt.hash(newUser.password, salt, (err,hash)=> {
                                newUser.password = hash;
                                //newUser.save()
                                // console.log('Insertion');
                                mySqlQuery.query('INSERT INTO users SET ?', newUser, (err, res) => {
                                    if(err) throw err;
                                    //console.log('Last insert ID:', res.insertId);
                                  })
                                  let desc = {
                                      email:email,                                    
                                  }
                                  mySqlQuery.query('INSERT INTO user_description SET ?', desc, (err, res) => {
                                    if(err) throw err;
                                    //console.log('Last insert ID:', res.insertId);
                                  })
                                    res.end(JSON.stringify([{message:'Proceed To Login'}]));
                                
                            })
                        })
                        
                    }
                    
              })
        } 
    },

    HowItWorks:(req,res)=> {
        // res.render('default/how_it_works');
        
        let userId = req.user;
        if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
          let userDetail = {
            
        };
        res.render('default/how_it_works', {
            layout:'layout/index',
            userId:userId,
            user:rows,
            page:"how_it_works",
        });

        });
        }else{
            res.render('default/how_it_works', {
                layout:'layout/index',
                userId:'',
                user:'',
                page:"how_it_works",
            });

        }
    },
    // jobProfile

    jobProfile: (req,res)=> {
        // res.render('default/category')
        
        let userId = req.user;
        let gig_id = req.params.id;
        // if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
            let userDetail = rows;
            mySqlQuery.query('SELECT * from gigs where ?', {unique_id: gig_id}, function(err, rows)   {
                if(err) throw err;
                let gig = rows;
                // console.log(userDetail); return;
                mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                    if(err) throw err;
                    mySqlQuery.query('SELECT * from users where ?', {email: gig[0].email}, function(err, rows)   {
                        if(err) throw err;

                        let gig_owner = rows;
                        // console.log(gig); 
                        if(userId){
                            res.render('default/job-profile', {
                                layout:'layout/index',
                                userId:userId,
                                user:userDetail,
                                gig:gig,
                                gigOwner:gig_owner,
                                page:"job-profile",
                            });
                        }else{
                            res.render('default/job-profile', {
                                layout:'layout/index',
                                userId:'',
                                user:'',
                                gig:gig,
                                gigOwner:gig_owner,
                                page:"job-profile",
                            });
                        }
                    });
                });
            });
        });
    },
    mainCategory: (req,res)=> {
        // res.render('default/main_category')
        
        let userId = req.user;
        if(userId){
            mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                if(err) throw err;
            let userDetail = {
                
            };
            res.render('default/main_category', {
                layout:'layout/index',
                userId:userId,
                user:rows
            });

            });
        }else{
            res.render('default/main_category', {
                layout:'layout/index',
                userId:'',
                user:'',
            });

        }
    },
    inbox: (req,res)=> {
        // res.render('default/main_category')
        let seller_email = req.params.id;
        let userId = req.user;
        if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
            let userDetail = rows; 
            mySqlQuery.query('SELECT * from users where ?', {email: seller_email}, function(err, rows)   {
                if(err) throw err;
                let seller = rows;
                let participant1 = userDetail[0].email;
                let participant2 = seller[0].email;
                // console.log(participant1+''+participant2);return;
                mySqlQuery.query('SELECT * from conversations WHERE first_participant = ? AND second_participant = ?', [participant1,participant2], function(err, rows)   {
                        if(err) throw err;
                        // console.log(rows.length);return;
                        if (rows.length === 0) {

                            mySqlQuery.query('SELECT * from conversations WHERE first_participant = ? AND second_participant = ?', [participant2,participant1], function(err, rows)   {
                                if(err) throw err;
                                if (rows.length == 0) {
                                    let chat_id = 'CHAT'+lib.genRandomNo();
                                    let conv = {
                                        unique_id:chat_id,
                                        first_participant:participant1,
                                        second_participant:participant2,
                                        created_at:lib.createDate(),                                    
                                    }
                                    mySqlQuery.query('INSERT INTO conversations SET ?', conv, (err, res) => {
                                      if(err) throw err;
                                      console.log(res);
                                      if(res.affectedRows == 1){
                                                  let chat_id = rows[0].unique_id;
                                                  res.render('default/inbox',
                                          {
                                            layout:'layout/index',
                                            userId:userId,
                                            seller:seller,
                                            user:userDetail,
                                            chatId:chat_id,
                                            page:"inbox",});

                                      }else{
                                          console.log('Database Error');
                                      }
                                    })        
                                    
        
                                }else{
                                    let chat_id = rows[0].unique_id;
                                    res.render('default/inbox',{
                                        layout:'layout/index',
                                        userId:userId,seller:seller,user:userDetail, chatId:chat_id,page:"inbox",
                                    });
                                }
                
                            });

                        }else{
                            let chat_id = rows[0].unique_id;
                            res.render('default/inbox',
                            {layout:'layout/index',userId:userId,seller:seller,user:userDetail, chatId:chat_id,page:"inbox",});
                        }
        
                    });
            });

        });
        }else{
            

        }
    },

    termsAndConditions: (req,res)=> {
        // res.render('default/privacy_condition')
        
        let userId = req.user;
        if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
          let userDetail = {
            
        };
        res.render('default/privacy_condition', {
            layout:'layout/index',
            userId:userId,
            user:rows,
            page:"privacy_condition",
        });

        });
        }else{
            res.render('default/privacy_condition', {
                layout:'layout/index',
                userId:'',
                user:'',
                page:"privacy_condition",
            });

        }
    },
    freelancerGigs: (req,res)=> {
        // res.render('default/user_dashboard');
        
        let userId = req.user;
        if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
          let userDetail = {
            
        };
        res.render('default/user_dashboard', {
            layout:'layout/index',
            userId:userId,
            user:rows,
            page:"user_dashboard",
        });

        });
        }else{
            res.render('default/user_dashboard', {
                layout:'layout/index',
                userId:'',
                user:'',
                page:"user_dashboard",
            });

        }
    },
    userDashboard: (req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
            //   console.log('Data received from Db:\n');
            //   console.log(rows);
            let userDetail = {
                
            };
            res.render('default/dashboardProfile', {
                layout:'layout/index',
                userId:userId,
                user:rows,
                page:"dashboardProfile",
            });
        });
        }
        
    },



    userProfile: (req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
        
        //   console.log('Data received from Db:\n');
        //   console.log(rows);

          let userDetail = {
            
        };
        res.render('default/userProfile', {
            layout:'layout/index',
            userId:userId,
            user:rows,
            error:null,
            page:"userProfile",
        });


        });
        }

        // res.render('default/userProfile');
    },
    Mynotifications: (req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
            let userRow = rows;
            mySqlQuery.query('SELECT * from notifications where ?', {reciever: rows[0].email}, function(err, rows)   {
                if(err) throw err;
                // console.log(rows)
                rows.reverse();
                
            res.render('default/notifications', {
                layout:'layout/index',
                userId:userId,
                user:userRow,
                notifications:rows,
                page:"notifications",
            });
    
            });


        });

        }
    },
    createGig:(req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
            let user_details = rows;
            
            mySqlQuery.query('SELECT * from main_category ',  function(err, rows)   {
                if(err) throw err;
            
            
                res.render('default/createGig', {
                    layout:'layout/index',
                    userId:userId,
                    user:user_details,
                    page:"createGig",
                    mainCat:rows,
                });
    
            });
        
        
            // res.render('default/createGig', {
            //     layout:'layout/index',
            //     userId:userId,
            //     user:rows,
            //     page:"createGig",
            // });

        });
        }

        // res.render('default/createGig');
    },
    viewGigs:(req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
             
          let userDetail = rows;
          mySqlQuery.query('SELECT * from gigs where ?', {email: userDetail[0].email}, function(err, rows)   {
            if(err) throw err;
             
            // console.log(rows);
            res.render('default/view-gigs', {
                layout:'layout/index',
                userId:userId,
                user:userDetail,
                gig:rows,
                page:"view-gigs",
                error:null,
            });


            });


        });
        }
    },
    editGigs:(req,res)=> {
        let userId = req.user;
        if(userId){
            mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                if(err) throw err;
                 
              let userDetail = rows;
              mySqlQuery.query('SELECT * from gigs where ?', {unique_id: req.params.id}, function(err, rows)   {
                if(err) throw err;
                    let userGig = rows;
                    mySqlQuery.query('SELECT * from main_category ',  function(err, rows)   {
                        if(err) throw err;
                        // console.log(userGig);
                        // console.log(rows);
                        res.render('default/edit-gig', {
                            layout:'layout/index',
                            userId:userId,
                            user:userDetail,
                            gig:userGig,
                            allGigs:rows,
                            error:null,
                            page:"edit-gig",
                        });
                    
                    });

                });
            });
        }
    },

    

    


    editThisGig:(req,res)=> {
        // console.log(req.body); 
        const {gig_title, main_category,sub_category, unique_id } = req.body;
        let errors = [];
        if(!gig_title || !main_category || !sub_category ){
            errors.push({message:'Fill all details for this Gig'});
        }
        if(sub_category == 'Select a Sub Category' || sub_category == ''){
            errors.push({message:'Select a sub-category for this Gig'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            const insert = {
                title:gig_title,
                main_category:main_category,
                sub_category:sub_category,
            }
            mySqlQuery.query('UPDATE gigs SET ? Where unique_id = ?',[insert, unique_id], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        //console.log(newUser)
                            res.end(JSON.stringify([{message:'Gig Updated Successfully!'}]));
                          
                    }
                    
              })
        }

    },
    updatePersonalDetails:(req,res)=> {
        // console.log(req.body); 
        const {firstname, lastname,sex,state,email,address,number } = req.body;
        let errors = [];
        if(!firstname || !lastname || !sex || !state || !email || !address || !number){
            errors.push({message:'No changes to personal details'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            const insert = {
                firstName:firstname,
                lastName:lastname,
                sex:sex,
                state:state,
                address:address,
                number:number,
            }
            mySqlQuery.query('UPDATE users SET ? WHERE email = ?',[insert,email], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        //console.log(newUser)
                            res.end(JSON.stringify([{message:'Personal Details Updated!'}]));
                          
                    }
                    
              })
        }

    },

    
    updateDescriptionServices:(req,res)=> {

        
        //console.log(req.body); 
        const {userDescription,skills} = req.body;
        let errors = [];
        if(!userDescription){
            errors.push({message:'No changes made'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            console.log(skills);
            
            mySqlQuery.query('UPDATE user_description set description =? , skills =?  WHERE id = ?',[userDescription,skills,req.user], (err, results) => {
                // if(err) throw err;
                // console.log(results); return
                    if (err) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                        throw err;
                    } else{
                        //console.log(newUser)
                        res.end(JSON.stringify([{message:'Description & Skills Updated!'}]));
                          
                    }
                    
              })
        }



    },
    updateProjects:(req,res)=> {
        // console.log(req.body) ;return;
        const {title,url,email} = req.body;
        let errors = [];
        if(!title || !url){
            errors.push({message:'No changes made'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            let project_id = lib.genRandomNo();
            // console.log(project_id); return;
            let project = {
                email:email,
                project_id:project_id,
                title:title,
                url:url,
            }
            
            mySqlQuery.query('INSERT INTO previous_projects SET ?', project, (err) => {
                // if(err) throw err;
                // console.log(results); return
                    if (err) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                        throw err;
                    } else{
                        //console.log(newUser)
                        res.end(JSON.stringify([{message:'Project registered successfully!'}]));
                          
                    }
                    
              })
        }

    },
    // createNewGig
    //  gig_title main_category sub_category
    
    createNewGig:(req,res)=> {
        // console.log(req.body) ;return;
        const {gig_title,main_category,sub_category} = req.body;
        let errors = [];
        if(!gig_title || !main_category || !sub_category){
            errors.push({message:'Fill all details'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('SELECT * from users where ?', {id: req.user}, function(err, rows)   {
                if(err) throw err;
            let gig_id = 'GIG'+lib.genRandomNo();
            // console.log(project_id); return;
            let gig_details = {
                unique_id:gig_id,
                title:gig_title,
                main_category:main_category,
                sub_category:sub_category,
                email:rows[0].email,
            }
            // console.log(gig_details); return;
            
            mySqlQuery.query('INSERT INTO gigs SET ?', gig_details, (err) => {
                // if(err) throw err;
                // console.log(results); return
                    if (err) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                        throw err;
                    } else{
                        //console.log(newUser)
                        res.end(JSON.stringify([{message:'Gig created successfully\n Proceed to edit Gig to add cover photo for this Gig!'}]));
                          
                    }
                    
              })
    
    
            });

            
        }

    },
    gigGetSubCategory:(req,res)=> {
        // console.log(req.body) ;return;
        const {gigMainCategory} = req.body;
        // console.log(gigMainCategory) ;
        let errors = [];
        if(!gigMainCategory){
            errors.push({message:'Select a Category'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{

            mySqlQuery.query('SELECT * from sub_category where ?', {linked_to: gigMainCategory}, function(err, rows)   {
                if(err) throw err;
              let sub_category_array = [];
              for (let i = 0; i < rows.length; i++) {
                  sub_category_array.push([rows[i].title,rows[i].unique_id ]);
                  
              }
                        if (err) {
                            res.end(JSON.stringify([{message:'Database Error'}]));
                            throw err;
                        } else{
                            //console.log(newUser)
                            res.end(JSON.stringify(sub_category_array));
                              
                        }
            });
        }

    },
    // reviewThisSeller
    
    reviewThisSeller:(req,res)=> {
        // console.log(req.body) ;return;
        const {review,seller_id,reviewer_id} = req.body;
        let errors = [];
        if(!review || !seller_id || !reviewer_id){
            errors.push({message:'Fill all details'});
        }
        //console.log(errors)
        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('SELECT * from reviews WHERE reviewer_id = ? AND seller_id = ?', [reviewer_id,seller_id], (err, rows) =>  {
                if(err) throw err;
                // console.log(rows)
                if (rows.length == 0) {
                    let review_id = 'REVIEW'+lib.genRandomNo();
                    let review_details = {
                        unique_id:review_id,
                        reviewer_id:reviewer_id,
                        seller_id:seller_id,
                        review:review,
                        date_created:Date.now(),
                    }
                    
                    mySqlQuery.query('INSERT INTO reviews SET ?', review_details, (err) => {
                        if(err) throw err;
                        // console.log(results); return
                            if (err) {
                                res.end(JSON.stringify([{message:'Database Error'}]));
                                throw err;
                            } else{
                                res.end(JSON.stringify([{message:'Review Submitted. Awaiting confirmation!'}]));
                                
                            }
                    })
                    
                } else {
                    res.end(JSON.stringify([{message:'You\'ve already reviewed this seller'}]));
                }
            
    
    
            });

            
        }

    },


    uploadProfileImage :(req,res) => {
        var userId = req.user;
        // console.log(req.file); return;
        upload_profile_img(req,res,(err )=> {
            // console.log(req.body);return;
            if(err){
                let myErr = err;
                mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                    if(err) throw err;
                    res.render('default/userProfile', {
                        layout:'layout/index',
                        userId:userId,
                        user:rows,
                        error:myErr.message,
                        page:"userProfile",
                    });
                });

            }else{

                mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                    if(err) throw err;
                    // console.log(rows[0].profile_image); 
                    if(rows[0].profile_image === 'avatar.jpg'){
                        mySqlQuery.query('UPDATE users set profile_image =?  WHERE id = ?',[req.file.filename,req.user], (err, results) => {
                                if (err) {
                                    let myErr = {message:'Database Error!'};
                                    res.render('default/userProfile', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                    });
                                    throw err;
                                } else{
                                    let myErr = {message:'File Uploaded!'};
                                    res.render('default/userProfile', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                        page:"userProfile",
                                    });
                                      
                                }
                                
                          })
    
                    }else{
                        fs.unlink('./public/default/uploads/profile-images/'+rows[0].profile_image,(err )=> {
                            if (err){ throw err}
                            // console.log('file deleted')
                            mySqlQuery.query('UPDATE users set profile_image =?  WHERE id = ?',[req.file.filename,req.user], (err, results) => {
                                if (err) {
                                    let myErr = {message:'Database Error!'};
                                    res.render('default/userProfile', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                        page:"userProfile",
                                    });
                                } else{
                                    let myErr = {message:'File Uploaded'};
                                    res.render('default/userProfile', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                        page:"userProfile",
                                    });
                                }
                          })
                        });
                    }
                });

            }
        })
    },

    deleteThisGig : (req,res) => {
        // console.log(req.body);return;
        const { gig_id } = req.body;
        let errors = [];
        if(!gig_id ){
            errors.push({message:'Front End Error'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('DELETE FROM gigs WHERE unique_id = ?',[ gig_id], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        res.end(JSON.stringify([{message:'This gig has been deleted!'}]));
                    }
                })
        }
    },
    // uploadGigCoverImage
    uploadGigCoverImage :(req,res) => {
        var userId = req.user;
        let gig_id = req.params.id;
        // console.log(req.body); return;
        let main_category;
        mySqlQuery.query('SELECT * from main_category ', function(err, rows)   {
            if(err) throw err;
            // console.log(rows);
             main_category = rows;

            // });

        upload_gig_cover_img(req,res,(err )=> {
            if(err){

                let myErr = err;
            mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                if(err) throw err;
                 
              let userDetail = rows;
              mySqlQuery.query('SELECT * from gigs where ?', {unique_id: gig_id}, function(err, rows)   {
                let userGig = rows;
                if(err) throw err;
                mySqlQuery.query('SELECT * from main_category ', function(err, rows)   {
                    if(err) throw err;
                    // console.log(rows);
                    res.render('default/edit-gig', {
                        layout:'layout/index',
                        userId:userId,
                        user:userDetail,
                        gig:userGig,
                        allGigs:rows,
                        error:myErr.message,
                        page:"edit-gig",
                    });
    
    
                    });


                });
            });
            }else{
                mySqlQuery.query('SELECT * from users where id = ?',[userId], function(err, rows)   {
                    let user_details = rows;
                mySqlQuery.query('SELECT * from gigs where ?', {unique_id: gig_id}, function(err, rows)   {
                    if(err) throw err;
                    // console.log(rows[0].profile_image); 
                    if(rows[0].cover_image === 'img-05.png'){
                        mySqlQuery.query('UPDATE gigs set cover_image =?  WHERE unique_id = ?',[req.file.filename,gig_id], (err, results) => {
                                if (err) {
                                    let myErr = {message:'Database Error!'};
                                    res.render('default/edit-gig', {
                                        layout:'layout/index',
                                        user:user_details,
                                        gig:rows,
                                        allGigs:main_category,
                                        error:myErr.message,
                                        page:"edit-gig",
                                    });
                                    throw err;
                                } else{
                                    let myErr = {message:'File Uploaded!'};
                                    res.render('default/edit-gig', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:user_details,
                                        gig:rows,
                                        allGigs:main_category,
                                        error:myErr.message,
                                        page:"edit-gig",
                                    });
                                      
                                }
                                
                          })
    
                    }else{
                        fs.unlink('./public/default/uploads/gig-cover/'+rows[0].cover_image,(err )=> {
                            if (err){ throw err}
                            // console.log('file deleted')
                            mySqlQuery.query('UPDATE gigs set cover_image =?  WHERE unique_id = ?',[req.file.filename,gig_id], (err, results) => {
                                if (err) {
                                    // cb({message:'Database Error!'});
                                    // throw err;
                                    let myErr = {message:'Database Error!'};
                                    res.render('default/edit-gig', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:user_details,
                                        gig:rows,
                                        allGigs:main_category,
                                        error:myErr.message,
                                        page:"edit-gig",
                                    });
                                } else{
                                    // return cb(null,true);
                                    let myErr = {message:'File Uploaded!'};
                                    res.render('default/edit-gig', {
                                        layout:'layout/index',
                                        userId:userId,
                                        user:user_details,
                                        gig:rows,
                                        allGigs:main_category,
                                        error:myErr.message,
                                        page:"edit-gig",
                                    });
                                }
                          })
                        });
                    }
                });
            });

            }
        })
    });
    },


}