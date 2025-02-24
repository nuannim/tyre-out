const db = require('./dbconn.js');

const LoginModel = {
    


    createUser: async (userData) => {
        const query = `INSERT INTO Users (email, password, name) VALUES (?, ?, ?)`;
        try {
            const result = await db.run(query, [userData.email, userData.password, userData.name]);
            return result.lastID;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = LoginModel;