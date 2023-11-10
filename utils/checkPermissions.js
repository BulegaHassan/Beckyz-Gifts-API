const {UnauthorizedError} = require('../errors')
const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);

  /*In order one to get a single user, he should be an admin or the owner of the resource himself */
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError(
    "Not authorized to access this route!"
  );
};

module.exports = checkPermissions;
