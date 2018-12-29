import config from "../config/main";
import Controller from "./controller"
import UserModel from "../models/UserModel";
import UserView from "../view/UserView";
import ControlsView from "../view/ControlsView";
import io from 'socket.io-client';

const axios = require('axios');
class MainController extends Controller {
    constructor() {
        super();
    }
    initWs() {
        this.socket = io(config.wsHost);
        this.socket.on('connect', function(){
            console.log('WS is active');
        });
        this.socket.on('message', function(res) {
            let data = JSON.parse(res);
            console.log(data.type);
            const imageHTML = `<img src="./img/avatar.png" alt="Avatar" />`;
            const messageHTML = `<p>${data.message}</p>`;
            const message = `
                <div class="message">
				${(data.type == "mymessage") ? messageHTML + imageHTML : imageHTML + messageHTML}
				</div>
            `;
            document.querySelector('.user-chat-zone').insertAdjacentHTML('beforeend', message);

        });
        this.socket.on('disconnect', function(){});

    }
    initUsers() {
        let users = [];
        let userView = new UserView();
        axios.get('/data/userlist.json')
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
        controlsView.render(this.socket);
    }

    mainPage() {
        this.initWs();
        this.initUsers();
        this.initControls();
    }

    
}

let mainInstance = new MainController();
mainInstance.mainPage();