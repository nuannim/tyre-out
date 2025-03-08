const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('fwp_proj.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('🧍‍♀️🧍‍♀️🧍‍♀️Connected to the SQLite3 db')
});

module.exports = db;
