import Visit from '../controllers/visit.js'

module.exports = api => {
    api.route('/visits/:visitId').get(Visit.get)
}
