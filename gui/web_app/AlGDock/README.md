# Web Application

## Introduction
This application made in [nodejs](https://nodejs.org/en/) was made in order to communicate with the [Flask](http://flask.pocoo.org/) application listening on CCB cluster. A SSH connection is required to be established between them. The web pages will make HTTP requests and will expect an response in JSON. The files for the Flask application are [here](https://github.com/luizcieslak/AlGDock/tree/master/gui/api)

## Files and folders
* [app.js](https://github.com/luizcieslak/AlGDock/blob/master/gui/web_app/AlGDock/app.js) - The primary control script for the web application.
* [public](https://github.com/luizcieslak/AlGDock/tree/master/gui/web_app/AlGDock/public) - JS and CSS files used in the web pages.
* [public/models](https://github.com/luizcieslak/AlGDock/tree/master/gui/web_app/AlGDock/public/models) - DB models used in the project
* [routes](https://github.com/luizcieslak/AlGDock/tree/master/gui/web_app/AlGDock/routes) - Routes used in node
* [views](https://github.com/luizcieslak/AlGDock/tree/master/gui/web_app/AlGDock/views) - View files using [Hogan](http://twitter.github.io/hogan.js/)

## Quick Start

### Dependencies
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/download-center#community)


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
