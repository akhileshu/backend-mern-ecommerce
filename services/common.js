const passport = require('passport');

// Middleware to check if user is authenticated
exports.isAuth = (req, res, next)=> {
    return passport.authenticate('jwt')//authenticate with token postman->authrization ->bearer token
  }

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  //TODO : this is temporary token for testing without cookie
  usertoken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTJjMWYyYWIxNzgyZGY1YzU0YmFlMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyNTgzMjc3fQ.lQW3pVeeqCtgdft7Qynjy79M2uiGgKGIJTdsIzE9Jew"
  // token for user@gmail.com
  admintoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTJiZjRmYWIxNzgyZGY1YzU0YjlkOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MjU4NTIxMX0.0fB9lVYVaBwuQDQHWws7AnaBCFChGFj0s0rhtmpYg5Q"
  return admintoken;
};