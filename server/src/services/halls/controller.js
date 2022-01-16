const halls = require("../../models/hall");
const response = require("../../services/util/response");


// GET HALLS
const getHalls = async(req,res)=>{
    let page = req.query.page? Number(req.query.page): 1;
    let limit = req.query.limit? Number(req.query.limit):1000000;

    let where = {}
    if (req.query.name) where.name = {$regex: req.query.name,$options: 'i'};
    if (req.query.capacity) where.capacity = req.query.capacity;

    let sort = {};
    if (req.query.orderBy && req.query.order)
      sort[req.query.orderBy] = req.query.order;
    else sort = { name: "asc" };

    try {
        result = await halls
            .find(where)
            .skip((page-1)*limit)
            .limit(limit)
            .sort(sort);
        const total = await halls.count(where);

        res.json(
            response({data:result,total : total}, process.env.SUCCESS_CODE)
        );
    } catch (error){
        console.log(error);
        res.json(
            response({message: "Sorry! Halls cannot be fetched at this moment"},
            process.env.FAILURE_CODE
            )
        )

    }
}

//ADD HALL

const addHall = async(req,res)=>{
    try{
        let data = halls.find({name:req.body.name})
        if(data) return res.json(response({message:"Hall already exists"},process.env.SUCCESS_CODE));
        let newHall = new halls({
            name :  req.body.name,
            hallInfo : req.body.hallInfo,
            capacity: req.body.capacity,
            bookings: req.body.bookings
        })
        await newHall.save()
        res.json(
            response({message:"Hall added successfully!"},process.env.SUCCESS_CODE)
        )
    }catch(error){
        console.log(error);
        res.json(
            response({message:"Sorry! Hall cannot be added at this moment"},
            process.env.FAILURE_CODE)
        )
    }
}

module.exports = { getHalls, addHall }