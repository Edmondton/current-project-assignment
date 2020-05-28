import User from '../controllers/user.js'

module.exports = api => {
    api.route('/users/:userId/visits').post(User.post);
    api.route('/users/:userId/visits?').get(User.getByUserIdAndSearch);
}
