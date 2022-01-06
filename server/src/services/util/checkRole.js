const checkRole = (req, res, next, requiredPermission) => {
  let flag = false;

  for (let a = 0; a < req.user.roles.length; a++) {
    if (req.user.roles[a].permissions.indexOf(requiredPermission) !== -1) {
      flag = true;
      break;
    }
  }
  if (flag) {
    next();
  } else {
    throw new Error(`user doesn't have the permission ${requiredPermission}!`);
  }
};

module.exports = hasRole;
