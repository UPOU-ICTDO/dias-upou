/*
 * Editor API
 * This file will contain all the methods for the Editor.
 * API referenced from: https://www.youtube.com/watch?v=Vs4OD8lNm80
*/

const mongoose = require('mongoose');
const userAuth = require('./UserAuthAPI.js');

// EDITOR SCHEMA
const editorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    privileges: { type: String, required: true },
    office: {type: String, required: true}
});

// EDITOR MODEL
const Editor = mongoose.model('Editor', editorSchema);



//Verifies request auth header.
//Filter unauthorized requests
async function verifyAuth(req,res){
     var authStatus = await userAuth.checkAuth(req.headers.authorization,true);
     if(authStatus===401){
         res.status(401);
         res.send("Unauthorized");

     }else if(authStatus===403){
         res.status(403);
         res.send("Forbidden");        
     }
     return(authStatus);
}

// // Find one editor
// exports.findEditor = async (req, res) => {

//     //Check authorization first before proceeding 
//     // if((await verifyAuth(req,res))!==200)return;

//     try {
//         const editor = await Editor.findById(req.params.id);
//         res.send({ data: editor });
//     } catch {
//         res.status(404).send({ error: 'Editor not found' });
//         console.log("Error: Editor not found.");
//     }
// };

// Find all editors with matching email
exports.findAllEditors = async (req, res) => {
    /*
        <url>/editors?email="string_here"
        email: Regex for the email
    */

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;    

    var email = req.query.email===undefined?'.':req.query.email;
    const editors = await Editor.find({email: new RegExp(email,'i')});
    res.send({ data: editors });
};

// Add an editor
exports.addEditor = async (req, res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;    

    try {
        const newEditor = new Editor({
            email: req.body.email,
            privileges: req.body.privileges,
            office: req.body.office
        });
        await newEditor.save();
        res.send({ data: newEditor });
    } catch {
        res.status(500).send("Server Error");
        console.log("Error: Failed to create new editor.");
    }
};

// Update an Editor
exports.updateEditor = async (req, res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;

    try {
        const editor = await Editor.findOne({ _id: req.params.id });
        Object.assign(editor, req.body);
        await editor.save();
        res.send({ data: editor });
    } catch {
        res.status(404).send({ error: 'Editor not found' });
        console.log("Update Error: Editor not found.");
    }
};

// Delete an editor
exports.deleteEditor = async (req, res) => {

    //Check authorization first before proceeding 
    if((await verifyAuth(req,res))!==200)return;

    try {
        await Editor.deleteOne({ _id: req.params.id });
        res.send({ data: true });
    } catch {
        res.status(404).send({ error: 'Editor not found' });
        console.log("Delete Error: Editor not found.");
    }
};
