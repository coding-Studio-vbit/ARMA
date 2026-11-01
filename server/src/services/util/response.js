const response = (res, status) => {
  const message = res instanceof Error ? res.message : res;
  const parsedStatus = isNaN(parseInt(status)) ? (res instanceof Error ? 0 : 1) : parseInt(status);
  return { response: message, status: parsedStatus };
};

module.exports = response;
