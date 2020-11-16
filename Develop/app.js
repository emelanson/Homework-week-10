const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employeeObjectArray = [];

let initQuestion = [
    {
        type: "list",
        message: "What type of team member would you like to add?",
        choices: ["Manager", "Engineer", "Intern", new inquirer.Separator(), "List Employees", "END ADDITIONS"],
        name: "teamMember"
    },
]

let employeeQuestions = [
    {
        type: "input",
        message: "Please enter a name for this employee",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter a unique ID code for the employee",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter an email address for this employee",
        name: "email"
    },
]


var initPrompt = (question) => {
    inquirer
        .prompt(question)
        .then(function (ans) {
            if (ans.teamMember === "Manager") {
                console.log("Manager Branch");
                managerPrompt(employeeQuestions);

            } else if (ans.teamMember === "Engineer") {
                console.log("Engineer");
                return initPrompt(initQuestion);

            } else if (ans.teamMember === "Intern") {
                console.log("Intern");
                return initPrompt(initQuestion);

            } else if (ans.teamMember === "List Employees") {
                console.table(employeeObjectArray);
                return initPrompt(initQuestion);

            } else if (ans.teamMember === "END ADDITIONS") {
                console.log("Finishing up.  Thank you!");
                return
            }
        })
        .catch(err => { if (err) { console.log("There was an error!") } })
}

var managerPrompt = (question) => {
    let additionalQuestions = [{
        type: "input",
        message: "Please enter an office Number for this Manager",
        name: "officeNumber"
    },]

    let managerQuestions = question.concat(additionalQuestions);

    inquirer
        .prompt(managerQuestions)
        .then(function (ans) {
            let managerEmployee = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
            employeeObjectArray.push(managerEmployee);
            return initPrompt(initQuestion);
        })
}


initPrompt(initQuestion);


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
