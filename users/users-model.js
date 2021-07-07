const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    console.log("findby", filter)
    return db('users').where(filter);
}

async function add(user) {
    console.log(user)
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
    .select('id','username')
    .where({ id })
    .first();
}