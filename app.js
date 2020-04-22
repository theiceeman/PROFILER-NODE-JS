const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const config = require('./config/config');
const session = require('express-session');
const passport = require('passport');
const mySqlQuery = require('./mysql');
const lib = require('./config/lib');


const app = express();

//EXPRESS CONFIGURE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('./public/images'))








//EJS SETUP

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//SETTING UP SESSION
app.use(session({
    secret: config.sessionSecrete,
    saveUninitialized:true,
    resave:true,
})); 

app.use(passport.initialize());
app.use(passport.session());



//ROUTES
const defaultRoutes = require('./routes/default/defaultRoutes');
app.use('/', defaultRoutes);

const adminRoutes = require('./routes/admin/adminRoutes');
app.use('/to-switch/', adminRoutes);




//SERVER CONFIGURATION
const server = app.listen(config.PORT, ()=> {
    console.log(`App server listening on Port: ${config.PORT}`)
})

const io = require('socket.io')(server);
const connectedSockets = {};


io.on('connection', (socket) => {
    // console.log(socket);

    socket.on('join',(data) => {
        socket.join(data.room);

        mySqlQuery.query('SELECT * from conversations where ?', {unique_id: data.room}, function(err, rows)   {
            if(err) throw err;
            //   console.log(rows);
            if(rows.length !== 0){
                connectedSockets[data.room] = socket;
                mySqlQuery.query('SELECT * from messages where ?', {conversation_id: data.room}, function(err, rows)  {
                    if(err) throw err;
                    //   console.log(rows);
                    rows.forEach(chat => {
                        // console.log(chat);
                        socket.emit('prev-chat-message', [chat]);
                    })
                    
                    
                });
            }else{
                console.log('Server error!');
            }
            
        });
        socket.on('chat-message', (msg) => {
            // console.log( msg ); 
            let message = {
                conversation_id:msg.to.room,
                message:msg.msg,
                sender:msg.to.onlineUser,
                reciever:msg.to.reciever,
                time_created:lib.createDate(),
                unique_id:'MSG'+lib.genRandomNo()+''+lib.genRandomNo(),
            };
            mySqlQuery.query('INSERT INTO messages SET ?', message, (err, res) => {
             if(err) throw err;
            //  console.log(res);
             if(res.affectedRows == 1){
                socket.to(msg.to.room).emit('chat-message', message); 

            }else{
                console.log('Database Error');
            }

           }) 
        });

    })
    socket.on('notification', async (notificationId) => {
            // console.log(notificationId);
            let notifications = await lib.selectQuery('SELECT * from notifications where ?','with_params',{uniqueId: notificationId[0]});
            let viewers = notifications[0].viewed_by;
            let viewed_user_arr = viewers.split(',');
            viewed_user_arr.push(notificationId[1]);
            let joined_viewed_user_arr = viewed_user_arr.join(',');
            mySqlQuery.query('UPDATE notifications set viewed_by = ?  WHERE uniqueId = ?', [joined_viewed_user_arr,notificationId[0]], (err, res) => {
                if(err) throw err;
                // console.log(rows);
                socket.emit('notification-detail', notifications);
                
    
            }) 
        
    })

    socket.on('get-sub-categories',async (cat_id)=> {
        let all_sub_categories = await lib.selectQuery('SELECT * from sub_category where linked_to = ?','with_params',[cat_id]);
        // console.log(all_sub_categories);
        socket.emit('return-sub-categories',all_sub_categories);

    })
    
    socket.on('chat-message', (msg) => {
        // console.log( msg ); 
        let message = {
            conversation_id:msg.to.room,
            message:msg.msg,
            sender:msg.to.onlineUser,
            reciever:msg.to.reciever,
            time_created:lib.createDate(),
            unique_id:'MSG'+lib.genRandomNo()+''+lib.genRandomNo(),
        };
        mySqlQuery.query('INSERT INTO messages SET ?', message, (err, res) => {
         if(err) throw err;
        //  console.log(res);
         if(res.affectedRows == 1){
            socket.to(msg.to.room).emit('chat-message', message); 

        }else{
            console.log('Database Error');
        }

       }) 
    });

    

    socket.on('join-support',(data) => {
        socket.join(data.room);

        mySqlQuery.query('SELECT * from admin_support where ?', {conversation_id: data.room}, function(err, rows)   {
            if(err) throw err;
            //   console.log(rows);
            if(rows.length !== 0){
                connectedSockets[data.room] = socket;
                mySqlQuery.query('SELECT * from admin_support_messages where ?', {conversation_id: data.room}, function(err, rows)  {
                    if(err) throw err;
                    //   console.log(rows);
                    rows.forEach(chat => {
                        // console.log(chat);
                        socket.emit('prev-admin-message', [chat]);
                    })
                    
                    
                });
            }else{
                console.log('Server error!');

            }
            
        });
        socket.on('support-message', (msg) => {
            // console.log( msg ); 
            let message = {
                conversation_id:msg.to.room,
                reciever:'admin',
                sender:msg.to.onlineUser,
                message:msg.msg,
                read_status:'unread',
                date_sent:lib.createDate(),
                message_uniq_id:'ADMINSUPPORTMSG'+lib.genRandomNo()+''+lib.genRandomNo(),
            };
            mySqlQuery.query('INSERT INTO admin_support_messages SET ?', message, (err, res) => {
             if(err) throw err;
            //  console.log(res);
             if(res.affectedRows == 1){
                socket.to(msg.to.room).emit('admin-support-message', message); 
                socket.to('adminGeneralSocket').emit('new-message-notify', message.sender); 

            }else{
                console.log('Database Error');
            }

           }) 
        });

    })

    socket.on('join-admin',(data) => {
        socket.join(data.room);

        mySqlQuery.query('SELECT * from admin_support where ?', {conversation_id: data.room}, function(err, rows)   {
            if(err) throw err;
            //   console.log(rows);
            if(rows.length !== 0){
                connectedSockets[data.room] = socket;
                mySqlQuery.query('SELECT * from admin_support_messages where ?', {conversation_id: data.room}, function(err, rows)  {
                    if(err) throw err;
                    //   console.log(rows);
                    rows.forEach(chat => {
                        // console.log(chat);
                        socket.emit('prev-admin-support', [chat]);
                    })
                    
                    
                });
            }else{
                console.log('Server error!');

            }
            
        });
        socket.on('admin-support-message', (msg) => {
            // console.log( msg ); 
            // return;
            let message = {
                conversation_id:msg.to.room,
                sender:msg.to.onlineAdmin,
                reciever:msg.to.reciever,
                message:msg.msg,
                read_status:'unread',
                date_sent:lib.createDate(),
                message_uniq_id:'ADMINSUPPORTMSG'+lib.genRandomNo()+''+lib.genRandomNo(),
            };
            mySqlQuery.query('INSERT INTO admin_support_messages SET ?', message, (err, res) => {
             if(err) throw err;
            //  console.log(res);
             if(res.affectedRows == 1){
                mySqlQuery.query('UPDATE admin_support_messages set read_status = ?  WHERE conversation_id = ?', ['read',msg.to.room], (err, res) => {
                    if(err) throw err;
                    socket.to(msg.to.room).emit('support-message', message); 
                }) 
                

            }else{
                console.log('Database Error');
            }

           }) 
        });

    })

    socket.on('other-admin-view', ()=>{
        socket.join('adminGeneralSocket');
        connectedSockets['adminGeneralSocket'] = socket;
        // console.log(connectedSockets)
    })

    






})

