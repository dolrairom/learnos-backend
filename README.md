# LearnOs
This project was created for the course Design of Dynamic Web Systems at Luleå University of Technology

### General vision
Programming is more than just writing code. There are a ton of different programming languages out there, all aiming to accomplish one task: to make things for the computer. Nowadays programming has awakened a big interest and a lot of people are wondering how to do it. LearnOs is a great tool to learn how to program in an interactive and easy way

### Technologies
As many web applications, our project counts with many different technologies. As an overall, our project is based on the MEAN Stack. As we had no previous knowledge of web design, we made a research on the different technologies that are used nowadays, and we found out the powerful and popular framework Mean Stack (MongoDB, Express, Angular, NodeJS). Nevertheless, we decided to change Angular by React. This decision was made because ReactJS has a superior performance at the moment to manipulate the DOM, and this has a great impact when dealing with long lists that constantly change in our visualization. 

### Software parts
The website is made up of some components that holds it together: 
* Frontend: It is mainly implemented with ReactJS that is able to manage routes assigning them different views using React Routes. Also, HTML5 is used for developing the views, as well as CSS to style the website.  All the frontend is allocated in the src folder.   
  
* Backend: It is developed with Node.js, managing all the requests made to the server. All the backend is allocated in the backend folder, as well as the file “server.js”. 

* Database: The website count with a simple database based on the NoSQL database program MongoDB. 

* Hosting: Heroku is used as the cloud Platform-as-a-Service(PaaS) for the deployment of the website. 

### Installation instructions
In order to install the LearnOS source code, one simply needs to go to https://github.com/LuleaUniversityOfTechnology/m7011e17-learnos and clone the repository. 
To use the application, the only thing you need is ensuring Node.js is installed (assuming that npm is already installed).  
The next step is installing the node modules that are included in the package.json file, running  npm install in the command line.  T
o run the application is just needed to call npm start. 
It is important to add that in the backend folder exists other package.json, so it is necessary to repeat the command once inside that folder, and to call npm start again from a different terminal.

### References
For developing the website we research on all the technologies used at diverse websites:
* Documentation related both MongoClient and Mongoose for the correct use of the database (https://docs.mongodb.com) 
* Information about express packages (https://www.npmjs.com) 
* Heroku Dev Center for learning how to deploy the website with Heroku (https://devcenter.heroku.com) 
* StackOverFlow to solve practically all the problems we found (https://stackoverflow.com)
* CodeAcademy to learn the programming languages (https://www.codecademy.com/) 
