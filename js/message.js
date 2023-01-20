const homeContent = document.querySelector("#home-content")
const divMessage = document.querySelector("#message")
const msgArea = document.querySelector("#message-area")
msgArea.value = ""


const grootCheckboxDesktop = document.querySelector("#grout-desktop")
const grootCheckboxMobile = document.querySelector("#grout-mobile")


isGrout = false

grootCheckboxMobile.checked = isGrout
grootCheckboxDesktop.checked = isGrout

grootCheckboxDesktop.addEventListener("change", () => {
    isGrout = !isGrout
    grootCheckboxMobile.checked = isGrout
})

grootCheckboxMobile.addEventListener("change", () => {
    isGrout = !isGrout
    grootCheckboxDesktop.checked = isGrout
})
indexMessageGPT = 0
const templateMsg = [
    { msg: "Salut", response: "Bonjour" },
    { msg: "Peux-tu te présenter ?", response: "Je suis chat GPT, une intéligence artificiel créer par OpenAI, j'ai été formé pour intéragire de manière conversationnelle. Je suis le petit frère de InstructGPT." },
    { msg: "Quelle est la plus grande montagne de France", response: "La plus grande montagne de France est le Mont Blanc, qui se situe à la frontière entre la France et l'Italie." }
]

function sleep(milliseconds) {
    console.log("sleep")
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

const getResponse = (msg) => {
    response = "Error"
    templateMsg.forEach(item => {
        if (item.msg == msg) {
            response = item.response
        }
    })
    return response
}


const addMeMessage = (msg) => {
    console.log("add me message")
    const divMessageMe = document.createElement("div")
    divMessageMe.classList.add("message-me")
    const divContainer = document.createElement("div")
    divContainer.classList.add("p-3")
    divContainer.classList.add("d-flex")
    const divIcons = document.createElement("div")
    divIcons.classList.add("bg-primary")
    divIcons.classList.add("p-1")
    divIcons.classList.add("rounded")
    const icons = document.createElement("i")
    icons.classList.add("bi")
    icons.classList.add("bi-person")
    const p = document.createElement("p")
    p.classList.add("ps-3")
    p.classList.add("text-light")
    p.classList.add("text-break")
    p.innerText = msg
    divIcons.appendChild(icons)
    divContainer.appendChild(divIcons)
    divContainer.appendChild(p)
    divMessageMe.appendChild(divContainer)
    return divMessageMe
}

const addChatGPTMessage = () => {
    console.log("add chatGPTMsg")
    const divMessageChatGPT = document.createElement("div")
    divMessageChatGPT.classList.add("message-chatGpt")
    const divContainer = document.createElement("div")
    divContainer.classList.add("p-3")
    divContainer.classList.add("d-flex")
    const icons = document.createElement("img")
    icons.src = "./../assets/chatGpt-icons.jpg"
    icons.classList.add("chatGpt-icons")
    const span = document.createElement("span")
    span.classList.add("ps-3")
    span.classList.add("text-light")
    span.classList.add("text-break")
    span.classList.add("typewriter-" + indexMessageGPT)
    divContainer.appendChild(icons)
    divContainer.appendChild(span)
    divMessageChatGPT.appendChild(divContainer)
    indexMessageGPT++
    return divMessageChatGPT
}

const addGroutMessage = () => {
    let message = "I am groot "
    const iterationRandom = parseInt(Math.random() * 10)
    for (i = 0; i <= iterationRandom; i++){
        switch(parseInt((Math.random() * 10) / 2)) {
            case 1 : message += "?" 
            break

            case 2 : message += "!" 
            break

            case 3 : message += "." 
            break

            case 4 : message += "?" 
            break

            case 5 : message += ";" 
            break
        }
    }
    return message
}

const animateMsg = (str) => {
    var spans = '<span>' + str.split('').join('</span><span>') + '</span>';
    $(spans).hide().appendTo('.typewriter-' + (indexMessageGPT - 1)).each(function (i) {

        $(this).delay(50 * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 50);
    });
}





document.querySelector("#message-button").addEventListener("click", () => {

    console.log("patrik")

    if (msgArea.value == "") {
        return
    }

    if (!homeContent.classList.contains("d-none")) {
        homeContent.classList.add("d-none")
        homeContent.classList.remove("d-flex")
        divMessage.classList.remove("d-none")
    }

    divMessage.appendChild(addMeMessage(msgArea.value))
    divMessage.appendChild(addChatGPTMessage())
    if (isGrout) {
        animateMsg(addGroutMessage())
    } else {
        animateMsg(getResponse(msgArea.value))
    }
    msgArea.value = ""
})