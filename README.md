# Project Title

 WebScraper with WebSocket and MySQL


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
NODEJS
EXPRESS
MYSQL
POSTMAN
```

### Installing

A step by step series of examples that tell you how to get a development env running

we need to clone the repo
```
git clone 
```
WE NEED TO CRAETE A SERVER-SIDE APP

```
npm init -y
```

CRAETE SERVER USING EXPRESS 

```
npm i express
```
For making HTTP requests to fetch data from ycombinator website

```
npm install axios

```
 For parsing and scraping HTML content.

```
npm install cheerio
```
 For WebSocket communication.

```
npm install ws
```
For interacting with the MySQL database.

```
npm install mysql2

```

## Running the tests

 how to run the automated tests for this system

### Break down into end to end tests

Create the Database
Log into MySQL using the terminal:
```
mysql -u root -p
```
Create a new database:
```
CREATE DATABASE hackernews;
```
Use the new database:
```
USE hackernews;
```
Create the Database
Log into MySQL using the terminal:
```
mysql -u root -p
```

### start the tests

Start the Application
Run the following command to start the server:

```
node src/main.js
```
Test the WebSocket
Run the WebSocket client to ensure main server is running:
`http://localhost:5000/api/stories.`
```
TO test RESTAPI USING POSTMAN USE THIS ENDPOINT:
```
http://localhost:5000/api/stories.
```
### OUTPUT PHOTO IS ATTCHED IN REPO
