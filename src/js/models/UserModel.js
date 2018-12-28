export default class UserModel {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.status = user.status;
        this.avatar = user.avatar;
    }    
}