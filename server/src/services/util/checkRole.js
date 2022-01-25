const checkPermissions = (req, res, next, requiredPermission) => {
  let flag = false;
  for (let a = 0; a < req.user.role.length; a++) {
    if (req.user.role[a].permissions.indexOf(requiredPermission) !== -1) {
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

module.exports = checkPermissions;
