const passport = require('passport');

// Middleware to check if user is authenticated
exports.isAuth = (req, res, next)=> {
    if (req.user) next(); // If authorized, proceed
    else res.send(401); // Unauthorized
  }

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}