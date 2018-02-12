

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
Clone  the repo
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
Run npm command to install all webdriverio drivers
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
Start the app server.  (Defaults to localhost:3000)
```
npm start
```
# Testing
### Unit Tests
Expects local server on port 3000 and mongoDB server. Test files found in ./test
In another terminal (in EventPlanner folder):
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
# Testing implemented features
### Feature 1: 'I want to be able to login (change password/details/create account) - *Needs review!*'
Once app server and mongoDB server running:
- Point browser to http:://localhost:3000
- Click Create Account button
- Enter all required fields
- Click create Account
- Return to homepage
- Click login buttons
- Enter credentials of previously created account
-

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
