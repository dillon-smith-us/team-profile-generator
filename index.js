const generateHTML = require('./src/generateHTML');
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
            if (allEmployees.some(employee => employee.role === 'Manager')) {
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
    }
]
