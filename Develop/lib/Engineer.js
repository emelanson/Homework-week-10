// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, role, github) {
        super(name, id, email, role);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;

const engineer1 = new Engineer("elijah", "me", "Email", "Engineer", "emelanson");
console.log(engineer1);