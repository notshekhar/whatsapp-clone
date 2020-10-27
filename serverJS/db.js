const nedb = require("nedb-promise")

let userDB = nedb({ filename: "../databases/users.db", autoload: true })
let tempDB = nedb({ filename: "../databases/temp.db", autoload: true })

module.exports = {
    userDB,
    tempDB,
}
