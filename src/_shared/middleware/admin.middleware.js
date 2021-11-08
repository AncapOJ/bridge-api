const StatusError = require("../error/status.error");
const JwtUtils = require("../utils/jwt.utils");

const isAdmin = async(req, res, next) =>{
    try {
        console.log(req.user)
        if(req.user.role=="admin"){
            next();
            return
        }

    return res.status(403).json({ message: "Require Admin Role!" });  
    }
    catch (error) {
        next(error);
    }
}

module.exports= isAdmin;