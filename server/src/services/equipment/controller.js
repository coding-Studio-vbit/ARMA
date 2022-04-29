const equipment = require("../../models/equipment");
const response = require("../util/response");
const mongoose = require("mongoose");

// GET EQUIPMENT

const getEquipment = async (req, res) => {
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  let where = {};
  if (req.query.name) where.name = { $regex: req.query.name, $options: "i" };

  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await equipment
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await equipment.count(where);

    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Equipment info cannot be fetched at this moment" },
        process.env.FAILURE_CODE
      )
    );
  }
};

//ADD EQUIPMENT

const addEquipment = async (req, res) => {
  try {
    let data = await equipment.findOne({ name: req.body.name });
    console.log(data);
    if (data)
      return res.json(
        response(
          { message: "Equipment already exists" },
          process.env.SUCCESS_CODE
        )
      );

    let newEquipment = new equipment({
      name: req.body.name,
      totalCount: req.body.totalCount,
      facultyIncharge: mongoose.Types.ObjectId(req.body.facultyIncharge),
    });
    await newEquipment.save();
    res.json(
      response(
        { message: "Equipment added sucessfully!" },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Sorry! Equipment cannot be added right now" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const editEquipment = async (req, res) => {
  try {
    const { id, name, totalCount } = req.body;
    await equipment.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, totalCount: totalCount } },
      { new: true }
    );
    res.json(
      response("Equipment edited successfully!", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};


const viewEquipment = async (req, res) => {
  try {
    let {id} = req.body
    let equip = await equipment
    .findOne({_id: id})
    .populate("facultyIncharge");
    res.json(response(equip, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const deleteEquipment = async (req, res) => {
  try {
    let {id} = req.body;
    let equip = await equipment.deleteOne({_id:id})
    res.json(response(equip, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};



module.exports = { addEquipment, getEquipment, editEquipment, viewEquipment, deleteEquipment };
