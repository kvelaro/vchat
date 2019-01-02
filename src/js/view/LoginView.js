import View from "./View";
import WsHelper from "../helpers/WsHelper";

const DOMElements = {
    username: 'username',
    password: 'password',
    loginBtn: 'btn-login'    
}

export default class LoginView extends View {

    constructor() {
        super();        
    }

    render() {
        const DOMUsername = document.querySelector(`input[name="${DOMElements.username}"`);
        const DOMLoginBtn = document.querySelector(`input[name="${DOMElements.loginBtn}"`);

        const wsInst = new WsHelper();
        const ws = wsInst.get();

        ws.on('message', function(res) {
            let response = JSON.parse(res);
            switch(response.type) {
                case 'auth':
                    if(response.error == false) {
                        let  data = JSON.stringify(response.data);
                        window.localStorage.setItem('auth', data);
                        window.location.href = '/';
                    }
                default:
                break;
            }
            
        });

        DOMLoginBtn.addEventListener('click', function(event) {
            let data = {
                type: 'auth',
                message: '',
                data: {
                    'username': DOMUsername.value
                }
            }
            
            ws.send(JSON.stringify(data));
            DOMUsername.value = '';
        });

        
    }

}