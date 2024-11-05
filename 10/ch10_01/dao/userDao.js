const models = require('../models');
const findAll = async () =>{
    return await models.User.findAll();
    //select * from users
};

const createUser = async (userData) =>{
    return await models.User.create(userData);
}

module.exports = {
    findAll,
    createUser,
}