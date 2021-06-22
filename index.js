const fs = require('fs');
const inquirer = require('inquirer')
const generatePage = Require('./src/page-template.js')
const formatName = require('./utils/helper');
const employees = [];
const questions = [
    {
        type: 'list',
        name: 'role',
        message: 'what is the employee\'s role?',
        choices: () => {
            if (employees.some(employee => employee.role === 'Manager')) {
                return['Engineer', 'Intern']
            } else {
                return['Manager', 'Engineer', 'Intern']
            }
        }
    },
    {
        type: 'input',
        name: 'firstName',
        message: ({role}) => `What is the ${role.toLowerCase()}'s first name?`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter a first name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: ({firstName}) => `What is ${formatName(firstName)}'s last name?`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter a last name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s id number?`,
        valdate: idInput => {
            if (!isNaN(parseInt(idInput))) {
                return true;
            } else {
                console.log('Please enter a valid id number!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s office number?`,
        when: ({ role }) => {
            if (role === 'Manager') {
                return true;
            } else {
                return false;
            }
        },
        validate: officeNumberInput => {
            if (!isNaN(parseInt(officeNumer))) {
                return true;
            } else {
                console.log('Please enter a valid office number!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s github? username?`,
        when: ({ role }) => {
            if (role === 'Engineer') {
                return true;
            } else {
                return false;
            }
        },
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter a username!');
                return false;
            }
        }
    },
    {
        type: 'input', 
        name: 'school',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s school name?`,
        when: ({ role }) => {
            if (role === 'Intern') {
                return true;
            } else {
                return false;
            }
        },
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log('Please enter a school name!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'newEmployee',
        message: 'Add a new employee profile?',
        default: true
    }
]

const promptUser = () => {
    return inquirer.prompt(questions)
    .then(userResponse => {
        employees.push(userResponse);
        if (userResponse.newEmployee) {
            return promptUser();
        } else {
            return employees;
        };
    });
};

const writePage = (html) => {
    fs.writeFile('./dist/index.html', html, err => {
        if (err) {
            throw err
        };
        console.log('HTML Page Created!');
    });
};

console.log(`Welcome to your Team Profile Generator. Please add some employees!`);

promptUser()
    .then(data => generatePage(data))
    .then(finishedHtml => writePage(finishedHtml))
    .catch(err => console.log(err));