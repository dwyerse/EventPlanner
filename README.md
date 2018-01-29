
# EventPlanner
### About
This Event Planner application was developed as part of CS4098.
#### Developers:
Seamus Dwyer
Luke Agnew
Ben Stratford
Sean Durban
# Setup
### Note: This setup is for target machine, Ubuntu 16.04
## Installing Node.js

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```
```
sudo apt-get install -y nodejs
```
## Setting up the git repository
Clone  the repo
```
git clone https://github.com/dwyerse/EventPlanner.git
```
Enter the repo folder
```
cd EventPlanner
```
Install project dependencies. (Found in package.json)
```
npm install
```

## MongoDB setup
Download mongoDB
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
```
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```
Ensure version is the latest release
```
sudo apt-get update
```
Install mongoDB
```
sudo apt-get install -y mongodb-org
```
## Selenium Setup
Run npm command to install all webdriverio drivers
```
npm run-script selenium-install
```
# Running the Application
Start the app server. (Defaults to localhost:3000)
```
npm start
```
# Testing
### Unit Tests
Expects local server on port 3000 and mongoDB server. Test files found in ./test
```
npm test
```
### Run the Selenium Tests
Note: this must be done every time you wish to test
```
npm run-script selenium-start
```
In a new terminal: To run the webdriver tests (Note: Expects local server on port 3000 and mongoDB server). Test files found in ./seleniumTest
```
npm run-script selenium-test
```
# Project Structure
This project top level structure is as follows
.
├── app.js
├── .gitignore
├── package.json
├── README
├── public	 
│   └── stylesheets
│       └── style.css
├── routes                   
│   ├── index.js
└── views
│   └── index.ejs
└── models
│   └── user.json
└── mapper
│   └── user_mapper.js
└── seleniumTest
└── test
# Errors
### Port already in use
Following commands work in 'git bash' terminal
```
netstat -ano
```
Then search for PID relating to relevant address and port
localhost is generally set as: 127.0.0.1:PORTNO
```
taskkill //PID *ENTER-PID-HERE* //F
```
A success message should follow
