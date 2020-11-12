const og = require('open-graph')

const ogData = (url) => {
    og(url, (err, meta) => {
        if (err) return err
        else return meta
    })
}

module.exports = ogData