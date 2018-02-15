

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

## Setting up the git repository
Clone the repo
```
git clone https://github.com/dwyerse/EventPlanner.git
```
Enter the repo folder
```
cd EventPlanner
```
Run the install script
```
sudo chmod +x install.sh
./install.sh
```

## Selenium Setup
Run npm command to install all webdriverio drivers (in EventPlanner folder):
```
npm run-script selenium-install
```
# Running the Application
Run the mongodb server. (Defaults to localhost:27017)
```
sudo service mongod start
mongo --host 127.0.0.1:27017
```
In another terminal (in EventPlanner folder):
<br>Start the app server.  (Defaults to localhost:3000)
```
npm start
```
# Testing
All tests expect local app server on port 3000 and mongoDB server running. 
### Unit Tests
Unit test files found in ./test
<br>In a new terminal (in EventPlanner folder):
```
npm test
```
### Run the Selenium Tests
Note: this must be done every time you wish to test. To launch selenium standalone server:
```
npm run-script selenium-start
```
Selenium test files found in ./seleniumTest
<br>In a new terminal (in EventPlanner folder):
```
npm run-script selenium-test
```
# Testing implemented features
### Feature 1: 'I want to be able to login (change password/details/create account) - *Not yet complete!*'
Once app server and mongoDB server running:
- Point browser to http:://localhost:3000
- Click Create Account button
- Enter all required fields
- Click Create Account
- Return to homepage
- Click login buttons
- Enter credentials of previously created account
- Click login
- Dashboard with user credentials show should appear.
- Point browser to http://localhost:3000/edit/account to change account details
- Point browser to http://localhost:3000/edit/password to change password

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
