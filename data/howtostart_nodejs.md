dhtmlxScheduler with Node.js 
===================================

The current tutorial is intended for creating Scheduler with Node.js and REST API on the server side. 
If you use some other technology, check the list of available integration variants below:

- howtostart_php.md
- howtostart_php_laravel.md
- howtostart_ruby.md
- howtostart_connector.md

Our implementation of Scheduler with Node.js will be based on REST API that will be used for communication with server. 
Node.js has a set of ready-made solutions, so we won't have to code everything from the very beginning.

This tutorial uses the [Express](http://expressjs.com/) framework and MySQL as a data storage.

Have a look at the [demo](https://github.com/DHTMLX/scheduler-howto-node) on GitHub.


Step 1. Initializing the Project
-------------------------------

### Creating project

To begin with, create a new application using yarn:

~~~
$ mkdir scheduler-howto-nodejs
$ cd ./scheduler-howto-nodejs
$ yarn init
~~~

There is a set of simple questions you need to answer during initialization of a new app:

~~~
$ question name (scheduler-howto-nodejs):
$ question version (1.0.0):
$ question description: My scheduler backend
$ question entry point (index.js): server.js
$ question repository url:
$ question author: Me
$ question license (MIT): MIT
$ question private:
$ success Saved package.json
~~~

The package manager will create a *package.json* file that will look similar to this:

~~~
{
    "name": "scheduler-backend",
    "version": "1.0.0",
    "main": "index.js",
    "author": "Me",
    "license": "MIT",
}
~~~

### Adding dependencies and installing modules

As it was said at the beginning, the [Express](http://expressjs.com/) framework and MySQL are used for creating the demo.

{{note You should setup your MySQL server, or use some service, e.g. [Free MySQL Hosting](https://www.freemysqlhosting.net/).}}

Add express, mysql, body-parser and date-format-lite modules:

~~~
$ yarn add express mysql body-parser date-format-lite
~~~

**server.js** has been specified as the entry point above. Now you should create this file with the code below:

{{snippet server.js}}
~~~
const express = require("express"); // use Express
const bodyParser = require("body-parser"); // for parsing POST requests
const app = express(); // create application
const port = 3000; // port for listening

// It's necessary for parsing POST requests
// the line below is used for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// start server
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
~~~

Then open the **package.json** file, and add the "scripts" section:

~~~
"scripts": {
    "start": "node index.js"
}
~~~

After that **package.json** looks like this:

~~~
{
    "name": "scheduler-backend",
    "version": "1.0.0",
    "main": "index.js",
    "author": "Me",
    "license": "MIT",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {
        "body-parser": "^1.18.3",
        "date-format-lite": "^17.7.0",
        "express": "^4.16.4",
        "mysql": "^2.16.0"
    }
}
~~~

Now you can start the server:

~~~
$ yarn start
~~~

or

~~~
$ npm start
~~~


Step 2. Adding Scheduler to the Page
---------------------------------

Create a directory to place your frontend HTML/CSS/JS files:

~~~
$ mkdir ./public
~~~

Then create an *index.html* file in the **public** directory:

{{snippet public/index.html}}
~~~html
<!doctype html>
<html>
    <head>
        <title>DHTMLX Sсheduler example</title>
        <meta charset="utf-8">
        <!-- scheduler -->
        <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js" 
        	charset="utf-8"></script>
      <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler_material.css" 
      		rel="stylesheet" type="text/css" charset="utf-8">
        <style>
            html, body{
                margin:0px;
                padding:0px;
                height:100%;
                overflow:hidden;
            }
        </style>
    </head>
    <body>
        <div id="scheduler_here" class="dhx_cal_container" 
        	style='width:100%; height:100%;'>
            <div class="dhx_cal_navline">
                <div class="dhx_cal_prev_button">&nbsp;</div>
                <div class="dhx_cal_next_button">&nbsp;</div>
                <div class="dhx_cal_today_button"></div>
                <div class="dhx_cal_date"></div>
                <div class="dhx_cal_tab" name="day_tab"></div>
                <div class="dhx_cal_tab" name="week_tab"></div>
                <div class="dhx_cal_tab" name="month_tab"></div>
            </div>
            <div class="dhx_cal_header"></div>
            <div class="dhx_cal_data"></div>
        </div>
        <script>
            // set format of dates in the data source
            scheduler.config.xml_date="%Y-%m-%d %H:%i";
            scheduler.init('scheduler_here', new Date(2018,0,20), "month");

            scheduler.load("http://localhost:3000/data", "json");

            var dp = new dataProcessor("http://localhost:3000/data");
            // use RESTful API on the backend
            dp.setTransactionMode("REST");
            dp.init(scheduler);
        </script>
    </body>
</html>
~~~

The above code defines a simple HTML layout, adds sources of dhtmlxScheduler from CDN and initializes scheduler using the api/scheduler_init.md method.
Note that 100% height is specified for the document body and for the scheduler container. Scheduler will use the size of its container, so some initial sizes are required.

### Setup routes

After you have added a new page, you need to make it accessible from a browser. For this tutorial, scheduler will be the default page of an app.

Add the code below to **server.js** before `"app.listen(...);"`:

{{snippet server.js}}
~~~
// return static pages from the "./public" directory
app.use(express.static(__dirname + "/public"));
~~~

Run the app again to make sure it did the trick.

Now when you open the URL *http://localhost:3000/* in a browser, you should see the *index.html* page.

![Scheduler initialization](howtostart_nodejs_init.png)


Step 3. Preparing a Database
-------------------------

So, you've got an empty scheduler. Let's connect it to the database and define methods to read and write events to it.


### Creating a database

First things first, we need a database to work with. You can create a database with your favorite mysql-client, or via the console.

To create a database with a mysql-client, open it and execute the code below:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
~~~

To import with a mysql-console, create a *dump.sql* file with the code above. And execute command in the shell:

~~~
$ mysql -uuser -ppass scheduler < dump.sql
~~~

Let's define MySQL connection settings in a constant in **server.js**. They will be used later in the storage.

{{snippet server.js}}
~~~
// MySQL will be used for db access and util to promisify queries
const util = require("util");
const mysql = require('mysql');

// use your own parameters for database
const mysqlConfig = {
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "scheduler_howto_node"
};
~~~

When it's done, you can connect to this database from the app as follows:

{{snippet server.js }}
~~~
// open connection to mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);
~~~

Here [connection pooling](https://github.com/mysqljs/mysql#pooling-connections) is used and [queries are wrapped into Promises](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original).
It's not strictly necessary for our app to work, but it will definitely look good later on.

At the next step all the database access will be put into a separate class called Storage. It'll handle database connection and all CRUD actions.


Step 4. Implementing CRUD
--------------------

### Implementing data access

All the read/write logic will be defined in a separate module `Storage`. It'll take mysql connection and a table name and perform simple CRUD to the specified table: read all the events,
insert new events, update or delete the existing ones. 

For this, create the file *storage.js* and add the code below into it:

{{snippet storage.js}}
~~~
require("date-format-lite"); // add date format

class Storage {
    constructor(connection, table) {
        this._db = connection;
        this.table = "events"table;
    }

    // get events from the table, use dynamic loading if parameters sent
    async getAll(params) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];

        let result = await this._db.query(query, queryParams);

        result.forEach((entry) => {
            // format date and time
            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
    }

    // create new event
    async insert(data) {
        let result = await this._db.query(
            "INSERT INTO ?? (`start_date`, `end_date`, `text`) VALUES (?,?,?)",
            [this.table, data.start_date, data.end_date, data.text]);

        return {
            action: "inserted",
            tid: result.insertId
        }
    }

    // update event
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);

        return {
            action: "updated"
        }
    }

    // delete event
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);

        return {
            action: "deleted"
        }
    }
}

module.exports = Storage;
~~~

### Routing

Then you need to set up routes, so the storage could be accessed by the scheduler you have placed on the page.

For this, create another helper module and call it `router`:

{{snippet router.js}}

~~~
function callMethod (method) {
    return async (req, res) => {
        let result;

        try {
            result = await method(req, res);
        } catch (e) {
            result =  {
                action: "error",
                message: e.message
            }
        }

        res.send(result);
    }
};

module.exports = {
    setRoutes (app, prefix, storage) {
        app.get(`${prefix}`, callMethod((req) => {
            return storage.getAll(req.query);
        }));

        app.post(`${prefix}`, callMethod((req) => {
            return storage.insert(req.body);
        }));

        app.put(`${prefix}/:id`, callMethod((req) => {
            return storage.update(req.params.id, req.body);
        }));

        app.delete(`${prefix}/:id`, callMethod((req) => {
            return storage.delete(req.params.id);
        }));
    }
};
~~~

All it does is sets up the application to listen request URLs that scheduler can send and calls the appropriate methods of the storage. 

Note, that all methods are wrapped into `try-catch` blocks, for you to be able to capture any error and return an appropriate error response to the 
client. Check more info on [error handling](https://docs.dhtmlx.com/scheduler/server_integration.html#errorhandling).

Also note that we hide exception message to the response. It's pretty handy during the development, but in the production environment it can be a good idea 
to hide these messages from the client side, since raw mysql exceptions that get there may contain sensitive data.

### Getting it work together

Finally, when all parts are done you can connect Storage to the application via Router:

{{snippet server.js }}
~~~
const router = require("./router");

// open connection to mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

// add listeners to basic CRUD requests
const Storage = require("./storage");
const storage = new Storage(connectionPool, "events");
router.setRoutes(app, "/events", storage);
~~~

If you restart the application now, you should be able to create delete and modify events in scheduler, all changes will be there after you reload the page.

![Scheduler CRUD](howtostart_nodejs_crud.png)


