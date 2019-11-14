module.exports = {
    validateUser
}

function validateUser(user) {
    let errors = [];
    console.log('test from validateUser');
    if(!user.username || user.username.length < 2) {
        errors.push('Username must be 2 or more characters')
    }

    if(!user.password || user.password.length < 4) {
        errors.push('Password must be 4 or more characters')
    }

    return {
        isSuccessful: true,
        errors
    };
}