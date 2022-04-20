const checkRole = (req, res, next, requiredRoleName) => {
  let flag = false;
  for (let a = 0; a < req.user.roles.length; a++) {
    if (req.user.roles[a].name == requiredRoleName) {
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