const express = require("express")
const ejs = require("ejs")
const parser = require("cookie-parser")
const logger = require("morgan")
const http = require("http")

const { ErrorHandler } = require("./error_handler")

const { login, signup, auth } = require("./dbHandle")

const app = express()
const httpServer = http.Server(app)

app.use(logger("dev"))
app.set("view engine", "ejs")
app.use(
    parser(),
    express.json(),
    express.urlencoded({ extended: false }),
    express.static("public")
)

app.get("/", async (req, res, next) => {
    try {
        let { username, token } = req.cookies
        if (token) {
            let a = await auth(token)
            if (a && a.auth) {
                //send all pending messages along with the page
                res.render("home", { username })
            }
        }
        res.render("index", {})
    } catch (error) {
        next(error)
    }
})
app.post("/signup", async (req, res, next) => {
    let data = req.body
    try {
        let s = await signup(data)
        if (s) {
            res.cookie("token", s.token)
            res.cookie("username", s.username)
            res.redirect("/")
            // res.json(s)
        }
    } catch (error) {
        next(error)
    }
})
app.post("/login", async (req, res, next) => {
    let data = req.body
    try {
        let l = await login(data)
        if (l && l.login) {
            res.cookie("token", l.token)
            res.cookie("username", l.username)
            res.redirect("/")
            // res.json(l)
        } else throw l
    } catch (error) {
        next(error)
    }
})
app.get("/auth", async (req, res, next) => {
    let { token } = req.params
    try {
        let a = await auth(token)
        if (a) res.json(a)
    } catch (error) {
        next(error)
    }
})

app.use(ErrorHandler)

//export app
module.exports = httpServer
