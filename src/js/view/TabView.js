import View from "./View";

const DOMElements = {
    tab: '.tab',
    userChatZone: '.user-chat-zone'
}

export default class TabView extends View {
    
    constructor() {
        super();
        
    }   

    renderTabItem(userModel, setActive = true) {
        let tabTitleHTML = `
            <button class="tablinks ${(setActive == true) ? 'active' : ''}" data-href="#user-${userModel.id}">${userModel.username}</button>
        `;
        let tabContentHTML = `
            <div id="user-${userModel.id}" class="tabcontent active"></div>
        `;
        let DOMTab = document.querySelector(DOMElements.tab);
        let DOMTabContent = document.querySelector(DOMElements.userChatZone);
        
        let userTabTitleExist = Array.from(DOMTab.children).filter(item => item.dataset.href == `#user-${userModel.id}`);
        if(userTabTitleExist.length != 0) {
            userTabTitleExist = userTabTitleExist.pop();
        }
        let userTabContentExist = DOMTabContent.querySelector(`#user-${userModel.id}`);        
        Array.from(DOMTab.children).forEach(element => {
            element.classList.remove('active');
        });
        Array.from(DOMTabContent.children).forEach(element => {
            element.classList.remove('active');
        });
        //if tab not exist then add
        if(userTabContentExist == null) {            
            DOMTab.insertAdjacentHTML('beforeend', tabTitleHTML);
            DOMTabContent.insertAdjacentHTML('beforeend', tabContentHTML);
        }
        else {            
            userTabTitleExist.classList.add('active');
            userTabContentExist.classList.add('active');
        }
    }
    
}