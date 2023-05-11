const fs = require('fs');

/**
 * @typedef {Object} User
 * @property {Number|undefined} id
 * @property {String} email
 * @property {String} first
 * @property {String} last
 * @property {String} company
 * @property {String|undefined} created_at //Date in ISO 8601 Extended Format
 * @property {String} country
 */

const file = "users.json";



class Users {
    constructor() {}

    
         
    deletedId = [];
     /**
     * @returns {Number}
     */
    getNewId() {
        let newID;
        if (!(this.deletedId.length === 0)){
            newID = this.deletedId.pop();
        } else { 
            const users = this.getAllUsers();
            let lastID = parseInt(users[users.length - 1].id);
            newID = lastID + 1;
        }
        return newID;
    }
    



    /**
     * "parse"
     * @returns {User[]}
     */
    getAllUsers() {
        return JSON.parse(fs.readFileSync(file));
    }

    /**
     * 
     * @param {User[]} parsedData
     */
    writeToFile(parsedData) {
        fs.writeFileSync(file, JSON.stringify(parsedData));
    }

    /**
     * @param {Number} id
     * @param {User[]} parsedData
     * @returns {Number}
     */
    getIndexById(id, parsedData) {
        const index = parsedData.findIndex((user) => {
            return user.id == id;
        });

        if (index == -1) {
            console.log("Customer not found");
            return;
        }

        return index;
    }



    /**
     * @param {User} user (parsed)
     */
    addUser(user) {
        user.id = this.getNewId();
        console.log("user id"+user.id);
        user.created_at = new Date().toISOString();
        let users = this.getAllUsers();
        users.push(user);
        this.writeToFile(users);
    }


    // other way to do it
    updateUser(id, updatedUser) {
        const users = this.getAllUsers();
        const index = this.getIndexById(id, data);
        users[index] = updatedUser;
        this.writeToFile(users);
    }


    /**
     * @param {Number} id
     * @param {User} newUser
     */
    modifyUser(id, newUser) {
        let parsedData = this.getAllUsers();
        let index = this.getIndexById(id, parsedData);

        for (let property in parsedData[index]) {
            if (newUser[property] == undefined) continue;
            parsedData[index][property] = newUser[property];
        }

        this.writeToFile(parsedData);
    }

    /**
     * 
     * 
     * @param {Number} id
     */
    deleteUser(id) {
        this.deletedId.push(id); // remember id
        let parsedData = this.getAllUsers();
        const index = this.getIndexById(id, parsedData);

        parsedData.splice(index, 1);

        this.writeToFile(parsedData);
    }

}

module.exports = Users;
