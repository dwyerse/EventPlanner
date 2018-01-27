# EventPlanner

# About

# Setup

Installing Node.js:<br/>
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -<br/>
sudo apt-get install -y nodejs


git clone https://github.com/dwyerse/EventPlanner.git<br/>
cd EventPlanner<br/>

npm install<br/>
npm start<br/>

## Setting up Selenium
Install dependencies
```
npm install
```
Run npm command to install all webdriverio drivers
```
npm run-script selenium-install
```
Run the selenium service (Note: this must be done every time you wish to test)
```
npm run-script selenium-start
```
To run the webdriver tests (Note:Expects local server on port 3000)
```
npm test
```

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
