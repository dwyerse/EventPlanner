

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

### Feature 29: 'I want to create menus'
- Create a new event or view an existing event
- Click Edit button
- Click the Add Menu link
- Click the Browse button
- Select a pdf file to upload as the menu, for example pdf-sample.pdf in the root directory of eventplanner
- Type in a name for the menu or leave it as 'Menu Name'
- Click the Upload button
- The menu should appear uder the Current menus for this event header
- To view the menu, click the menu's name here or in the event view or edit page
- Click the back link to return to the edit screen of the event

### Feature 30: 'I want to see dietary requirements and access requirements of attendees so I can provide details to catering'
- Login as an administrator user
- Create a new event or view an existing event
- Click View Guest Details button on the view page for this event
- If guests have been registered for this event their details will be listed. Press Go Back button to return to the event view page
- If instead no guests had been registered for this event, a message will be displayed indicating this.
- Register new guest(s) for the event as per the instructions for Feature 13
- Return to the view page for this event
- Click View Guest Details button
- Newly registered guests and their access requirements, dietary requirements should now be displayed

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
