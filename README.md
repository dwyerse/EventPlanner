# EventPlanner

# About

# Setup

Installing Node.js:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```
```
sudo apt-get install -y nodejs
```
```
git clone https://github.com/dwyerse/EventPlanner.git
```
```
cd EventPlanner
```
```
npm install
```
```
npm start
```

## MongoDB setup
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
```
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```
```
sudo apt-get update
```
Install mongo
```
sudo apt-get install -y mongodb-org
```
## Run MongoDB server
### Run this each time to start the server
```
sudo service mongod start
```
```   
mongo --host 127.0.0.1:27017
```

## Setting up Selenium
Install dependencies
```
npm install
```
Run npm command to install all webdriverio drivers
```
npm run-script selenium-install
```
## Run the selenium service 
Note: this must be done every time you wish to test
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
