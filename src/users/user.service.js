const StatusError = require("../_shared/error/status.error");
const User = require("./user.model");
const bcrypt = require('bcrypt');
const JwtUtils = require("../_shared/utils/jwt.utils");

class UserService {

    static find(extended) {
        const find = User.find();
        return  find;
    }

    static async findOne(id) {
        const user = await User.findById(id).lean();

        if (user) {
            return user;
        }

        throw new StatusError(404, `User with id <${id}> was not found`);
    }

    static async create(user) {

        const found = await User.findOne({ email: user.email });

        if (found) {
            throw new StatusError(400, `User with email ${user.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        return User.create({ ...user, password: hashedPassword });
    }

    static async login(user) {
        //Encontrar el email del user
        const found = await User.findOne({ email: user.email });

        if (!found) {
            throw new StatusError(404, "User not exists by email");
        }
        //Comprobar la contraseña
        const isValidPassword = await bcrypt.compare(user.password, found.password);

        if (!isValidPassword) {
            throw new StatusError(403, "Invalid credentials");
        }
        //General el token
        const token = JwtUtils.generate(found._id, found.email, found.role);

        return { token };
    }

    static async replace(id, user) {
        const updated = await User.findByIdAndUpdate(id, user);

        if (updated) {
            return User.findById(id);
        }

        throw new StatusError(404, `User with id <${id}> was not found`);
    }

    static async delete(id) {
        const user = await User.findById(id);

        if (user) {
            return User.findByIdAndRemove(id);
        }

        throw new StatusError(404, `User with id <${id}> was not found`);
    }
}

module.exports = UserService;