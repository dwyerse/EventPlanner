

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

### Feature 10: 'I want to see the invite list'
- Create a new event or view an existing event
- The invite list is displayed on this screen
- To add an invitee, type their email into the input labelled 'Add new invite' and press the add button
- To remove an invitee, press the 'delete' button beside their email

### Feature 11: 'I want to see guest contact details'
- Create a new event or view an existing event
- Add an invitee to the invite list
- Invitee's contact email is displayed on the invite list

If the invitee is registered for the event, the invitee's name and email are displayed in the attendee report. 
To view this:
- Register the invitee
- From event view page, click the 'View Attendee Report' link
- Details about all attendees are displayed here

### Feature 12: 'I need to be able to manage the responses so I can know who is attending'
This feature describes the viewing, removal, and confirmation of user responses.

To view responses:
- Create a new event or view an existing event
- Add an invitee to the invite list
- Responses are listed in the invite list displayed
- Invites are labelled as 'pending' or 'attending'
- Invitee that was just added should have value 'pending'

To view only those attending, you can view the attendee report:
- Register the invitee just added
- From event view page, click the 'View Attendee Report' link
- Details about all attendees are displayed here

To remove an invite (for example if an invitee has responded that they are not attending and
you wish to remove them from the list):

- Create a new event or view an existing event
- Add an invitee to the invite list
- Press the 'delete' button to remove the invite

To confirm an invitee's attendance
- Add an invitee to the invite list
- Register the invitee
- The invitee is now listed in the invite list as 'accepted'
- This invitee will now also be listed in the attendee report

### Feature 24: 'I want to be able to see a report of who is attending an event'
- Create a new event or view an existing event
- Add an invitee to the invite list
- Register the invitee just added
- From event view page, click the 'View Attendee Report' link
- Details including the guest's name, email, and access/dietary restrictions are listed here

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
