const formatName = require('../utils/helper');
const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Manager = require('../lib/Manager');

const formatName = require('../utils/helper');

const addEmployee = employeeInfo => {
    let allCards = '';
    employeeInfo.forEach(employee => {
        const { firstName, lastName, id, role } = employee;
        let newEmployee = '';
        let extraInfo = '';

        switch (role) {
            case 'Manager': 
                newEmployee = new Manager(formatName(firstName), formatName(lastName), id, employee.officeNumber);
        }
    })
}