class UserController {
    find(req, res, next) {
        res.json({
            status: true,
            data: [{
                _id: 1,
                username: 'shankarregmi',
                email: 'shankarregmi@gmail.com'
            }]
        });
    }
    create(req, res, next) {
        res.json(true);
    }
}

export default UserController;