

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
#### The following are credentials for pre-populated users in the app
- There is an admin user automatically added to the database, the following is their credentials: email: eventplanner.gp@gmail.com password: cs4098
- There is a general user automatically added to the database, the following is their credentials: email: john.doe@gmail.com password: cs4098

#### The following is a guided tour of our completed system which showcases all of the completed features.



- Point browser to http://localhost:3000
- Click Create Account button
- Fill in account details (give email which you can access eg.) andrew.butterfield@scss.tcd.ie) and subscribe to new event notifications.
- Click Submit button
- Enter details of created account and click submit
- Click Edit Account
- Change name field and click confirm.
- Press Back button to return to landing page.
- Click Change Password
- Type in your new password in both fields and click confirm. (Remember this new password)
- Press Back button to return to landing page.
- Click logout button.
    - This shows Feature 1: Create Account and login
- Click login button
- Enter the admin credentials (Email: eventplanner.gp@gmail.com  Password: CS4098) and click submit.
- Click Grant Admin Access.
- Enter email of previously created user eg)andrew.butterfield@scss.tcd.ie and click grant.
- Press logout button on the navbar.
- Click login button
- Enter details of previously created user and click submit.
- Now admin actions are available
    - This shows Feature 2: I want to be able to give admin access to other people
- Click Create Event button
- Enter Event details and click confirm and confirm the popup confirmation.
- Check email supplied of previously created (and subscribed) user for event creation notification email.
    - This shows Feature 17: Send out emails automatically when an event is created
- You should now be on the created event page.
    - This shows Feature 4: I would like to be able to create an event e.g. a dinner
- Click subscribe button (To receive emails about event updates)
- Click Edit button
- Edit Event as required and click confirm.
- Confirm the event details have changed,
    - This shows Feature 5: I want to be able to update event information and submit event updates
- Check email supplied of previously created (and subscribed) user for event update notification email.
    - This shows Feature 20: I would like to email (legitimately) subscribed users
- Click Add Menu
- Click browse button to initiate file directory popup.
- Find and enter project folder (which was cloned)
- Select the file named: 'pdf-sample.pdf' and click open
- Enter menu name as desired (defaults to: 'Menu Name') and click upload
- Click back button to return to event page
- Click the new menu item displayed as the menu name provided
- The pdf sample should show in a new tab
- Close opened pdf tab if desired and return to event page
    - This shows Feature 29: I want to create menus
- Click on Invite List button
- Enter current users email eg) andrew.butterfield@scss.tcd.ie and click Add
- The invited user should be added to the invite list
    - This shows Feature 10: I want to see invite list
- Click Send Invites button
- Check email supplied of invited user for invitation notification email.
- In the email click on the link to RSVP
- When brought to application page, click 'Attending'
- If desired you can close this tab and return to tab with invite list page.
- Refresh this page and the invite list will show the invited guest is now Attending.
    * This shows Feature 8: I want to send invitations to a mailing list, so that people know to come and that they are invited
	* This shows Feature 9: Send out invitation(s)
	* This shows Feature 14: I want to be able to send automated invitations, with link to register for the event
- Click Back button to return to event page
- Click Edit button
- Click Register Guest button
- Enter email john.doe@gmail.com (This is a pre-populated user for testing)
- Enter access requirements and dietary restrictions as desired
- Click Register Guest
- Click View Attendee Report button
    * This shows Feature 13: As staff I need to register a guest for one event (including their details), so I can track what is need for the event (dietary, etc.)
	* This shows Feature 22: I want to be able to see the rsvp list
	* This shows Feature 12: I need to be able to manage the responses so I can know who is attending
	* This shows Feature 24: I want to be able to see a report of who is attending an event
- Click back button to return to event page
- Click Table Plan button
- Click Create table, enter desired table size in the popup and click confirm
    - This shows Feature 33: I want to be able to see the table plan
- Click edit button in created table
- Enter desired table label eg) Club A and change the names in seating allocation if required.
- Click confirm
- The created table should now have a label.
    - This shows Feature 35: I would like to be able to differentiate tables e.g. vip, tcd alumni
- Click back button to return to event page
- Click View Guest Details button
    - This shows Feature 11: I want to see guests contact details
- Click Send Details to Catering button
- Enter an email which you have access to eg) andrew.butterfield@scss.tcd.ie
- Press Send Guest Details buttons and press confirm in confirmation popup
    * This shows Feature 30: I want to see dietary requirements and access requirements of attendees so I can provide details to catering
    * This shows Feature 31: I want to be able to share special dietary requirements (including table info for guest) with the caterers so that they can make appropriate arrangements
- Click Contact Users
- Select 'Attending Guests' as recipients and enter desired subject and message
- Click Send Mail button
- Check email of current user (Who has RSVP'd as Attending) eg) andrew.butterfield@scss.tcd.ie
    - This shows Feature 21: I want to be able to contact attendees easily e.g. group emails
- Click Ticket Setup Button
- Enter the ticket and table setup as desired
- Click Confirm button
- Click Buy Tickets
- Select amount of ticket and/or tables desired
- Enter any access requirements and dietary restrictions
- Click Pay Now
- Enter Payment Details in popup (the payment is mocked so details entered are not verified) and click confirm
- Click My Tickets on navbar
    - This shows Feature 18: Online ticketing - keeping in mind that mostly repeat customers/attendees
- Click Events on navbar
- Click event page button of created event
- Click Invite List button
- The previously invited user should show as 'Has paid'
    - This shows Feature 23: I want to confirm people have paid to attend
- Click Back To Event button to return to event page
- Click Start Live Event
    - This shows Feature 123: I want to have a separate webpage that can be used to display live information to attendees during the event (a live screen)
- Click Add Milestone
- Enter milestone label and donation goal eg) 1000 and click Confirm
- Click Make Donation
- Enter a donation amount (greater than created milestone) and enter payment details (the payment system is mocked so details entered are not verified)
- Click confirm
- After approx 5 seconds, the on-screen celebration will show
    * This shows Feature 124: I want to have a tracker/counter that updates with donations throughout the event on the live screen
    * This shows Feature 125: I want to enter milestone amounts of money raised and have some kind of on-screen celebration when these are achieved
- Click Event Page to return to the event
- Click View Payments for this event
    - This shows Feature 49: I want to be able to accept/see payments
- Click Home on navbar
- Click View Previous Guests
    - This shows Feature 6: Keep track of possible/previous guests, Feature 7: Track which guests are big spenders and/or regular donors
- Click Back button
- Click Create Event
- Enter Event details and click confirm button and confirm the popup.
- Click Delete and confirm the popup
    - This shows Feature 114: Admins can delete events

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
