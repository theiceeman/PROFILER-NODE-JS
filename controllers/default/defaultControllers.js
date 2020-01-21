// const User = require('../../models/userModels');
const bcrypt = require('bcryptjs');
const express = require('express');
const mySqlQuery = require('../../mysql');
const lib = require('../../config/lib');

const fs = require('fs');
// const Busboy = require('busboy');

const path = require("path");
const multer = require('multer');



//MULTER FILE UPLOAD CONFIG
const storage = multer.diskStorage({
    

    destination: (req, file, cb) => {
      cb(null, 'public/uploads/profile-images')
    },
    filename: (req, file, cb) => {
        // console.log('diskStorage');
      cb(null, 'ProfileImage-'+ lib.genRandomNo() + Date.now() + path.extname(file.originalname))
    }

    

});
const upload = multer({
    storage: storage,
    limits:{fileSize:1000000},
    fileFilter:function (req,file,cb) {
        // console.log(req.file)
        lib.checkFile(req,file, cb);
    }

}).single('uploadedFile');





module.exports = {
    index: (req,res) => {
        // if(req.user){
        //     let userId = req.user;
        //     res.render('default/home', {userId:userId});
        // }
        
        // //res.render('default/dashboardProfile', {userId:userId});
        // res.render('default/home', {userId:''});

        let userId = req.user;
        
        if(userId){
            console.log(userId);
            mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                if(err) throw err;
                let userDetail = {
                    
                };
                res.render('default/home', {
                    userId:userId,
                    user:rows
                });

            });
        }else{
            res.render('default/home', {
                userId:'',
                user:'',
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
            userId:userId,
            user:rows
        });

        });
        }else{
            res.render('default/aboutUs', {
                userId:'',
                user:'',
            });
        }
        
    },

    register: (req,res) => {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
        
          console.log('Data received from Db:\n');
          console.log(rows);

          let userDetail = {
            
        };
        res.render('default/register', {
            userId:userId,
            user:rows
        });


        });
        }else{
            res.render('default/register', {
                userId:'',
                user:'',
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
                            date_joined:Date.now(),
                        };
                        //console.log(newUser)
                        bcrypt.genSalt(10, (err,salt) => {
                            bcrypt.hash(newUser.password, salt, (err,hash)=> {
                                newUser.password = hash;
                                //newUser.save()
                                console.log('Insertion');
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
            userId:userId,
            user:rows
        });

        });
        }else{
            res.render('default/how_it_works', {
                userId:'',
                user:'',
            });

        }
    },

    CategoryProfile: (req,res)=> {
        // res.render('default/category')
        
        let userId = req.user;
        if(userId){
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
          let userDetail = {
            
        };
        res.render('default/category', {
            userId:userId,
            user:rows
        });

        });
        }else{
            res.render('default/category', {
                userId:'',
                user:'',
            });

        }
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
            userId:userId,
            user:rows
        });

        });
        }else{
            res.render('default/main_category', {
                userId:'',
                user:'',
            });

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
            userId:userId,
            user:rows
        });

        });
        }else{
            res.render('default/privacy_condition', {
                userId:'',
                user:'',
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
            userId:userId,
            user:rows
        });

        });
        }else{
            res.render('default/user_dashboard', {
                userId:'',
                user:'',
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
                userId:userId,
                user:rows
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
            userId:userId,
            user:rows,
            error:null,
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
                
            res.render('default/notifications', {
                userId:userId,
                user:userRow,
                notifications:rows,
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
        
        //   console.log('Data received from Db:\n');
        //   console.log(rows);

          let userDetail = {
            
        };
        res.render('default/createGig', {
            userId:userId,
            user:rows
        });


        });
        }

        // res.render('default/createGig');
    },
    viewGigs:(req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
        
        //   console.log('Data received from Db:\n');
        //   console.log(rows);

          let userDetail = {
            
        };
        res.render('default/view-gigs', {
            userId:userId,
            user:rows
        });


        });
        }

        // res.render('default/view-gigs');
    },
    editGigs:(req,res)=> {
        let userId = req.user;
        if(userId){
            
        mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
            if(err) throw err;
        
        //   console.log('Data received from Db:\n');
        //   console.log(rows);

          let userDetail = {
            
        };
        res.render('default/edit-gig', {
            userId:userId,
            user:rows
        });


        });
        }

        // res.render('default/edit-gig');
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
                email:email,
                address:address,
                number:number,
            }
            mySqlQuery.query('UPDATE users SET ?',insert, (err, results) => {
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
                        res.end(JSON.stringify([{message:'Gig created successfully!'}]));
                          
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
            //   console.log(sub_category_array);
    
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


    uploadProfileImage :(req,res) => {
        var userId = req.user;
        upload(req,res,(err )=> {
            // console.log(userId)
            if(err){
                let myErr = err;
                mySqlQuery.query('SELECT * from users where ?', {id: userId}, function(err, rows)   {
                    if(err) throw err;
                    res.render('default/userProfile', {
                        userId:userId,
                        user:rows,
                        error:myErr.message,
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
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                    });
                                    throw err;
                                } else{
                                    let myErr = {message:'File Uploaded!'};
                                    res.render('default/userProfile', {
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                    });
                                      
                                }
                                
                          })
    
                    }else{
                        fs.unlink('./public/uploads/profile-images/'+rows[0].profile_image,err => {
                            if (err){ throw err}
                            // console.log('file deleted')
                            mySqlQuery.query('UPDATE users set profile_image =?  WHERE id = ?',[req.file.filename,req.user], (err, results) => {
                                if (err) {
                                    // cb({message:'Database Error!'});
                                    // throw err;
                                    let myErr = {message:'Database Error!'};
                                    res.render('default/userProfile', {
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                    });
                                } else{
                                    // return cb(null,true);
                                    let myErr = {message:'File Uploaded'};
                                    res.render('default/userProfile', {
                                        userId:userId,
                                        user:rows,
                                        error:myErr.message,
                                    });
                                }
                          })
                        });
                    }
                });

            }
        })
    },


}