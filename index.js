const fs = require('fs');
const inquirer = require('inquirer')
const generatePage = require('./src/html-template.js')
const formatName = require('./utils/helper');
const employees1 = [];
const questions = [
    {
        type: 'list',
        name: 'position',
        message: 'what is the employee\'s position?',
        choices: () => {
            if (employees1.some(employee => employee.position === 'Manager')) {
                return['Engineer', 'Intern']
            } else {
                return['Manager', 'Engineer', 'Intern']
            }
        }
    },
    {
        type: 'input',
        name: 'firstName',
        message: ({position}) => `What is the ${position.toLowerCase()}'s first name?`,
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
        when: ({ position }) => {
            if (position === 'Manager') {
                return true;
            } else {
                return false;
            }
        },
        validate: officeNumberInput => {
            if (!isNaN(parseInt(officeNumberInput))) {
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
        when: ({ position }) => {
            if (position === 'Engineer') {
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
        when: ({ position }) => {
            if (position === 'Intern') {
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
        employees1.push(userResponse);
        if (userResponse.newEmployee) {
            return promptUser();
        } else {
            return employees1;
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