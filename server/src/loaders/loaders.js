const expressLoader = require("./express");

const loaders = ({app}) => {
  expressLoader(app);
};

module.exports = loaders;
