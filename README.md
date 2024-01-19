# Election System

Welcome to the Election Management System, a platform designed to facilitate the management of elections. This system provides features for conducting, monitoring, and analyzing elections. Below you will find instructions for installation, usage, and contributing to the project.
this project is preferred to be run on windows but also works for mac.


## Prerequisites

[Node.js](https://nodejs.org/en/download)  installed on your machine.

[MongoDB](https://mongodb.com/)  installed locally or accessible.

## Installation of Dependencies

install the project files on your computer and navigate to  the project directory 

*Open Two Separate Terminals , in the first terminal run following commands to install dependencies
```bash
cd Frontend
npm i --force
```
*Open second terminal for the backend and run following commands.
```bash
cd Backend
npm install
```

## Running the Project
*After Installation navigate to the first Terminal and write following command.
## FrontEnd
```bash

npm start
```
This will result in website running on port 3000
[http://localhost:3000](http://localhost:3000)

*Then Navigate to the Second Terminal and write the following command to run the server side.
## Backend

```bash

node server.js
```
This will result in backend running on port 5001
[http://localhost:5001](http://localhost:5001)
 



## Keep in  mind

* Make sure you run these commands one by one on each terminal

* Make sure you have Node and Mongo Install
* Make sure you have .env file included in the backend folder where MONGO_URI is present , you can use your own string as well and change it there.

## By following these steps you will be able to run the project

⚠️*if you want to use your own DB*
* For using your own DB you have to open Mongo compass and make a new collection 
named gevsdb and cluster named users ,
* copy the connection string and paste it in the .env file located in Backend folder




## License

[MIT](https://choosealicense.com/licenses/mit/)