const router = require('express').Router();

const User = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole('admin'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.send(error));
});

module.exports = router;

function checkRole(role) {
    return function(req, res, next) {
        if(role === req.decodedJwt.role) {
            next()
        } else {
            res.status(403).json({ message: 'Cant touch this!' })
        }
    }
}