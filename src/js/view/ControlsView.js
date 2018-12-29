import View from "./View";

const CTRL_ENTER_KEY_CODE = 10;
const ENTER_KEY_CODE = 13;
const DOMElements = {
    controls: '.controls',
    userChatZone: '.user-chat-zone',
    userMessageBox: '.message-box'
}

export default class ControlsView extends View {
    
    constructor() {
        super();
        
    }

    render(socket) {
        const controlsHTML = `
            <img class="baloon" src="./img/baloon.png" alt="baloon" />
			<textarea class="message-box" rows="1"></textarea>
			<img class="send-button" src="./img/send-button.png" />
        `;
        const DOMControls = document.querySelector(DOMElements.controls);
        DOMControls.insertAdjacentHTML('beforeend', controlsHTML);

        DOMControls.addEventListener('keypress', (event) => {
            const DOMMessageBox = document.querySelector(DOMElements.userMessageBox);
            if(event.charCode == ENTER_KEY_CODE) {                
                var data = {
                    message: DOMMessageBox.value,
                    type:'userMessage'
                }; 
                socket.send(JSON.stringify(data));
                DOMMessageBox.value = '';
            }
            if(event.charCode == CTRL_ENTER_KEY_CODE) {
                let rowCount = parseInt(DOMMessageBox.getAttribute('rows'));
                if(rowCount <= 5) {
                    DOMMessageBox.setAttribute('rows', ++rowCount);
                    DOMMessageBox.value += "\r\n";
                }                
            }
        })
    }
    
}