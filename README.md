

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

# Running the Application
Run the launch script
```
sudo chmod +x launch.sh
./launch
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

### Feature 2: 'I want to be able to give admin access to other people'
- Login as non-admin user created from testing previous feature
- Click Grant Admin Access button
- This user account will not be allowed to proceed to grant admin access page because it currently lacks admin access
- Return to homepage
- Login as administrator user - email: admin@eventplanner password: cs4098
- Click Grant Admin Access button
- This account will be allowed to proceed to grant admin access page because it has admin access
- Enter email of non-admin user account created from testing previous feature
- Click Grant button
- Confirmation of successfully granted admin access should appear
- Return to Homepage
- Login as user that was just granted admin access
- Click Grant Admin Access button
- The user account will now be allowed to proceed to the grant admin access page because it now has admin access

### Feature 4: I would like to be able to create an event e.g. a dinner
- Login as an administrator user
- Click Create Event button on the landing page
- Fill in the details for the event
- Click the confirm button
- You will be redirected to the event page

### Feature 5: I want to be able to update event information and submit event updates
- Create a new event or view an existing event
- Click 'Edit' button
- Update event information using form fields
- Click confirm button
- You will be redirected to the event page with updated details.

### Feature 9: Send out inivitation(s)	
- Login as an administrator user
- Create a new event or view an existing event
- Add an invitee by typing their email into the input labelled 'Add new invite' and press the add button
- An email will be automatically sent to their email address

### Feature 14: I want to be able to send automated invitations, with link to register for the event
- Login as an administrator user
- Create a new event or view an existing event
- Add an invitee,typing an email(with an accessible inbox) into the input labelled 'Add new invite' and press the add button.
- A new invitee will appear in the list , the response field will say 'Pending'.
- An email will be automatically sent to the inputted email address.
- Open a new tab, and navigate to the inbox of the email address specified
- Click on the link contained in the email 
- The options on the response page are 'Attending' or 'Not Attending', choose an option.
- The page will update with the response
- Refresh the event page, the user response field will have updated with the correct response.

### Feature 13: 'As staff, I need to register a guest for one event (including their details), so I can track what is needed for the event (dietary, ...)'
- Login as an administrator user
- Ensure an event has been created e.g. event with id 0. If necessary create an event as per the instructions for Feature 4
- Point browser to http://localhost:3000/event/edit/0
- Click Register Guest button
- Fill in the email of a user account which has not been registered for the event
- Fill in the access requirements and dietary restrictions fields
- Click Register Guest button on this page
- A confirmation message should appear indicating that the user has been registered as a guest for this event.

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

### Feature 10: 'I want to see the invite list'
- Log in as administrator
- Create a new event or view an existing event
- The invite list is displayed on this screen
- To add an invitee, type their email into the input labelled 'Add new invite' and press the add button
- To remove an invitee, press the 'delete' button beside their email

### Feature 11: 'I want to see guest contact details'
- Log in as administrator
- Create a new event or view an existing event
- Add an invitee to the invite list
- Invitee's contact email is displayed on the invite list

If the invitee is registered for the event, the invitee's name and email are displayed in the attendee report. 
To view this:
- Register the invitee (create a user account with invitee's email, log in as administrator, view event, click edit, then register guest)
- From event view page, click the 'View Attendee Report' link
- Details about all attendees are displayed here

### Feature 12: 'I need to be able to manage the responses so I can know who is attending'
This feature describes the viewing, removal, and confirmation of user responses.

To view responses:
- Log in as administrator
- Create a new event or view an existing event
- Add an invitee to the invite list
- Responses are listed in the invite list displayed
- Invites are labelled as 'pending' or 'attending'
- Invitee that was just added should have value 'pending'

To view only those attending, you can view the attendee report:
- Register the invitee just added (create a user account with invitee's email, log in as administrator, view event, click edit, then register guest)
- From event view page, click the 'View Attendee Report' link
- Details about all attendees are displayed here

To remove an invite (for example if an invitee has responded that they are not attending and
you wish to remove them from the list):

- Create a new event or view an existing event
- Add an invitee to the invite list
- Press the 'delete' button to remove the invite

To confirm an invitee's attendance
- Add an invitee to the invite list
- Register the invitee (create a user account with invitee's email, log in as administrator, view event, click edit, then register guest)
- The invitee is now listed in the invite list as 'accepted'
- This invitee will now also be listed in the attendee report

### Feature 24: 'I want to be able to see a report of who is attending an event'

- Create a new event or view an existing event
- Add an invitee to the invite list
- Register the invitee just added (create a user account with invitee's email, log in as administrator, view event, click edit, then register guest)
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
