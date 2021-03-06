// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
var listing = require('../../Backend/models/property');
var traveler=require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for owner signup:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
   
    traveler.find({emailaddress:msg.emailaddress,"UserType":"owner"}).then((doc)=>{
        console.log(doc);
        if(doc.length!=0){
            callback(null,[]);
        }else{
            var trav=new traveler({
                UserType:'owner',
                firstName:msg.firstName,
                lastName:msg.lastName,
                emailaddress:msg.emailaddress,
                password:msg.password,
                aboutme:"",
                citycountry:"",
                company:"",
                school:"",
                hometown:"",
                languages:"",
                gender:"",
                profile_image:""

            })
        
            trav.save().then((doc)=>{
                callback(null,doc);
            },(e)=>{
                callback(null,[]);
            })
        }
        
    }).catch((e)=>{
        callback(null,[]);
     // })
    })


    

}

exports.handle_request = handle_request;

