const role = require("../../models/role");
const response = require("../../services/util/response");

//ADD ROLES
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

//GET ROLES

const getRoles = async(req,res)=>{
    let page = req.query.page? Number(req.query.page): 1;
    let limit = req.query.limit? Number(req.query.limit):1000000;

    let where = {}
    if (req.query.name) where.name = req.query.name;

    let sort = {};
    if (req.query.orderBy && req.query.order)
      sort[req.query.orderBy] = req.query.order;
    else sort = { name: "asc" };

    try {
        result = await role
            .find(where)
            .skip((page-1)*limit)
            .limit(limit)
            .sort(sort);
        const total = await role.count(where);

        res.json(
            response({data:result,total : total}, process.env.SUCCESS_CODE)
        );
    } catch (error){
        console.log(error);
        res.json(
            response({message: "Roles cannot be fetched at this moment"},
            process.env.FAILURE_CODE
            )
        )

    }

}

module.exports = { addRoles, getRoles }