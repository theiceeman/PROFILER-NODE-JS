const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const config = require('./config/config');
const session = require('express-session');
const passport = require('passport');
const mySqlQuery = require('./mysql');
// const methodOverride = require('method-override');
// const Busboy = require('busboy');
// const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');


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




//SERVER CONFIGURATION
const server = app.listen(config.PORT, ()=> {
    console.log(`App server listening on Port: ${config.PORT}`)
})

const io = require('socket.io')(server);
const connectedSockets = {};


io.on('connection', (socket) => {
    // console.log(socket);

    socket.on('notification', (notificationId) => {
        // console.log(notificationId);
        mySqlQuery.query('SELECT * from notifications where ?', {uniqueId: notificationId}, function(err, rows)   {
            if(err) throw err;
            // console.log(rows);
            socket.emit('notification-detail', rows);
        
        });
    })


})

