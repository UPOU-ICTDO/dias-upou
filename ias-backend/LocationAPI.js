/*
 * Location API
 * This file will contain all the methods for Locations.
*/

const mongoose = require('mongoose');
const userAuth = require('./UserAuthAPI.js');

const locationSchema = mongoose.Schema({
    building: {type: String, required: true, dropDups: true},
    exactLocation: {type: String, required: true, dropDups: true}
});

locationSchema.index({ building: 1, exactLocation: 1 }, { unique: true });

const location = mongoose.model('location',locationSchema)

//Verifies request auth header.
//Filter unauthorized requests
// async function verifyAuth(req,res){
//     var authStatus = await userAuth.checkAuth(req.headers.authorization,true);
//     if(authStatus===401){
//         res.status(401);
//         res.send("Unauthorized");

//     }else if(authStatus===403){
//         res.status(403);
//         res.send("Forbidden");        
//     }
//     return(authStatus);
// }

// Find all locations with matching building, returns all if none
exports.findLocation = async (req, res) => {
    /*
        <url>/?building="string_here"
        building: building of interest
    */

    //Check authorization first before proceeding 
    // if((await verifyAuth(req,res))!==200)return;    

    var building = req.query.building===undefined?'.':req.query.building;
    const locs = await location.find({building: new RegExp(building,'i')});
    res.send({ data: locs });
};

//Loads all locations that will be used in dropdown options in frontend
//Method: GET, Query parameters: none
//Return type a 2d array where the outer array 
exports.loadLocation = async (req, res) => {

    //Check authorization first before proceeding 
    // if((await verifyAuth(req,res))!==200)return;    

    try{
        var buildings = await location.distinct("building");
        
        //Create a 2d array that will contain the building as first element of each subarray
        //with the locations as the succeeding elements
        var body = [];
        for(let i=0;i<buildings.length;i++){

            //Temporary array for storing locations and building
            var temp_arr = [buildings[i]];
            var locations = await location.find({"building":buildings[i]});
            for(let j=0;j<locations.length;j++){

                temp_arr.push(locations[j].exactLocation);
            }
            body.push(temp_arr);
        }
        res.send(body);
    }catch{
        res.status(500).send("Server Error");
        console.log("Error: Cannot send locations to client.");
    }
};

// Adds a location
exports.addLocation = async (req, res) => {

    //Check authorization first before proceeding 
    // if((await verifyAuth(req,res))!==200)return;    
    
    if(!(req.body.building&&req.body.exactLocation)){
        res.status(400);
        res.send("Malformed Request");
        return(0);
    }

    try {
        const newLocation = new location(req.body);
        await newLocation.save();
        res.send({ data: newLocation });
    } catch {
        res.status(500).send("Server Error");
        console.log("Error: Failed to add new location.");
    }
};

// Update a Location
exports.updateLocation = async (req, res) => {

    //Check authorization first before proceeding 
    // if((await verifyAuth(req,res))!==200)return;
    try {
        const loc = await location.findOne({ _id: req.params.id });
        Object.assign(loc, req.body);
        await loc.save();
        res.send({ data: loc });
    } catch {
        res.status(404).send({ error: 'Location not found' });
        console.log("Update Error: Location not found.");
    }
};

// Delete a location
exports.deleteLocation = async (req, res) => {

    //Check authorization first before proceeding 
    // if((await verifyAuth(req,res))!==200)return;

    try {
        await location.deleteOne({ _id: req.params.id });
        res.send({ data: true });
    } catch {
        res.status(404).send({ error: 'Location' });
        console.log("Delete Error: Location not found.");
    }
};