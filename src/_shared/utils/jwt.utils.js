const jwt = require("jsonwebtoken");

class JwtUtils {
    static generate(id, email, role) {
        return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
    
    static verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

}

module.exports = JwtUtils;