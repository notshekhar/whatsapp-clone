const httpServer = require("./serverJS/app")
const io = require("socket.io")(httpServer)

const { socketHandler } = require("./serverJS/socket")

require("dotenv").config()

const listener = httpServer.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port ${listener.address().port}`)
})

io.on("connection", socketHandler)
