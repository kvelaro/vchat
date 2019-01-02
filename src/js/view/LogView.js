import View from "./View";
import WsHelper from "../helpers/WsHelper";

const DOMElements = {
    sectionLog: '.log-section',
    logBody: '.log-body'
}

export default class LogView extends View {

    constructor() {
        super();
        const wsInst = new WsHelper();
        const ws = wsInst.get();
        ws.on('connect', function() {
            const messageHTML = `<p>Server message: Connected</p>`;
            document.querySelector(DOMElements.logBody).insertAdjacentHTML('beforeend', messageHTML);
        })

        ws.on('message', function(res) {
            let data = JSON.parse(res);
            
            if(data.type == 'serverMessage') {
              const messageHTML = `<p>Server message: ${data.message}</p>`;
              document.querySelector(DOMElements.logBody).insertAdjacentHTML('beforeend', messageHTML);
            }            
        });
    }

    render() {
        const logHTML = `
        <div class="log">
            <div class="log-title">
                <i class="maximize hidden">&#9633;</i>
                <i class="minimize">_</i>
            </div>
            <div class="log-body"></div>
        </div>
        `;
        const DOMLog = document.querySelector(DOMElements.sectionLog);
        DOMLog.insertAdjacentHTML('beforeend', logHTML);

        DOMLog.addEventListener('click', function(event) {
            let target = event.target;
            let parent = target.parentElement;
            if(target.classList.contains('minimize')) {
                document.querySelector(DOMElements.logBody).classList.add('hidden');
                target.classList.add('hidden');
                for(let i = 0; i < parent.children.length; i++) {
                    if(parent.children[i].classList.contains('maximize')) {
                        parent.children[i].classList.remove('hidden');
                    }                
                }
            }
            if(target.classList.contains('maximize')) {
                document.querySelector(DOMElements.logBody).classList.remove('hidden');
                target.classList.add('hidden');
                for(let i = 0; i < parent.children.length; i++) {
                    if(parent.children[i].classList.contains('minimize')) {
                        parent.children[i].classList.remove('hidden');
                    }                
                }
            }
        })
    }

}