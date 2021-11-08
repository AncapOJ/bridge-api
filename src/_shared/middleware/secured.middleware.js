
const UserService = require("../../users/user.service");
const StatusError = require("../error/status.error");
const JwtUtils = require("../utils/jwt.utils");

const secured = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new StatusError(403, "Unauthorized");
        }

        const parsedToken = token.replace('Bearer ', '');

        const validToken = JwtUtils.verify(parsedToken);

        const admin = await UserService.findOne(validToken.id);

        req.user = admin;

        next();
    }
    catch (error) {
        next(error);
    }
};





module.exports = secured;
    

