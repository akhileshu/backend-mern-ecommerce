const passport = require('passport');

// Middleware to check if user is authenticated
exports.isAuth = (req, res, next)=> {
    return passport.authenticate('jwt')//authenticate with token
  }

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}