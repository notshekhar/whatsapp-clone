const add_new_chat_btn = document.querySelector(".addnewchat")
const new_chat_div = document.querySelector(".new_chat")
const contact_list_div = document.querySelector(".new_chat .list")
let message_body = document.querySelector(".message_body")

let new_chat_show = false

//for creating new element
function createElement(e, attrs) {
    let el = document.createElement(e)
    for (let attr in attrs) {
        const value = attrs[attr]
        if (attr == "innerText") el.innerText = value
        else if (attr == "innerHTML") el.innerHTML = value
        else el.setAttribute(attr, value)
    }
    return el
}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this)
}
Element.prototype.css = function (styles) {
    for (let style in styles) {
        this.style[style] = styles[style]
    }
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i])
        }
    }
}

function applyStyle(el, styles) {
    for (let style in styles) {
        el.style[style] = styles[style]
    }
}
function ContactDiv(data) {
    let li = createElement("li", {
        id: data.uid,
    })
    let name = createElement("div", { innerText: data.name || data.uid })
    li.append(name)
    li.addEventListener("click", function () {
        let id = data.uid
        message_body.css({ left: "0px" })
        messageBodyInit({ id })
    })
    return li
}
async function addContactsInList() {
    let cont = await contacts.find({})
    cont.forEach((c) => {
        let div = ContactDiv(c)
        console.log(div)
        contact_list_div.append(div)
    })
}
addContactsInList()
add_new_chat_btn.onclick = function () {
    new_chat_show = !new_chat_show
    applyStyle(new_chat_div, { top: new_chat_show ? "60px" : "100%" })
    this.innerHTML = new_chat_show ? "Hide" : "Add New"
}

function messageBodyInit(data) {
    message_body.innerHTML = data.id
}
