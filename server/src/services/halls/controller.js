const escapeRegex = require("../../services/util/escapeRegex");
const halls = require("../../models/hall");
const reservations = require("../../models/reservations");
const response = require("../../services/util/response");
// GET HALLS
const getHalls = async (req, res) => {
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  let where = {};
  if (req.query.name) where.name = { $regex: escapeRegex(req.query.name), $options: "i" };
  if (req.query.capacity) where.capacity = req.query.capacity;

  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    const result = await halls
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await halls.countDocuments(where);

    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Sorry! Halls cannot be fetched at this moment" },
        process.env.FAILURE_CODE
      )
    );
  }
};

//ADD HALL

const addHall = async (req, res) => {
  try {
    let data = await halls.findOne({ name: req.body.name });
    if (data)
      return res.json(
        response({ message: "Hall already exists" }, process.env.SUCCESS_CODE)
      );
    let newHall = new halls({
      name: req.body.name,
      hallInfo: req.body.hallInfo,
      block: req.body.block,
      capacity: req.body.capacity,
    });
    await newHall.save();
    res.json(
      response(
        { message: "Hall added successfully!" },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const editHall = async (req, res) => {
  try {
    const { id, name, block, hallInfo, capacity } = req.body;
    await halls.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          block: block,
          hallInfo: hallInfo,
          capacity: capacity,
        },
      },
      { new: true }
    );
    res.json(response("Hall edited successfully!", process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error._message, process.env.FAILURE_CODE));
  }
};

const viewHall = async (req, res) => {
  try {
    let { id } = req.body;
    let hall = await halls.findOne({ _id: id });
    res.json(response(hall, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const deleteHall = async (req, res) => {
  try {
    let { id } = req.body;
    let hall = await halls.deleteOne({ _id: id });
    res.json(response(hall, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const getSlots = async (req, res) => {
  try {
    let { date } = req.body;
    let result = await reservations
      .find({ status: "NOT COMPLETED", dates: date })
      .populate("hallId");
    const slotsObject = {};
    console.log("reservations are:", result);
    result.forEach((item) => {
      if (!item || !item.hallId || !item.hallId.name) return;
      if (!slotsObject.hasOwnProperty(item.hallId.name)) {
        slotsObject[item.hallId.name] = [];
      }
      const dateIndex = item.dates.indexOf(date);
      if (dateIndex !== -1 && item.timeSlots[dateIndex]) {
        for (let i = 0; i < item.timeSlots[dateIndex].length; i++)
          slotsObject[item.hallId.name].push(item.timeSlots[dateIndex][i]);
      }
    });
    res.json(response(slotsObject, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

module.exports = {
  getHalls,
  addHall,
  editHall,
  viewHall,
  deleteHall,
  getSlots,
};
