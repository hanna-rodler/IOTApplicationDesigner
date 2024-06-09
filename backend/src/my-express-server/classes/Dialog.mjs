export default class Dialog{
    constructor(discover_prefix, connection) {
        this.discover_prefix = discover_prefix;
        this.connection = connection;
    }

    display(){
        console.log('dis_pref ', this.discover_prefix, '\nconnection: ', this.connection);
    }
}