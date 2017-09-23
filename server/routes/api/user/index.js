const router = require('express').Router();
const controller = require('./user.controller');

router.get('/list', require('./list'));
router.post('/assign-admin/:username', require('./assignAdmin'));

module.exports = router;