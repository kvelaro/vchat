import Model from "./Model";
export default class UserModel extends Model {
    constructor(user) {
        super();
        this.id = user.id;
        this.username = user.username;
        this.status = user.status;
        this.avatar = user.avatar;
    }    
}