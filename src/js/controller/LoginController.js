import Controller from "./controller"
import LoginView from "../view/LoginView";
import WsHelper from "../helpers/WsHelper";


const axios = require('axios');
class LoginController extends Controller {
    constructor() {
        super();
    }
    
    loginPage() {
        const loginView = new LoginView();
        loginView.render();
    }

    
}

let loginInstance = new LoginController();
loginInstance.loginPage();