// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown  =  require('./utils/generateMarkdown');

var pattern = /[^a-zA-Z0-9]+/g;

// TODO: Create an array of questions for user input
const questions = [ 
            {
              type: 'input',
              name: 'username',
              message: "Enter your username: ",
            },
            {
              type: 'input',
              name: 'email',
              message: "Enter your email: ",
            },
            {
              type: 'input',
              name: 'title',
              message: "What's the name of the project?",
              validate(value) {
                const pass = value.match(pattern);
                if (!pass) {
                  return true;
                }
          
                return 'Please enter a valid project name!';
              },
            }, {
              type: 'input',
              name: 'description',
              message: "Write a short description of your project?",
            },
            {
                  type: 'list',
                  name: 'licence',
                  message: 'What kind of Licence the project requires?',
                  choices: ['MIT', 'APACHE 2.0' ,'GPL 3.0' , 'BDS 3' , 'Open Source Software Licence' ,'PDL' , 'Proprietary Licence', 'User Licensing', 'None' ],
                  when(answers) {
                    return answers.licence !== 'Nope, all good!';
                  },
                },
                {
                  type: 'input',
                  name: 'installation',
                  message: "What commands should be run  to install dependancies?",
                },
                {
                  type: 'input',
                  name: 'tests',
                  message: "What commands should be run  to run tests?",
                },
                {
                  type: 'input',
                  name: 'information',
                  message: "What does the user need to know about using the repository?",
                },
           
                {
                  type: 'input',
                  name: 'contributors',
                  message: "What does the user need to know about contributing to the repository?",
                },
                {
                  type: 'list',
                  name: 'confirm',
                  message: 'Generate README file: ',
                  choices: ['Yes', 'No'],
                },
            ]

// TODO: Create a function to write README file

function writeToFile(fileName, data) {
  
    fs.appendFile(`./${fileName}`, data, (err) =>{
        console.error(err);
    }); 
}
// TODO: Create a function to initialize app
function init() {

            inquirer.prompt(questions).then((answers) => {
               console.log(answers.confirm);
              // console.log(JSON.stringify(answers, null, '  '));
              if(answers.confirm === 'Yes')
              { 
                  const data = generateMarkdown(answers);
                  writeToFile('README.md', data);
              }
            });
      }

// Function call to initialize app
init();
