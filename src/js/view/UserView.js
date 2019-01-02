import View from "./View";
import Tab from "./TabView"
import TabView from "./TabView";
let defaultAvatar = require("../../img/avatar-default.png");

const DOMElements = {
    userList: '.users-list'
}

export default class UserView extends View {
    
    constructor() {
        super();
    }
    
    renderUser(userModel) {
        const statusString = userModel.status.charAt(0).toUpperCase() + userModel.status.slice(1);
        let userHtml = `
            <div class="user" data-href="${userModel.id}">
                <div class="avatar">
                    <img src="${userModel.avatar}" alt="avatar">
                </div>
                <div class="user-details">
                    <div class="username">${userModel.username}</div>
                    <div class="user-status">
                        <i class="status-${userModel.status}"></i>
                        <span class="status-text">${statusString}</span>	
                    </div>							
                </div>							
            </div>
        `;

        let domUserList = document.querySelector(DOMElements.userList);
        domUserList.insertAdjacentHTML('beforeend', userHtml); 
    }

    renderUserList(userModels) {
        userModels.forEach(element => {
            this.renderUser(element);
        });
        let domUserList = document.querySelector(DOMElements.userList); 
        domUserList.addEventListener('click', function(event) {
            let activeUser = null;
            let element = event.target;
            while (true) {
                console.log(element);
                let classList = element.classList || [];   
                if(classList.length != 0 && classList.contains('user')) {
                    activeUser = element;                    
                    break;
                }
                element = element.parentNode;
            }
            
            if(activeUser != null) {                
                let filter = userModels.filter(userModel => userModel.id == activeUser.dataset.href);
                if(filter.length != 0) {
                    let userModel = filter.pop();
                    let tabUser = new TabView();
                    tabUser.renderTabItem(userModel);

                    const wsInst = new WsHelper();
                    const ws = wsInst.get();

                    

                    let data = {
                        type: 'service',
                        message: '',
                        data: {
                            nsp: 
                        }

                    }
                }                
            }            
        });
        
    } 
}