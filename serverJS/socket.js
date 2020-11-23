const socketHandler = (socket) => {
    socket.on("join-room", (id) => {
        socket.join(id)
    })
    socket.on("message", (id, toID, messageData) => {
        socket.to(toId).emit.broadcast("recieve_message", {
            ...messageData,
            id: id,
        })
    })
}

// sendData = {
// type: emoji/text/image/video/audio/location,
// by: id,
// value: value,
// }

module.exports = {
    socketHandler,
}
