class UserController {
    constructor(app) {
        this.Users = app.db['Users'];
    }
    find = async (req, res, next) => {
        const users = await this.Users.find({});
        res.json(users);
    }
    create = async (req, res, next) => {
        try {
            const { username, firstName, lastName } = req.body;
            const user = await this.Users.create({ username, firstName, lastName });
            if (user) {
                return res.json(user);
            }
           return res.json(false);
        } catch (error) {
            res.json(error);
        }
    }
}

export default UserController;