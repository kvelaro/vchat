const axios = require('axios');
import View from "./View";

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

        DOMLoginBtn.addEventListener('click', function(event) {
            axios.post(`http://localhost:3000/auth`, {
                'username': DOMUsername.value
            })
            .then(function (response) {
                if(response.data.error == false) {
                    let  data = JSON.stringify(response.data.data);
                    window.localStorage.setItem('auth', data);
                    window.location.href = '/';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        });
    }

}