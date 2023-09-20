/*
 * Inventory API
 * This file will contain all the methods for the Inventory.
*/

const mongoose = require('mongoose');
const userAuth = require('./UserAuthAPI.js');
//const jwt = require('jsonwebtoken');

//Section: Database Schema
//Describes the inventory schema
const inventory = mongoose.model('inventory',{
    deviceName: {type: String, required: true},
    purchaseDate: {type: Number, required: true},
    repletionDate: {type: Number, required: true},
    category: {type: String, required: true},
    currentUser: {type: String, required: true},
    building: {type: String, required: true},
    exactLocation: {type: String, required: true},
    office: {type: String, required: true},
    status: {type: String, required: true},
    notes: String,
    MACAddress: String,
    vendor: String,
    serialNumber: String
});

//Verifies request auth header.
//Filter unauthorized requests
async function verifyAuth(req,res){
     var authStatus = await userAuth.checkAuth(req.headers.authorization,false);
     if(authStatus===401){
        res.status(401);
        res.send("Unauthorized");

     }else if(authStatus===403){
         res.status(403);
         res.send("Forbidden");        
     }
     return(authStatus);
}

//Applies escape character '\' to special characters listed within the function for regex purposes
//Sourced from: https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegex(regex_string){
    return regex_string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

//Adds an item to DB
exports.addItem = async (req,res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;    

    var body = req.body;

    //Return 400 error code if a required field is missing or is empty
    //Each segment of expression will evaluate to true when a 'truthy' value is encountered (not NaN, null, undefined, false, 0,"")
    if(!(body             &&
       body.deviceName    &&
       body.purchaseDate  &&
       body.repletionDate &&
       body.category      &&
       body.currentUser   &&
       body.building      &&
       body.exactLocation &&
       body.office        &&
       body.status)){
        res.status(400);
        res.send('Bad request');
        return(0);
    }
    //convert the strings to unix time
    //Replaces all '/' with '-' in order for date to be parsed properly
    var tempPD = Date.parse(body.purchaseDate.replace(/\//g,'-'));
    var tempRD = Date.parse(body.repletionDate.replace(/\//g,'-'));

    if(tempPD&&tempRD){
        body.purchaseDate = tempPD/1000;
        body.repletionDate = tempRD/1000;
    }else{
       res.status(400);
       res.send('Bad request');
       return(0);       
    }
    
    try{
      //Insert the new item into db
      const newItem = new inventory(req.body);
      newItem.save();
      res.status(200);
      res.send({"success":true});
    }catch(err){
      //Throw 500 error and log error
      res.status(500);
      res.send("Internal server error");
      console.log("Failure in DB insertion has occured.");
    }
}

//Gets the count of items with same status in inventory
exports.status = async (req,res) => {
    /* Payload: 
        None (Add Google Stuff as auth in future) 
        
        Response:
        200: This will return a body with:
            [
                {name: Active, count: int},
                {name: For replacement, count: int},
                {name: Under repair, count: int},
                {name: Archived, count: int},
            ] 
    */

    //Check authorization first before proceeding 
     if((await verifyAuth(req,res))!==200)return;
    
        
    //Derived from: https://stackoverflow.com/questions/52088666/multiple-counts-with-single-query-in-mongodb
    var data = await inventory.aggregate([{
        "$facet":{
            "total": [
                {"$match": {"status":{"$exists":true}}},
                {"$count": "count"}
            ],
            "active":[
                {"$match": {"status":{"$exists":true,"$regex":/Active/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "forReplacement":[
                {"$match": {"status":{"$exists":true,"$regex":/For replacement/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "underRepair":[
                {"$match": {"status":{"$exists":true,"$regex":/Under repair/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "archived":[
                {"$match": {"status":{"$exists":true,"$regex":/Archived/,"$options":"i"}}},
                {"$count":"count"}
            ],            
        }

    }]);

    
    //Load the multifaceted aggregate result into response body
    //If field is undefined, it means that the count for that field is 0
    //Contains the response body content
    var body = [
        {name: "Active", count: data[0].active[0]===undefined?0:data[0].active[0].count},
        {name: "For Replacement", count: data[0].forReplacement[0]===undefined?0:data[0].forReplacement[0].count},
        {name: "Under Repair", count: data[0].underRepair[0]===undefined?0:data[0].underRepair[0].count},
        {name: "Archived", count: data[0].archived[0]===undefined?0:data[0].archived[0].count},       
    ]
    res.status(200);
    res.send(body);
}

//Gets the count of items with same category in inventory
exports.categories = async (req,res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;

    var data = await inventory.aggregate([{
        "$facet":{
            "computers":[
                {"$match": {"category":{"$exists":true,"$regex":/Computers/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "printers":[
                {"$match": {"category":{"$exists":true,"$regex":/Printers/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "scanners":[
                {"$match": {"category":{"$exists":true,"$regex":/Scanners/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "storageDevices":[
                {"$match": {"category":{"$exists":true,"$regex":/StorageDevices/,"$options":"i"}}},
                {"$count":"count"}
            ],
            "networkingDevices":[
                {"$match": {"category":{"$exists":true,"$regex":/NetworkingDevices/,"$options":"i"}}},
                {"$count":"count"}
            ],            
        }

    }]);
    //Contains the response body content
    
    //Load the multifaceted aggregate result into response body
    //If field is undefined, it means that the count for that field is 0
    var body = [
        {name: "Computers", count: data[0].computers[0]===undefined?0:data[0].computers[0].count},
        {name: "Printers", count: data[0].printers[0]===undefined?0:data[0].printers[0].count},
        {name: "Scanners", count: data[0].scanners[0]===undefined?0:data[0].scanners[0].count},
        {name: "Storage Devices", count: data[0].storageDevices[0]===undefined?0:data[0].storageDevices[0].count},
        {name: "Networking Devices", count: data[0].networkingDevices[0]===undefined?0:data[0].networkingDevices[0].count},
    ]


    res.status(200);
    res.send(body);
}

//Gets the items that is set for replacement
exports.notifications = async (req,res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;    

    var currentTime = Date.now();
    //1 year in seconds (60s*60m*24h*365d)
    const oneYear = 31536000;
    
    var forRepletion = await inventory.find({
        status: {$regex: /[^Archived]/, $options: 'i'},
        repletionDate:{$lt: (currentTime/1000+oneYear)}})
        .sort({"repletionDate":1});
    
    res.status(200);
    res.send(forRepletion);

}


//Stores bulk upload into DB
exports.bulkUpload = async (req,res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;

    var items = req.body.length;

    //Preload categories for lookup
    var lookupCategories = {
        workstation : "Computers_Workstation",
        server : "Computers_Server",
        tablet : "Computers_MobileDevices_Tablet",
        phone : "Computers_MobileDevices_Phone",
        laptop : "Computers_MobileDevices_Laptop",
        "networking printer": "Printers_NetworkingPrinter",
        "standalone printer": "Printers_StandalonePrinter",
        scanner: "Scanners",
        nas: "StorageDevices_NAS",
        "external hard drive": "StorageDevices_ExternalHardDrive",
        router: "NetworkingDevices_Router",
        switch: "NetworkingDevices_Switch",
        "wifi router": "NetworkingDevices_WiFiRouter",
        firewall: "NetworkingDevices_Firewall",
    }

    //Filter request if deformed or not 
    for(let i = 0; i<items;i++){
        var body = req.body[i];
        if(!(body &&
            body.deviceName &&
            body.purchaseDate &&
            body.repletionDate &&
            body.category &&
            body.currentUser &&
            body.building &&
            body.exactLocation &&
            body.office &&
            body.status)){
             res.status(400);
             res.send('Bad request');
             return(0);
        }
        
        //convert the Date String to unix time
        var tempPD = Date.parse(body.purchaseDate.replace(/\//g,'-'));
        var tempRD = Date.parse(body.repletionDate.replace(/\//g,'-'));

        if(tempPD&&tempRD){
            body.purchaseDate = tempPD/1000;
            body.repletionDate = tempRD/1000;
        }else{
            res.status(400);
            res.send('Bad request');
            return(0);       
        }

        //Use lookup to modify the category before storing
        if(lookupCategories[body.category.toLowerCase()]){
            body.category = lookupCategories[body.category.toLowerCase()];
        }
    }
         //
         try{
           //Insert the new item into db

           var uploadStatus= await inventory.insertMany(req.body);
           res.status(200);
           res.send({"success":true});    
           //For future, in case front end needs the info from inserted ids
           /* 
                res.send(uploadStatus)
           */
         }catch(err){
           //Throw 500 error and log error
           res.status(500);
           res.send("Internal server error");
           console.log("Failure in DB insertion has occured.");
           return(0);
         }

}

//Updates an item in DB
exports.editItem = async (req,res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;    

   try{
    //Code from: https://www.youtube.com/watch?v=Vs4OD8lNm80
    //Stores result in variable
    const item = await inventory.findById(req.params.id);
    Object.assign(item,req.body);
    item.save();
    res.send({success:true})
   }catch(err){
    res.status(500);
    res.send("Internal server error");
    console.log("Failed to update a document.");    
   }
   

}

//Deletes an Item in DB
exports.deleteItem = async (req,res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;
    
    //Return 400 if id is not found
    if(req.params.id===undefined){
        res.status(400);
        res.send("Bad request");
        return(0);
    }

    inventory.deleteOne({_id: req.params.id},(err)=>{
        if(err){
            res.status(500);
            res.send("Internal server error.");
        }else{
            res.send({success:true});
        }
    })
}

//Reads items in DB
exports.getItem = async (req,res) => {
    /*
        How to perform query:
        <url>/inventory?<parameters>
        
        Example:
        localhost:3001/inventory?deviceName=Samsung Note&categories=Computers,Scanners&orderby=deviceName&order=1&page=0&sendpages=true

        Query Parameters:
        deviceName -> Device Name of interest (only 1 at a time)
        categories -> Categories of interest, leave empty to get allow all categories
        sortby -> Sorts item by specified field (only fields specified in schema are allowed)
                *Sorted by deviceName by default
        order ->  -1 if Descending, 1 if Ascending. (0 by default (no sort))
        page -> The page number of interest (0 by default)
        sendpages -> (boolean) set to true if you need the page count
    */
    //From: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

    //Check authorization first before proceeding 
    //if((await verifyAuth(req,res))!==200)return;


    //Will contain all the query parameters
    var queryParams = {};

    var page = req.query.page===undefined?0:req.query.page;

    if(req.query.deviceName) queryParams.deviceName = new RegExp(escapeRegex(req.query.deviceName),'i'); 
    if(req.query.office) queryParams.office = new RegExp(req.query.office,'i');
    if(req.query.building) queryParams.building = new RegExp(req.query.building,'i');
    if(req.query.status) queryParams.status = new RegExp(req.query.status,'i');
    if(req.query.category)queryParams.category = new RegExp(req.query.category,'i');

    try{
        var body = {};
        //Checks if server should send the number of pages that the query would contain
        if(req.query.sendpages!==undefined&&req.query.sendpages==='true'){
            var pages = await inventory.find(queryParams).count();
            //Ceiling function for pages (1-9->1 page, 10-19->2 pages, ...)
            var pages = (pages+(10-pages%10)%10)/10;
            body.pages = pages;      
        }

        if(req.query.export && req.query.export==="true"&& req.query.sortby && req.query.order){
            //1 if ascending, 2 if descending, else ignore sorting
            var order = 0;
            if(req.query.order==="1") order = 1;
            else if (req.query.order==="2") order = -1;
            
            var query = await inventory.find(queryParams)
            .skip(page*10).limit(10).sort({[req.query.sortby]:parseInt(order)});   

        }else if(req.query.export && req.query.export==="true"){
            var query= await inventory.find(queryParams);

        }else if(req.query.sortby && req.query.order){
            //1 if ascending, 2 if descending, else ignore sorting
            var order = 0;
            if(req.query.order==="1") order = 1;
            else if (req.query.order==="2") order = -1;

            var query = await inventory.find(queryParams)
            .skip(page*10).limit(10).sort({[req.query.sortby]:parseInt(order)});   
        }else{
            var query = await inventory.find(queryParams)
            .skip(page*10).limit(10);      
        }


        body.data = query;

        res.status(200);
        res.send(body);
    }catch(e){
        res.status(500);
        res.send("Internal Server Error");
    }



}


