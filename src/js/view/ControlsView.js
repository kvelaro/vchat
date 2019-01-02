import WsHelper from "../helpers/WsHelper";
let ballon = require("../../img/baloon.png");
let sendButton = require("../../img/send-button.png");

import View from "./View";

const CTRL_ENTER_KEY_CODE = 10;
const ENTER_KEY_CODE = 13;
const DOMElements = {
    sectionControls: '.controls-section',
    userChatZone: '.user-chat-zone',
    userMessageBox: '.message-box'
}

export default class ControlsView extends View {
    
    constructor() {
        super();
        
        // ws.on('message', function(res) {
        //     let data = JSON.parse(res);
            
        //     if(data.type == 'serverMessage') {
        //       const messageHTML = `<p>Server message: ${data.message}</p>`;
        //       document.querySelector(DOMElements.logBody).insertAdjacentHTML('beforeend', messageHTML);
        //     }            
        // });
    }

    sendMessage(message) {
        const DOMMessageBox = document.querySelector(DOMElements.userMessageBox);
        var data = {
            type:'userMessage',
            message: message
        }; 
        ws.send(JSON.stringify(data));
        DOMMessageBox.value = '';
    }

    render() {
        const controlsHTML = `
            <div class="controls">
                <img class="baloon" src="./img/baloon.png" alt="baloon" />
			    <textarea class="message-box" rows="1"></textarea>
			    <img class="send-button" src="./img/send-button.png" />
            </div>
        `;
        const DOMControls = document.querySelector(DOMElements.sectionControls);
        DOMControls.insertAdjacentHTML('beforeend', controlsHTML);

        
        DOMControls.addEventListener('keypress', (event) => {
            const wsInst = new WsHelper();
            const ws = wsInst.get();
            console.log(ws);
            
            const DOMMessageBox = document.querySelector(DOMElements.userMessageBox);
            if(event.charCode == ENTER_KEY_CODE) {
                sendMessage(DOMMessageBox.value);
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