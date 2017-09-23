const User = require ('../../../models/user')

/*
    POST /api/user/assign-admin/:username
*/

module.exports = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.findOneByUsername(req.params.username)
    .then(
        user => user.assignAdmin
    ).then(
        res.json({
            success: true
        })
    )
}