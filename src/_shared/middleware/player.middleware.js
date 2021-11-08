const StatusError = require("../error/status.error");
const JwtUtils = require("../utils/jwt.utils");

const isPlayer = async(req, res, next) =>{
    try {
        if(req.user.role=="player"){
            next();
            return
        }

    return res.status(403).json({ message: "Require Player Role!" });  
    }
    catch (error) {
        next(error);
    }
}

module.exports= isPlayer;