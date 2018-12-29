import Controller from "./controller"
import UserModel from "../models/UserModel";
import UserView from "../view/UserView";

const axios = require('axios');
class Main extends Controller {
    constructor() {
        super();
    }
    mainPage() {
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

    
}

let mainInstance = new Main();
mainInstance.mainPage();