module.exports = {
    path: 'operate',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('../component/choose').default)
        })
    }
};