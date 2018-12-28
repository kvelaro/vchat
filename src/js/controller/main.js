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
        axios.get('/data/userlist.json')
            .then(function (response) {
                Array.from(response.data).forEach(element => {
                    //let userView = new UserView();
                    let userModel = new UserModel(element);
                        
                    
                })
                
            })
            .catch(function (error) {
                console.log(error);
            });
  
    }

    
}

let mainInstance = new Main();
mainInstance.mainPage();