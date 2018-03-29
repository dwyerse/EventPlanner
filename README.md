

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
# Testing implemented features

- There is an admin user automatically added to the database, the following is their credentials: email: eventplanner.gp@gmail.com password: cs4098

### Feature 1: 'I want to be able to create account'
Once app server and mongoDB server running:
- Point browser to http://localhost:3000
- Click Create Account button
- Enter all required fields in create account form
- A success message will be displayed when you're redirected to login
### Feature 1: 'I want to be able to login to an account'
- Go to the homepage
- Click login button
- Enter credentials of account previously created or test admin user
- Should be redirected to a landing page displaying the user's details
### Feature 1: 'I want to be able to edit account details'
- Login to an account
- Click edit account button
- Make intended changes and submit
- Observe a success message on the edit page
### Feature 1: 'I want to be able to change my password'
- Login to an account
- Click change password button
- Enter new password and submit
- Observe a success message on the page
### Feature 2: 'I want to be able to give admin access to other people'
- Login as administrator user
- Click Grant Admin Access button
- This will proceed to grant admin access page
- Enter email of non-admin user account
- Click Grant button
- Confirmation of successfully granted admin access should appear
- Login as user that was just granted admin access
- Click Grant Admin Access button
- The user account can go to the grant admin access page because it now has admin access

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

### Feature 8/9: Send out inivitation(s)
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
- Create a new event or view an existing event
- Click edit button for event
- Click Register Guest button
- Fill in the email of a user account which has not been registered for the event
- Fill in the access requirements and dietary restrictions fields
- Click Register Guest button on this page
- A confirmation message should appear indicating that the user has been registered as a guest for this event.

### Feature 6: 'Keep track of possible/previous guests'
- Login as an administrator user
- Click View Previous Guests button
- If there are guests who have previously attended an event, their names, emails, and the titles of the events they have attended will be displayed as a list
- Click Go Back button to return to the landing page

### Feature 7: 'Track which guests are big spenders and/or regular donors' (This could be fused with Feature 6 e.g. Feature 6/7)
- Login as an administrator user
- Click View Previous Guests button
- If there are guests who have previously attended an event, the total amount of money they have donated, and the number of donations they have made, will be displayed in the list along with their names emails and the titles of the events they have attended
- Click Go Back button to return to the landing page

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

If the invitee has RSVP'd as attending, the invitee's name and email are displayed in the attendee report.
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
- Invites are labelled as 'Pending' or 'attending'
- Invitee that was just added should have value 'Pending'

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
- The invitee is now listed in the invite list as 'Attending'
- This invitee will now also be listed in the attendee report

### Feature 30: 'I want to see dietary requirements and access requirements of attendees so I can provide details to catering'
- Login as an administrator user
- Create a new event or view an existing event
- Click View Guest Details button on the view page for this event
- If guests have been invited to this event their details will be listed. Press Go Back button to return to the event view page
- If instead no guests had been registered for this event, a message will be displayed indicating this.

### Feature 31: 'I want to be able to share special dietary requirements (including table info for guest) with the caterers so that they can make appropriate arrangements'
- Login as an administrator user
- Create a new event or view an existing event
- Click View Guest Details button on the view page for this event
- If guests have been invited to this event their details will be listed
- To send an email of these details to catering, press the Send Details to Catering button to go to the Send Details page
- Fill in a sample contact email for catering and press the Send Guest Details button
- A pop-up confirmation box will appear, click the Confirm button
- You will be redirected to the view page for the event and a confirmation message should indicate that the email was sent successfully
- Login to the sample email you used for catering to confirm that the email containing guest details and table information has arrived

### Feature 17: 'Send out emails automatically when an event is created'
- Log in to an admin account that is subscribed for new event notifications
- Click Create Event button
- Enter event details and confirm
- Read and confirm the modal
- Should be redirected to the event page
- Go to inbox for email of subscribed admin account
- Observe an email is present stating that an event with the title provided has been created

### Feature 20: Subscribe to an event
- Create or login to an Account
- Create a new event or view an existing event
- Click subscribe button on the event page

### Feature 20: 'I would like to email (legitimately) subscribed users'
- Ensure a user account is subscribed to an event
- Log in to an admin account
- Go to an event page (eg localhost:3000/event/view/0) - Same event that the user is subscribed
- Click Contact Users button
- Choose to send email to subscribed users in the recipients dropdown. Complete the email details and send.
- Go to inbox for email of subscribed user account
- Observe an email is present matching the one previously sent

### Feature 21: 'I want to be able to contact attendees easily e.g. group emails'
- Log in to an admin account
- Go to an event page (eg localhost:3000/event/view/0)
- Ensure this user is either invited or an attendee (Has RSVP'd as going) of this event
- Click Contact Users button
- Choose to either send email to invitee or attendee (Depending on your user). Complete the email details and send.
- Go to inbox for email of subscribed admin account
- Observe an email is present matching the one previously sent

### Feature 24: 'I want to be able to see a report of who is attending an event'
- Create a new event or view an existing event
- Add an invitee to the invite list
- Register the invitee just added (create a user account with invitee's email, log in as administrator, view event, click edit, then register guest)
- From event view page, click the 'View Attendee Report' link
- Details including the guest's name, email, and access/dietary restrictions are listed here

### Feature 114: 'Admins can delete events'
- Create a new event or view an existing event for which no tickets have yet been sold or other payments made
- On the view page for that event, click the Delete button on the bottom of the page
- A pop-up confirmation box will appear, click the Confirm button to proceed with event deletion
- You will be redirected to the view events page and a confirmation message should be displayed indicating the event was deleted successfully
- An email will also be sent to all invitees of the event, informing them that the event has been cancelled


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
