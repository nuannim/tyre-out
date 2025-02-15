const db = require('./dbconn.js');

const UserModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM customer", (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM customer WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO customer (firstname, lastname, centerid, regno, roles) VALUES (?, ?, ?, ?, ?)",
                [data.firstname, data.lastname, data.centerid, data.regno, data.roles],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results.insertId);
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM customer WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results.affectedRows);
            });
        });
    }
};

module.exports = UserModel;
