const role = require("../../models/role");
const response = require("../../services/util/response");

const addRoles = async(req,res)=>{
    try{
        let newRole = new role({
            name : req.body.name,
            permissions : req.body.permissions
        })
        await newRole.save()
        res.json(
        response({message:"New Role Created"}, 
        process.env.SUCCESS_CODE));
    }
    catch(err){
        console.log(err)
        res.json(response({message:"Internal Server Error"}, 
        process.env.FAILURE_CODE));
    }
    
}

module.exports = { addRoles }