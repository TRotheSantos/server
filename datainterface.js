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

    
    static count = 9999;
         
    deletedId = [];
     /**
     * @returns {Number}
     */
    getNewId() {
        let newID;
        if (!(this.deletedId === 0)){
            newID = this.deletedId.pop();
        } else {
            Users.count++;
            newID = count;
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

    /**old version
     * @returns {Number}
     */
    // getNewId() {
    //     const parsedData = this.getAllUsers();
    //     return parsedData[length - 1].id + 1;
    // }




    /**
     * @param {User} user (parsed)
     */
    addUser(user) {
        user.id = getNewId();
        user.created_at = new Date().toISOString();
        let users = this.getAllUsers();
        users.push(user);
        fs.writeFileSync(file, JSON.stringify(users, null, 2));
    }

    updateUser(id, updatedUser) {
        const data = this.getAllUsers();
        const index = this.getIndexById(id, data);
        data[index] = updatedUser;
        fs.writeFileSync("users.json", JSON.stringify(data));
    }


    // /**
    //  * @param {Number} id
    //  * @param {User} newUser
    //  */
    // modifyUser(id, newUser) {
    //     let parsedData = this.getAllUsers();
    //     let index = this.getIndexById(id, parsedData);

    //     for (let property in parsedData[index]) {
    //         if (newUser[property] == undefined) continue;
    //         parsedData[index][property] = newUser[property];
    //     }

    //     this.writeToFile(parsedData);
    // }

    /**
     * Not sure if it works, Yafets approach
     * @param {Number} id
     */
    deleteUser(id) {
        this.deletedId.push(id); // added
        let parsedData = this.getAllUsers();
        const index = this.getIndexById(id, parsedData);

        parsedData.splice(index, 1);

        this.writeToFile(parsedData);
    }

}

module.exports = Users;
