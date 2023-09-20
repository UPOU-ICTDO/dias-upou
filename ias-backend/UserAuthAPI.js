/*
 * UserAuthAPI.js
 * This file will contain all the methods for User Authentication
*/

/*
    Sources:
    [1]: Google Chrome Devlopers(2016). Google Sign-In for Websites: Authentication with backends.
         https://www.youtube.com/watch?v=j_31hJtWjlw.

*/

const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');
const constants = require('./constants.js');
const editor = mongoose.model('editor', {
    email: { type: String, required: true, unique: true },
    privileges: { type: String, required: true },
    office: {type: String, required: true}
});


//Validates a google jwt
exports.validate = async (req,res) => {
    
    //Checks if an auth token is present
    if(req.headers.authorization===undefined){
        res.status(401);
        res.send("Unauthorized");
        return;
    }
    
    //Checks if auth token has all the valid fields
    var token = jwt_decode(req.headers.authorization);
    if(token.iss===undefined   ||
       token.aud===undefined   ||
       token.email===undefined ||
       token.exp===undefined ||
       token.hd===undefined
       ){
        res.status(401);
        res.send("Unauthorized");
        return;        
    }
    var currentTime = (Math.floor(Date.now() / 1000));
    //Checks if auth token is valid
    if((token.iss==="https://accounts.google.com"||token.iss==="accounts.google.com") &&
        token.aud=== constants.clientid &&
        token.exp>(currentTime-3600) &&
        (token.hd==="up.edu.ph"||token.hd==="upou.edu.ph")){


            //Looks up on DB if user is indeed on the table
            var checkUser = await editor.findOne({email:token.email});
            if(checkUser===null){
                res.status(401);
                res.send("Unauthorized");
                return(0);                 
            }
            
            res.send({"success":true,"privilege":checkUser.privileges});        
    }else{
        //Token might be from invalid origin or expired
        res.status(403);
        res.send("Forbidden");
        return;           
    }

}

/*  
    Function: checkAuth
    Checks the validity of any request done on backend
    Checks the validity of bearer token
    Returns the status code of the request
    
    Parameters:
        authToken (Bearer JWT)-> bearer token of any request
        adminOnly (bool) -> for requests that are for admins only (e.g. EditorAPI requests)

*/
exports.checkAuth = async (authToken,adminOnly) => {
    
    //Checks if an auth token is present
    if(authToken===undefined) return(401);
    

    //Checks if auth token has all the valid fields
    var token = jwt_decode(authToken);
    if(token.iss===undefined   ||
       token.aud===undefined   ||
       token.email===undefined ||
       token.exp===undefined ||
       token.hd===undefined
        )return(401);

    var currentTime = (Math.floor(Date.now() / 1000));
    
    //Checks if auth token is valid
    if((token.iss==="https://accounts.google.com"||token.iss==="accounts.google.com") &&
        token.aud=== constants.clientid &&
        token.exp>(currentTime-3600) &&
        (token.hd==="up.edu.ph"||token.hd==="upou.edu.ph")){

            //Looks up on DB if user is indeed on the table
            var user = await editor.findOne({email:token.email});
            if(user===null)return(403);
            
            if(adminOnly){
                if(user.privileges==="Admin")return(200);
                else return(403);
            }
            return(200);        
    }else return(403);

}