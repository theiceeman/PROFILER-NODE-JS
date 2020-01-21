const  express = require('express');
const router = express.Router();
const mySqlQuery = require('../mysql');
const path = require('path');
const passport = require('passport');

const lib = {
    selectOptions : function(status, options) {
        return options.fn(this).replace(
            new RegExp('value=\"'+status+'\"'),
             '$&selected="selected"');
    },

    isEmpty: function(obj) {
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    },    

    isUserAuthenticated: (req,res,next)=> {
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    },
    genRandomNo:()=> {
        let ini = ['RPC34','RPD32','RPD56','RPE89','RPF87','RPG76','RPH23','RPI78','RPJ54','RPK45','RPL90','RPM43','RPN43','RPO56','RPP67','RPQ78','RPR43','RPS76','RPT34','RPU45','RPV67','RPW78','RPX56','RPY67','RPZ34','RRR09','REA90','REB56','REC54','RED67','REE78','REF54','REG','REH56','REI56','REJ34','REK87','REL56','REM54','REN45','REO43','REP78','REQ67','RER43','RES45','RET34','REU34','REV65','REW56','REX56','REY78','REZ43','RDA65','RDB67','RDC34','RDD23','RDE87',"RAA87","RBH54","RHJ65","RKK45","RWH43","RBB45","RFC67","RGC54","RHC90","RJC43","RKC67","TLC34","TZC54","TXC34","TCC34","TVC67","TBC54","TNC54","TDO56","TDT67","TTT45","TAG54","TAH34","TAS54","TAR45","TAC78","TAT67","TAZ34","TSY54","TSB54","TZX78","TQO65",];

        let rand = ini[Math.floor(Math.random() * ini.length)];

        rand += Math.floor(Math.random() * (10000000 - 1000000)) + 1000000;
        return rand;
    },
    
    checkFile: (req,file, cb) => {
            // console.log(file)
        let fileTypes = /jpeg|jpg|png|gif/;

        let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        let mimeType = fileTypes.test(file.mimetype);

        if(mimeType && extName ) {
            return cb(null,true);
        } else{
            
            cb({message:'Please select a valid file type!'});
        }
        
        
        
      
      },

    


};

module.exports = lib;