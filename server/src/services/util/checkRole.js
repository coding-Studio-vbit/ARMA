const checkRole = (req, res, next, possibleRoles) => {
  let flag = false;
  for (let a = 0; a < req.user.role.length; a++) {
    if (possibleRoles.indexOf(req.user.role[a].name) !== -1) {
      flag = true;
      break;
    }
  }
  if (flag) {
    next();
  } else {
    throw new Error(`user doesn't have any of the required roles ${String(possibleRoles)}!`);
  }
};

module.exports = checkRole;