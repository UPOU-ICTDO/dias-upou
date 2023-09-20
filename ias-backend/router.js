/**
 * ROUTER
 * File for the url routes for accessing the database functions
*/

const inventory = require('./InventoryAPI.js');
const editor = require('./EditorAPI.js'); 
const userAuth = require('./UserAuthAPI.js');
const location = require('./LocationAPI.js');
const uri = require('./uri.js');

// Allow Cross Origin Resource Sharing (CORS) for the specified URL
const setCORSHeader = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", uri.frontend);
    res.setHeader("Access-Control-Allow-Methods", ["POST","GET","PUT","DELETE"]);
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Authorization");
    res.setHeader("Access-Control-Allow-Authorization",true);
    next();
}

module.exports = (app) => {

    // INVENTORY ROUTES
    app.post('/inventory', setCORSHeader,  inventory.addItem);
    app.put('/inventory/:id',setCORSHeader,inventory.editItem);
    app.delete('/inventory/:id',setCORSHeader,inventory.deleteItem);
    app.get('/inventory',setCORSHeader,inventory.getItem);
    app.get('/inventory/report/status',setCORSHeader,inventory.status);
    app.get('/inventory/report/categories',setCORSHeader,inventory.categories);
    app.get('/inventory/report/notifications',setCORSHeader,inventory.notifications);
    app.post('/inventory/bulk_upload',setCORSHeader,inventory.bulkUpload);

    // EDITOR ROUTES
    app.get('/editors/', setCORSHeader, editor.findAllEditors);
    app.post('/editors/', setCORSHeader, editor.addEditor);
    app.put('/editors/:id', setCORSHeader, editor.updateEditor);
    app.delete('/editors/:id', setCORSHeader, editor.deleteEditor);

    //Location Control routes
    app.get('/location/', setCORSHeader, location.findLocation);
    app.get('/location/load',setCORSHeader, location.loadLocation);
    app.post('/location/', setCORSHeader, location.addLocation);
    app.put('/location/:id', setCORSHeader, location.updateLocation);
    app.delete('/location/:id', setCORSHeader, location.deleteLocation);

    //UserAuth Paths
    app.get('/validate',setCORSHeader,userAuth.validate);
}
