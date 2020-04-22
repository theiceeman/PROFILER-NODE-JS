const bcrypt = require('bcryptjs');
const express = require('express');
const mySqlQuery = require('../../mysql');
const external_lib = require('../../config/lib');
const multer = require('multer');
const fs = require('fs');
const path = require("path");


//MULTER FILE UPLOAD CONFIG
const storage_category_cover = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/default/uploads/category-cover')
    },
    filename: (req, file, cb) => {
        // console.log('diskStorage');
      cb(null, 'CATEGORYCOVER-'+ external_lib.genRandomNo() + Date.now() + path.extname(file.originalname));
    }
});
const upload_category_cover = multer({
    storage: storage_category_cover,
    limits:{fileSize:1000000},
    fileFilter:function (req,file,cb) {
        // console.log(req.file)
        external_lib.checkFile(req,file, cb);
    }
}).single('uploadedCategory');



class lib {

    

     index(req,res) {
    
        res.render('admin/index.ejs',{layout:'layout/admin_layout',page:'Admin-Login'});
        
    }

    async adminDashboard(req,res){
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId})
            // console.log(admin_details)
            res.render('admin/adminDashboard', {
                layout:'layout/admin_layout',
                page:'Admin-Dashboard',
                adminDetails:admin_details,
            });

        }else{
            res.redirect('/');
        }
    }


    async viewUser(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});
            
            let all_user = await external_lib.selectQuery('SELECT * from users ','all_rows',[])
            // console.log(admin_details)
            res.render('admin/view_user', {
                layout:'layout/admin_layout',
                page:'All-User',
                adminDetails:admin_details,
                allUser:all_user,
            });

        }else{
            res.redirect('/');
        }
    }
         

     async viewGigs(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId})
            let all_gigs = await external_lib.selectQuery('SELECT * from gigs','all_rows',[])
            let main_cat = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{unique_id:gig_details[0].main_category});

            
            // console.log(admin_details)
            res.render('admin/view_gigs', {
                layout:'layout/admin_layout',
                page:'All-Gigs',
                adminDetails:admin_details,
                gigs:all_gigs,
            });

        }else{
            res.redirect('/');
        }
    }


    async createCategory(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId})
            // console.log(admin_details)
            res.render('admin/createcategory', {
                layout:'layout/admin_layout',
                page:'Create-Category',
                adminDetails:admin_details,
            });

        }else{
            res.redirect('/');
        }
    }


    async subCategory(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

            let main_categories = await external_lib.selectQuery('SELECT * from main_category','all_rows',[]);
            // console.log(main_categories)
            res.render('admin/subcategory', {
                layout:'layout/admin_layout',
                page:'Create-Sub-Category',
                adminDetails:admin_details,
                main_cat:main_categories,
            });

        }else{
            res.redirect('/');
        }
    }


    async viewCategory(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

            let main_categories = await external_lib.selectQuery('SELECT * from main_category ','all_rows',[]);
            // console.log(admin_details)
            res.render('admin/view_category', {
                layout:'layout/admin_layout',
                page:'All-Category',
                adminDetails:admin_details,
                main_cat:main_categories,
            });

        }else{
            res.redirect('/');
        }
    }


    async chat(req,res) {
        let adminId = req.user;
        let chat_email = req.params.id; 

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

            let user_details = await external_lib.selectQuery('SELECT * from users where ? ','with_params',{email:chat_email});

            let conv_details = await external_lib.selectQuery('SELECT * from admin_support where ? ','with_params',{user_email:chat_email});
            // console.log(admin_details)
            res.render('admin/chat', {
                layout:'layout/admin_layout',
                page:'Chat',
                adminDetails:admin_details,
                userChat:user_details,
                convDetails:conv_details,
                // main_cat:main_categories,
            });

        }else{
            res.redirect('/');
        }
    }


    async userSupport(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

            let all_support_msgs = await external_lib.selectQuery('SELECT * from admin_support_messages WHERE sender != ? AND sender != ?','with_params',['admin',admin_details[0].email]);
            all_support_msgs.reverse();
            // console.log(all_support_msgs);
            let unread_support = [], unread_support_id = [];
            let xt_all_support = [], xt_all_support_id = [];
            // console.log(unread_support);


            for (let i = 0; i < all_support_msgs.length ; i++) {
                if(all_support_msgs[i].read_status == 'unread' ){
                    if(unread_support.length > 0){
                        let chk_exists = unread_support_id.includes(all_support_msgs[i].conversation_id);
                        if(chk_exists == true){

                        }else{
                            let user_details = await external_lib.selectQuery('SELECT * from users where ?','with_params',{email:all_support_msgs[i].sender});
                            unread_support.push({
                                fullname: user_details[0].firstName+user_details[0].lastName,
                                profileImage:user_details[0].profile_image,
                                msg:all_support_msgs[i].message,
                                email:user_details[0].email,
                            });
                            unread_support_id.push(all_support_msgs[i].conversation_id);
                        }
                    }else{
                        let user_details = await external_lib.selectQuery('SELECT * from users where ?','with_params',{email:all_support_msgs[i].sender});
                        // console.log(user_details);
                            unread_support.push({
                                fullname: user_details[0].firstName+user_details[0].lastName,
                                profileImage:user_details[0].profile_image,
                                msg:all_support_msgs[i].message,
                                email:user_details[0].email,
                            });
                            unread_support_id.push(all_support_msgs[i].conversation_id);

                    }
                }

            }
            // console.log(all_support_msgs)
            for (let v = 0; v < all_support_msgs.length ; v++) {
                // if(all_support_msgs[i].read_status == 'unread' ){
                    if(xt_all_support.length > 0){
                        let chk_exists = xt_all_support_id.includes(all_support_msgs[v].conversation_id);
                        if(chk_exists == true){

                        }else{
                            let user_details = await external_lib.selectQuery('SELECT * from users where ?','with_params',{email:all_support_msgs[v].sender});
                            xt_all_support.push({
                                fullname: user_details[0].firstName+user_details[0].lastName,
                                profileImage:user_details[0].profile_image,
                                msg:all_support_msgs[v].message,
                                email:user_details[0].email,
                            });
                            xt_all_support_id.push(all_support_msgs[v].conversation_id);
                        }
                    }else{
                        let user_details = await external_lib.selectQuery('SELECT * from users where ?','with_params',{email:all_support_msgs[v].sender});
                            xt_all_support.push({
                                fullname: user_details[0].firstName+user_details[0].lastName,
                                profileImage:user_details[0].profile_image,
                                msg:all_support_msgs[v].message,
                                email:user_details[0].email,
                            });
                            xt_all_support_id.push(all_support_msgs[v].conversation_id);

                    }
                // }

            }


            // console.log(unread_support);
            // console.log(xt_all_support);
            res.render('admin/admin_user_support', {
                layout:'layout/admin_layout',
                page:'User-Support',
                adminDetails:admin_details,
                unreadSupport:unread_support,
                allSupport:xt_all_support,
            });

        }else{
            res.redirect('/');
        }
    }


    async createAdmin(req,res) {
        let adminId = req.user;

        if(adminId){

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

            let all_admins = await external_lib.selectQuery('SELECT * from admin_tb ','all_rows',[]);

            // console.log(admin_details)
            res.render('admin/create_admin', {
                layout:'layout/admin_layout',
                page:'Other-Administrator',
                adminDetails:admin_details,
                allAdmins:all_admins,
            });

        }else{
            res.redirect('/');
        }
    }


    async editUser(req,res) {
        let adminId = req.user;
        let theUserId = req.params.id;

        if(adminId){
            
            let the_user_details = await external_lib.selectQuery('SELECT * from users where ?','with_params',{email:theUserId})

            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId})
            // console.log(admin_details)
            res.render('admin/edit_user', {
                layout:'layout/admin_layout',
                page:'Edit-This-User',
                adminDetails:admin_details,
                userDetails:the_user_details,
            });

        }else{
            res.redirect('/');
        }
    }

    async editGig(req,res) {
        let adminId = req.user;
        let theGigId = req.params.id;

        if(adminId){
            
            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

            let gig_details = await external_lib.selectQuery('SELECT * from gigs where ?','with_params',{unique_id:theGigId});
            let main_cat = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{unique_id:gig_details[0].main_category});

            let sub_cat = await external_lib.selectQuery('SELECT * from sub_category where ?','with_params',{unique_id:gig_details[0].sub_category});
            let cat_title = [main_cat[0],sub_cat[0]];
            // console.log(cat_title);
            // return;
            res.render('admin/edit_gig', {
                layout:'layout/admin_layout',
                page:'Edit-This-Gig',
                adminDetails:admin_details,
                gigDetails:gig_details,
                catTitle:cat_title,
            });

        }else{
            res.redirect('/');
        }
    }

    async editCategory(req,res) {
        let adminId = req.user;
        let theCatId = req.params.id;

        if(adminId){
            
            let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId})

            let cat_details = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{unique_id:theCatId});
            // console.log(cat_details)
            res.render('admin/edit_category', {
                layout:'layout/admin_layout',
                page:'Edit-This-Category',
                adminDetails:admin_details,
                catDetails:cat_details,
                error:null,
            });

        }else{
            res.redirect('/');
        }
    }

    async createNewCategory(req,res) {
        
        const {Category_name, Category_description } = req.body;
        let errors = [];
        if(!Category_name || !Category_description ){
            errors.push({message:'Fill all details for this catgeory'});
        }
        let similar_category = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{title:Category_name});

        if (similar_category.length > 0) {
            errors.push({message:'A category has similar name'});            
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{

            let category_id = await 'CATEGORY'+external_lib.genRandomNo();
            const insert = {
                unique_id:category_id,
                title:Category_name,
                description:Category_description
                }
                // console.log(insert);return;
            mySqlQuery.query('INSERT INTO main_category SET ?',insert, (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        //console.log(newUser)
                            res.end(JSON.stringify([{message:'Category Created Successfully!'}]));
                          
                    }
                    
              })
        }
    }

    async createSubCategory(req,res) {
        
        const {main_category, sub_cat_title } = req.body;
        // console.log(req.body); return;
        let errors = [];
        if(!main_category || !sub_cat_title ){
            errors.push({message:'Fill all details for this Sub-category'});
        }
        let similar_sub_category = await external_lib.selectQuery('SELECT * from sub_category where linked_to = ? AND title = ?','with_params',[main_category,sub_cat_title]);

        if (similar_sub_category.length > 0) {
            errors.push({message:'A Sub-category has similar name'});            
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{

            let sub_category_id = await 'SUBCATEGORY'+external_lib.genRandomNo();
            const insert = {
                unique_id:sub_category_id,
                title:sub_cat_title,
                linked_to:main_category,
                }
                // console.log(insert);return;
            mySqlQuery.query('INSERT INTO sub_category SET ?',insert, (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        //console.log(newUser)
                            res.end(JSON.stringify([{message:'Sub-Category Created Successfully!'}]));
                          
                    }
                    
              })
        }
    }

    

    async updateSubCategory(req,res) {
        // console.log(req.body); return;
        const {sub_cat_title_modal, sub_cat_id } = req.body;
        let errors = [];
        if(!sub_cat_title_modal || !sub_cat_id ){
            errors.push({message:'Fill all details for this sub-catgeory'});
        }
        let similar_category = await external_lib.selectQuery('SELECT * from sub_category where ?','with_params',{title:sub_cat_title_modal});

        if (similar_category.length > 0) {
            errors.push({message:'A sub-category has similar name'});            
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
                // console.log(insert);return;
            mySqlQuery.query('UPDATE sub_category SET title = ? Where unique_id = ?',[sub_cat_title_modal, sub_cat_id], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        //console.log(newUser)
                            res.end(JSON.stringify([{message:'Sub-Category Updated Successfully!'}]));
                          
                    }
                    
              })
        }
    }

    

    async updateMainCategory(req,res) {
        // console.log(req.body); return;
        const {cat_new_title, cat_new_desc,cat_id } = req.body;
        let errors = [];
        if(!cat_new_title || !cat_new_desc || !cat_id ){
            errors.push({message:'Fill all details for this sub-catgeory'});
        }
        let similar_category = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{title:cat_new_title});

        if (similar_category.length > 0) {
            errors.push({message:'A sub-category has similar name'});            
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
                // console.log(insert);return;
            mySqlQuery.query('UPDATE main_category SET title = ? Where unique_id = ?',[cat_new_title, cat_id], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        //console.log(newUser)
                            res.end(JSON.stringify([{message:'Main-Category Updated Successfully!'}]));
                          
                    }
                    
              })
        }
    }

    async uploadCategoryPhoto(req,res) {
        // console.log(req.user);
        let adminId = req.user;
        // let category_id = req.body.category_id; return;

        upload_category_cover(req,res,async (err )=> {
            let category_id = req.body.category_id;
            // console.log(req.file.filename);
            // if(req.file.filename){

            
            if(err){
                
                let myErr = err;
                let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

                let cat_details = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{unique_id:category_id});
                console.log(myErr);

                res.render('admin/edit_category', {
                    layout:'layout/admin_layout',
                    adminDetails:admin_details,
                    catDetails:cat_details,
                    error:myErr.message,
                    page:"Edit-This-Category",
                });


            }else{


                let admin_details = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{id:adminId});

                let cat_details = await external_lib.selectQuery('SELECT * from main_category where ?','with_params',{unique_id:category_id});
                if (err) throw err;

                if(cat_details[0].cover_photo === 'avatar-category.jpg'){
                    mySqlQuery.query('UPDATE main_category set cover_photo =?  WHERE unique_id = ?',[req.file.filename,category_id], (err, results) => {
                        if (err) {
                            let myErr = {message:'Database Error!'};
                            res.render('admin/edit_category', {
                                layout:'layout/admin_layout',
                                adminDetails:admin_details,
                                catDetails:cat_details,
                                error:myErr.message,
                                page:"Edit-This-Category",
                            });
                            throw err;
                        } else{
                            let myErr = {message:'File Uploaded!'};
                            res.render('admin/edit_category', {
                                layout:'layout/admin_layout',
                                adminDetails:admin_details,
                                userId:adminId,
                                catDetails:cat_details,
                                error:myErr.message,
                                page:"Edit-This-Category",
                            });
                              
                        }
                        
                  })

                }else{
                    fs.unlink('./public/default/uploads/category-cover/'+cat_details[0].cover_photo,(err )=> {
                        if (err){ throw err}
                        // console.log('file deleted')
                        mySqlQuery.query('UPDATE main_category set cover_photo =?  WHERE unique_id = ?',[req.file.filename,category_id], (err, results) => {
                            if (err) {
                                let myErr = {message:'Database Error!'};
                                res.render('admin/edit_category', {
                                    layout:'layout/admin_layout',
                                    adminDetails:admin_details,
                                    catDetails:cat_details,
                                    error:myErr.message,
                                    page:"Edit-This-Category",
                                });
                                throw err;
                            } else{
                                let myErr = {message:'File Uploaded!'};
                                res.render('admin/edit_category', {
                                    layout:'layout/admin_layout',
                                    adminDetails:admin_details,
                                    userId:adminId,
                                    catDetails:cat_details,
                                    error:myErr.message,
                                    page:"Edit-This-Category",
                                });
                                  
                            }
                      })
                    });

                }


            }
        
        })
    }

    async createNewAdmin(req,res) {
        
        const {firstName, email,password, c_password } = req.body;
        let errors = [];
        if(!firstName || !email || !password || !c_password){
            errors.push({message:'Fill all details for this Admin'});
        }
        if(password !== c_password){
            errors.push({message:'Confirm Password again'});
        }
        let similar_admin = await external_lib.selectQuery('SELECT * from admin_tb where ?','with_params',{email:email});
        let similar_email = await external_lib.selectQuery('SELECT * from users where ?','with_params',{email:email});
        

        if (similar_admin.length > 0 || similar_email.length > 0) {
            errors.push({message:'this email is not available'});            
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{

            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(password, salt, (err,hash)=> {
                    // newUser.password = hash;

                    const insert = {
                        email:email,
                        password:hash,
                        firstname:firstName,
                        date_created:Date.now(),
                        }
                        // console.log(insert);return;
                    mySqlQuery.query('INSERT INTO admin_tb SET ?',insert, (err, results) => {
                        if(err) throw err;
                            if (results.length > 0) {
                                
                                res.end(JSON.stringify([{message:'Database Error'}]));
                            } else{
                                //console.log(newUser)
                                    res.end(JSON.stringify([{message:'Admin Created Successfully!'}]));
                                  
                            }
                            
                      })
                    
                })
            })
            
        }
    }

    async blockThisUser(req,res) {
        
        const { user_email } = req.body;
        let errors = [];
        if(!user_email ){
            errors.push({message:'Front End Error'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('UPDATE users SET blocked = ? Where email = ?',['0', user_email], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        res.end(JSON.stringify([{message:'This user has been restricted access!'}]));
                    }
                })
        }
    }

    async unblockThisUser(req,res) {
        
        const { user_email } = req.body;
        let errors = [];
        if(!user_email ){
            errors.push({message:'Front End Error'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('UPDATE users SET blocked = ? Where email = ?',['1', user_email], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        res.end(JSON.stringify([{message:'This user has been granted access!'}]));
                    }
                })
        }
    }

    async deleteThisUser(req,res) {
        
        const { user_email } = req.body;
        let errors = [];
        if(!user_email ){
            errors.push({message:'Front End Error'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('DELETE FROM users WHERE email = ?',[ user_email], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        res.end(JSON.stringify([{message:'This account has been deleted!'}]));
                    }
                })
        }
    }

    

    async updateThisUser(req,res) {
        
        const {first_name, last_name,state, gender,address, phone,email } = req.body;
        let errors = [];
        if(!first_name || !last_name || !state || !gender || !address || !phone || !email  ){
            errors.push({message:'Fill all details for this User'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            
            const insert = {
                firstName:first_name,
                lastName:last_name,
                sex:gender,
                state:state,
                address:address,
                number:phone,
            }
                // console.log(insert);return;
            
                mySqlQuery.query('UPDATE users SET ? WHERE email = ?',[insert,email], (err, results) => {
                    if(err) throw err;
                        if (results.length > 0) {
                            
                            res.end(JSON.stringify([{message:'Database Error'}]));
                        } else{
                            //console.log(newUser)
                                res.end(JSON.stringify([{message:'This User\'s Personal Details Updated successfully!'}]));
                              
                        }
                        
                  })
        }
    }

    async blockThisGig(req,res) {
        // console.log(req.body);return;
        const { gig_id } = req.body;
        let errors = [];
        if(!gig_id ){
            errors.push({message:'Front End Error'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('UPDATE gigs SET blocked = ? Where unique_id = ?',['0', gig_id], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        res.end(JSON.stringify([{message:'This gig is currently Inactive!'}]));
                    }
                })
        }
    }

    async unblockThisGig(req,res) {
        
        const { gig_id } = req.body;
        let errors = [];
        if(!gig_id ){
            errors.push({message:'Front End Error'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            mySqlQuery.query('UPDATE gigs SET blocked = ? Where unique_id = ?',['1', gig_id], (err, results) => {
                if(err) throw err;
                    if (results.length > 0) {
                        res.end(JSON.stringify([{message:'Database Error'}]));
                    } else{
                        res.end(JSON.stringify([{message:'This gig is Active!'}]));
                    }
                })
        }
    }

    async deleteThisGig(req,res) {
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
    }

    

    async updateThisGig(req,res) {
        
        const {gig_id, title} = req.body;
        let errors = [];
        if(!gig_id || !title ){
            errors.push({message:'Fill all details for this gig'});
        }

        if(errors.length > 0){
           res.end(JSON.stringify(errors));
        }else{
            
                mySqlQuery.query('UPDATE gigs SET title = ? Where unique_id = ?',[title, gig_id], (err, results) => {
                    if(err) throw err;
                        if (results.length > 0) {
                            
                            res.end(JSON.stringify([{message:'Database Error'}]));
                        } else{
                            //console.log(newUser)
                                res.end(JSON.stringify([{message:'This gig title Updated successfully!'}]));
                              
                        }
                        
                  })
        }
    }



}

let theLib = new lib();
module.exports  = theLib;