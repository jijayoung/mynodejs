const userDao = require("../dao/userDao");

const findAll = async () => {
    return await userDao.findAll();
}

const createUser = async (userData) => {
    return await userDao.createUser(userData);
}

module.exports = {
    findAll,
    createUser,
}