const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

const loaders = ({ app, mongoose }) => {
  expressLoader(app);
  mongooseLoader(mongoose);
};

module.exports = loaders;
