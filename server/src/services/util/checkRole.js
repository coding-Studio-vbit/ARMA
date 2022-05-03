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
    throw new Error(`user doesn't have the required role ${requiredRoleName}!`);
  }
};

module.exports = checkRole;