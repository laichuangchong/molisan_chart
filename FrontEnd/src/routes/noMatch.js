/**
 * Created by chenzhongying on 2017/11/2.
 */
module.exports = {
    path: '*',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('../component/noMatch').default)
        })
    }
}