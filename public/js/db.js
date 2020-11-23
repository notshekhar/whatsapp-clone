const db = new zango.Db("chat_app", {
    contacts: ["uid"],
    chats: ["recipets"],
    recents: ["uid"],
})
const contacts = db.collection("contacts")
const chats = db.collection("chats")
const recents = db.collection("recents")

// contacts = {
//     uid,
//     name,
// }

// chats = {
//     reciept,
//     method,
//     message,
//     reply,
// }
// recents = {
//     uid,
//     datetime
// }

// onMessageSend if contacts have not user added then add new contact
// if new message recieve then if contact not have user added then add new

// contacts.insert([
//     {
//         uid: "shekhar",
//         name: "Shekhar",
//     },
//     {
//         uid: "root",
//         name: "Jayant",
//     },
// ])

// chats.insert({
//     recipets: ["shekhar"],
//     method: "receive",
//     message: "hello",
//     reply: "hi",
// })
