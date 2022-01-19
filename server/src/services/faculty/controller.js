const faculty = require("../../models/faculty");
const response = require("../util/response");


//get Faculty list

const getFacultyList = async(req,res)=>{
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 1000000;
    //For filters
    let where = {};
    if (req.query.name) where.name = {$regex: req.query.name,$options: 'i'};
    if (req.query.rollNumber) where.rollNumber = {$regex: req.query.rollNumber,$options: 'i'};

    //For sorting
    let sort = {};
    if (req.query.orderBy && req.query.order)
        sort[req.query.orderBy] = req.query.order;
    else sort = { name: "asc" };

    try {
        result = await faculty
        .find(where)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort);
        const total = await faculty.count(where);
        res.json(
        response({ data: result, total: total }, process.env.SUCCESS_CODE)
        );
    } catch (error) {
        res.json(
        response(
            { message: "Faculty data fetch error" },
            process.env.FAILURE_CODE
        )
        );
    }
}

const editProfile = async(req,res) => {
try {
    const {email,designation,phone } = req.body;
    const user = await faculty.findOneAndUpdate({email:email}, { $set: {designation: designation, phone:phone}}, {new:true} )
    res.json(response(user, process.env.SUCCESS_CODE))
} catch (error) {
    res.json(response("Details could not be updated", process.env.FAILURE_CODE))
}
}

module.exports = {getFacultyList, editProfile}