import Controller from "./controller"
import UserModel from "../models/UserModel";
import UserView from "../view/UserView";
import ControlsView from "../view/ControlsView";
import LogView from "../view/LogView";
import WsHelper from "../helpers/WsHelper";

const axios = require('axios');
class MainController extends Controller {
    constructor() {
        super();
    }

    checkUser() {
        let auth = window.localStorage.getItem('auth');
        if(auth == null) {
            window.location.href = '/login.html';
        }
        auth = JSON.parse(auth);
    }

    initWs() {
        new WsHelper();

        // this.socket.on('message', function(res) {
        //     let data = JSON.parse(res);
        //     console.log(data.type);
        //     const imageHTML = `<img src="./img/avatar.png" alt="Avatar" />`;
        //     const messageHTML = `<p>${data.message}</p>`;
        //     const message = `
        //         <div class="message">
		// 		${(data.type == "mymessage") ? messageHTML + imageHTML : imageHTML + messageHTML}
		// 		</div>
        //     `;
        //     document.querySelector('.user-chat-zone').insertAdjacentHTML('beforeend', message);

        // });
        // this.socket.on('disconnect', function(){});

    }
    initUsers() {
        let users = [];
        let userView = new UserView();

        let auth = JSON.parse(window.localStorage.getItem('auth'));
        axios.get(`http://localhost:3000/users?id=${auth.id}&aaa=bbb`)
            .then(function (response) {
                Array.from(response.data).forEach(element => {                    
                    let userModel = new UserModel(element);
                    users.push(userModel);
                });
                userView.renderUserList(users);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    initControls() {
        const controlsView = new ControlsView();
        controlsView.render();
    }
    
    initLog() {
        const logView = new LogView();
        logView.render();
    }

    mainPage() {
        this.checkUser();
        this.initWs();
        this.initUsers();
        this.initControls();
        this.initLog();
    }

    
}

let mainInstance = new MainController();
mainInstance.mainPage();