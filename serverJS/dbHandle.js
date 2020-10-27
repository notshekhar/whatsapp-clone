const decode = require("jsonwebtoken/decode")
const { userDB, tempDB } = require("./db")
const { encodeJSON, decodeJSON, MD5 } = require("./encryption")

function next(e) {
    console.log(e)
}

async function login(data) {
    let { username, password } = data
    try {
        let doc = await userDB.findOne({ $and: [{ username }, { password }] })
        if (!doc) {
            throw new Error("No user found")
        } else {
            delete doc.signupTime
            return { login: true, username, token: encodeJSON(doc) }
        }
    } catch (error) {
        return error
    }
}

async function signup(data) {
    let { username, password } = data
    try {
        let doc = await userDB.findOne({ username })
        if (!doc) {
            let i = await userDB.insert({ ...data, signupTime: Date.now() })
            delete i.signupTime
            return { signup: true, username, token: encodeJSON(i) }
        } else {
            throw new Error("User already exist try different username")
        }
    } catch (error) {
        return error
    }
}
async function auth(token) {
    let { username, password } = decodeJSON(token)
    console.log(username, password)
    try {
        let doc = await userDB.findOne({ $and: [{ username }, { password }] })
        if (!doc) {
            throw new Error("no-auth")
        } else return { auth: true }
    } catch (error) {
        error
    }
}

async function test() {
    let s = await signup({ username: "shekhar", password: "shekhar2303" }, next)
    // let l = await login({ username: "shekhar", password: "shekhar2303" }, next)
    // console.log(l)
    console.log(s)
}
// test()

module.exports = {
    login,
    signup,
    auth,
}
