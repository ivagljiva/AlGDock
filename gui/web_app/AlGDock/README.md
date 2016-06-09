# Web Application

##Quick Start

### Dependencies
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/download-center#community)
* 

### Setup

1- Clone this repository to your computer

2- Download and install Node.js and MongoDB

3 - Navigate to .../AlgDock/gui/web_app/AlgDock and install the npm packages with the command:

```
npm install
```

4 - Create a new email account to use the application.

5 - Configure this email for nodemailer package (navigate to the .../AlgDock/gui/web_app/AlgDock/public/ folder) using the commands:

```
cd public
mailer.sh [accountUserName] [accountPassword] > mailer.js
```

6 - Create /data/db folder, for MongoDB to use, on your root directory (you can create it manually on Windows)

```
#For linux
sudo mkdir -p /data/db
```

7 - Run the MongoDB server in a terminal with the command:

```
mongod
```

8 - Open a new terminal and run node at the .../AlgDock/gui/web_app/AlgDock folder with the command:

```
node bin/www
```

9 - Access the following address on your browser:

```
localhost:3000
```
