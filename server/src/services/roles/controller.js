const roles = require("../../models/role");
const role = require("../../models/role");
const response = require("../../services/util/response");

//ADD ROLES
const addRoles = async (req, res) => {
  try {
    let data = await role.findOne({ name: [req.body.name] });
    if (data)
      return res.json(
        response({ message: "Role already exists" }, process.env.SUCCESS_CODE)
      );
    let newRole = new role({
      name: req.body.name,
    });
    await newRole.save();
    res.json(
      response({ message: "New Role Created" }, process.env.SUCCESS_CODE)
    );
  } catch (err) {
    console.log(err);
    res.json(
      response({ message: "Internal Server Error" }, process.env.FAILURE_CODE)
    );
  }
};

//GET ROLES

const getRoles = async (req, res) => {
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  let where = {};
  if (req.query.name) where.name = { $regex: req.query.name, $options: "i" };

  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await role
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await role.countDocuments(where);
    return res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Roles cannot be fetched at this moment" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const editRole = async (req, res) => {
  try {
    const { id, name, permissions } = req.body;
    await role.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, permissions: permissions } },
      { new: true }
    );
    res.json(response("Role edited successfully!", process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const fetchRoles = async (req, res) => {
  try {
    let role = await roles.find({});
    res.json(response(role, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const viewRoles = async (req, res) => {
  try {
    let { id } = req.body;
    let role = await roles.findOne({ _id: id });
    res.json(response(role, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const deleteRoles = async (req, res) => {
  try {
    let { id } = req.body;
    let role = await roles.deleteOne({ _id: id });
    res.json(response(role, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

module.exports = {
  addRoles,
  getRoles,
  editRole,
  fetchRoles,
  viewRoles,
  deleteRoles,
};
