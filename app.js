const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//empty array to which employees are added
const employees = [];

//writes HTML file
writeFile = (html) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFile(outputPath, html, err => {
        if (err) {
            console.log(err);
        }
        console.log(`File Location: ${outputPath}`);
    });
};

//addEmployee function will determine whether new employee is added or is user selects none, writeFile will be triggered
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add another employee?",
            name: "employeeType",
            choices: ["Engineer", "Intern", "Manager", "None"]
        }
    ]).then((ans) => {
        if (ans.employeeType === "Engineer") {
            addEngineer();
        } else if (ans.employeeType === "Intern") {
            addIntern();
        } else if (ans.employeeType === "Manager") {
            addManager();
        } else if (ans.employeeType === "None") {
            const html = render(employees);
            writeFile(html);
        }
    })
};

const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github url?"
        }
    ]).then((ans) => {
        const engineer = new Engineer(ans.name, ans.id, ans.email, ans.github);
        employees.push(engineer);
        addEmployee();
    })
};

const addIntern = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?"
        },
    ]).then((ans) => {
        const intern = new Intern(ans.name, ans.id, ans.email, ans.school);
        employees.push(intern);
        addEmployee();
    })
}

//addManager function is run, the user is asked to appEmployee
const addManager = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter your manager's office number.",
        }
    ]).then((ans) => {
        const manager = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
        employees.push(manager);
        addEmployee();
    })


};

addManager()

