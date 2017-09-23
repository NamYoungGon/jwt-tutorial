const User = require ('../../../models/user')

/* 
    GET /api/user/list
*/

module.exports = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.find({})
    .then(
        users=> {
            res.json({users})
        }
    )
}