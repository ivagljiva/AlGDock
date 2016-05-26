# Web Application

##Quick Start

### Dependencies
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/download-center#community)
* 

### Setup

1 - Install the npm packages
```
npm install
```

2 - Configure email for nodemailer package (run it from /public/ folder)

```
cd public
mailer.sh [accountUserName] [accountPassword] > mailer.js
```

3 - Create /data/db folder for MongoDB use on root (you can create manually on Windows)

```
#For linux
sudo mkdir -p /data/db
```

4 - Run the MongoDB server in a terminal

```
mongod
```

5 - Run node at this folder
```
node bin/www
```
