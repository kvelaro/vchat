import io from 'socket.io-client';
import config from "../config/main";
export default class WsHelper {
    constructor(ns = '/') {
        if(this.socket != false) {
            this.socket;
        }
        try {
            this.socket = io(`${config.wsHost}${ns}`);
        }
        catch (error) {
            this.socket = false;
        }        
    }

    get() {
        return this.socket;
    }
}