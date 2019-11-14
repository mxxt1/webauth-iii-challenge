const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js');
const { validateUser } = require('../users/users-helpers.js')





router.post('/register', (req, res) => {
    let user = req.body;
    
    const validateResult = validateUser(user)

    if(validateResult.isSuccessful === true) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
        .then(saved => {
            console.log('test from save promise');
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log('test from error promise');
            res.status(500).json(error);
        });
    } else {
        res.status(400).json({ message: 'please enter valid credentials', errors: validateResult.errors });
    }
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
              
                const token = getJwtToken(user.password);
            
                res.status(200).json({
                    token,
                    message: `Welcome ${user.username}!`,
                });
            } else {
                res.status(401).json({ message: 'Error logging in, please check credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


function getJwtToken(username) {
    const payload = {
        username,
        role: 'admin'
    };
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;