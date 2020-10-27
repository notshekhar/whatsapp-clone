const socketHandler = (socket) => {
    socket.on("join-room", (id) => {
        socket.join(id)
    })
    socket.on("message", (id, toID, message)=>{
        console.log(id, toID, message)
    })
}

module.exports = {
    socketHandler,
}
