dhtmlxScheduler with Node.js 
===================================

The current tutorial is intended for creating Scheduler with Node.js and REST API on the server side. 
If you use some other technology, check the list of available integration variants below:

- howtostart_php.md
- howtostart_dotnet.md
- howtostart_ruby.md

Our implementation of Scheduler with Node.js will be based on REST API that will be used for communication with server. 
Node.js has a set of ready-made solutions, so we won’t have to code everything from the very beginning.

Have a look at the [demo](https://github.com/DHTMLX/node-scheduler-demo) on GitHub.


Step 1. Making Preparations
-------------------------------

To begin with, we'll create a project folder and then add the required dependencies. We'll make use of the following modules:

- [Express](http://expressjs.com/) - a tiny framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - a Node.js parsing tool
- [date-format-lite](https://github.com/litejs/date-format-lite) - a small library that will help us to convert dates of Scheduler entries into the proper format
- [node-mysql](https://github.com/alcaeus/mongo-php-adapter) - a Node.js client for working with MySQL

So, let's create a project folder and name it "scheduler-rest-node":

~~~js
mkdir scheduler-rest-node
cd scheduler-rest-node
~~~

After that create a file *package.json*. We'll specify the dependencies in it with the following command:

~~~js
npm init -y
~~~

When the file is ready, open it and put the above listed dependencies into it. The result will look similar to this one:

~~~js
{
  "name": "scheduler-rest-node",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.15.0",
    "date-format-lite": "^0.7.4",
    "express": "^4.13.4",
    "mongodb": "^2.1.14",
    "mongoskin": "^2.0.3"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
~~~

Finally, we need to install the added dependencies using the command below:

~~~js
npm install
~~~

One more thing we should do at this step is to create an empty file *server.js*. We will need it later.


Step 2. Initializing Scheduler
--------------------------

Firstly, create a folder with the name "public". This folder will contain the dhtmlxScheduler codebase and the main page of the application - *index.html*.

Let's add the *index.html* file into the public folder. Thus, the folder structure will be as follows:

<img src="node_folder_structure.png">

Now, open the *index.html* file and fill it with the following content:

{{snippet "index.html" file}}
~~~html
<!DOCTYPE html>
<html>
   <head>
	  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
   </head>
	   <script src="./codebase/sources/dhtmlxscheduler.js" type="text/javascript" 
          charset="utf-8"></script>
	   <link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css" type="text/css" 
          media="screen" title="no title" charset="utf-8">
		
    <style type="text/css" media="screen">
		html, body{ margin:0px; padding:0px; height:100%; overflow:hidden; }	
	</style>

	<script type="text/javascript" charset="utf-8">
		function init() {
			scheduler.config.xml_date="%Y-%m-%d %H:%i";
			
			scheduler.init('scheduler_here',new Date(2016,3,1),"month");
			scheduler.load("/data", "json");
			
			var dp = new dataProcessor("/data/");
			dp.init(scheduler);
			dp.setTransactionMode("REST");
		}
	</script>

	<body onload="init();">
	    <div id="scheduler_here" class="dhx_cal_container" 
          style='width:100%; height:100%;'>
			<div class="dhx_cal_navline">
				<div class="dhx_cal_prev_button">&nbsp;</div>
				<div class="dhx_cal_next_button">&nbsp;</div>
				<div class="dhx_cal_today_button"></div>
				<div class="dhx_cal_date"></div>
				<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
				<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
				<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
			</div>
			<div class="dhx_cal_header">
			</div>
			<div class="dhx_cal_data">
			</div>
		</div>
	</body>
</html>
~~~

Here we've created a simple page layout and added the required js and css files from scheduler codebase.

The code initializes a scheduler together with dataProcessor and sets the necessary configuration settings. 
It also enables data loading for the scheduler.

The “/data” URL will serve as a data source and the entry point for dataProcessor requests, we’ll consider it a bit later.
The important point is that dataProcessor should be initialized in the REST mode. To get more information, read the server_integration.md#savingdatafromrestserver
article.


Step 3. Preparing a Database
-------------------------

The next step is to create a database. We'll make a simple database with two tables.

Check a detailed example [here](howtostart_connector.md#step6databasestructure).

Step 4. Making Connection to Database
--------------------------

Now we need to connect to the database. Open the *server.js* file that we have added at the [Step 1](howtostart_nodejs.md#step1makingpreparations) and add
the following code into it:

~~~js
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = 3000;

var db = require('mongoskin').db("localhost/testdb", { w: 0});
    db.bind('event');


var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/init', function(req, res){
	db.event.insert({ 
		text:"My test event A", 
		start_date: new Date(2013,8,1),
		end_date:	new Date(2013,8,5)
	});
	db.event.insert({ 
		text:"My test event B", 
		start_date: new Date(2013,8,19),
		end_date:	new Date(2013,8,24)
	});
	db.event.insert({ 
		text:"Morning event", 
		start_date: new Date(2013,8,4,4,0),
		end_date:	new Date(2013,8,4,14,0)
	});
	db.event.insert({ 
		text:"One more test event", 
		start_date: new Date(2013,8,3),
		end_date:	new Date(2013,8,8),
		color: "#DD8616"
	});

	res.send("Test events were added to the database")
});

app.listen(port, function(){
	console.log("Server is running on port "+port+"...");
});
~~~

What we have done in this code:

- opened MySql connection to our database (we’ll need it later, for now just make sure you’ve specified actual connection parameters)
- specified the "public" folder as the root directory of an application
- attached the application to 3000 port of the localhost


We’ll implement an actual database loading and saving later, but now we can run the app and
make sure everything goes as expected so far. Go to the project folder and run following line from command line:
 
~~~js
node server.js
~~~

Then open [http://127.0.0.1:3000]() in a browser. You should see a page with an empty scheduler like the one shown below:

<img src="node_empty_scheduler.png">

Step 5. Loading Events into Scheduler
----------------------------

At the previous step we’ve added a function to load initial data. So, you can open [http://127.0.0.1:3000/init]() to load initial events.

Now, let’s enable data loading. As you might remember, when we initialized scheduler in *index.html*, we've added following line:

~~~js
scheduler.load("/data", "json");
~~~

It will send an AJAX request to the specified URL ([see the details](server_integration.md#technique)), expecting to get a [JSON](data_formats.md#json) response with scheduler data.

Now we’ll add a server route for this URL which will generate an appropriate response.
Open *server.js* and add the following code:

~~~js
app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
		{
			data[i].id = data[i]._id;
			data[i].start_date = data[i].start_date.format("YYYY-MM-DD hh:mm");
			data[i].end_date = data[i].end_date.format("YYYY-MM-DD hh:mm");
		}
		
		//output response
		res.send(data);
	});
});
~~~

The code reads events from db and formats dates so the client side could parse them. 
After that we’ll send the collected data to http response.

If we run application now and open [http://127.0.0.1:3000](), we should see that the test data we’ve previously added to the database is loaded into scheduler.

<img src="node_scheduler_test_data.png">

Step 6. Saving Data
---------------------

The last thing that we should implement is data saving. For this we need a code that will send updates happening on the client side back to the server.

The good news is that we already have such a code in the *index.html* file. Right here:

~~~js
var dp = new dataProcessor("/data/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Let's dive deeper and see what role it plays.

###Requests and responses

Each time a user adds, modifies or deletes something from the scheduler, DataProcessor will send an AJAX request. The request will contain all 
the parameters required to save changes into the database.

Since DataProcessor is initialized in the REST mode, it will use different HTTP verbs for each type of operation. 
The list of HTTP verbs together with request and response details is given in the [Server-Side Integration](server_integration.md#requestresponsedetails) article.

Now we’ll add the required routes and handlers that will put changes into the database. Open the *server.js* file and add the following code:

~~~js
app.post('/data/:id', function(req, res){
	var event = getEvent(req.body);
	
	db.event.insert(event, function(err, result){
		sendResponse(res, "inserted", result ?result.ops[0]._id:null, err);
	});
});

app.put("/data/:id", function(req, res){
	var event = getEvent(req.body),
		sid = req.params.id;
	
	db.event.updateById(sid, event, function(err, result){
		sendResponse(res, "updated", null, err);
	});
});

app.delete("/data/:id", function(req,res){
	var sid = req.params.id;
	db.event.removeById(sid, function(err, result){
		sendResponse(res, "deleted", null, err);
	});
});


function sendResponse(res, mode, tid, error){
	if(error)
	{
		console.log(error);
		type = "error";
	}
	
	var result = {
		type: mode
	};
	if(tid !== undefined && tid !== null)
		result.tid = tid;
	
	res.send(result);
}

function getEvent(data){
	var result = {};
	for(var i in data){
		result[i] = data[i];
		if(i == "start_date" || i == "end_date")
			result[i] = result[i].date();
	}
	return result;
}
~~~

We have created the route for events entities. The "/data/:id" URL will serve for requests.

The requests types are pretty simple:

- *POST* - to insert a new item into the database
- *PUT* - to update an existing record
- *DELETE* - to remove an item

The response will be a JSON object with the type of performed operation or "error" in case the code fails.

The response for the POST request will also contain the database id of the new record. 
It will be applied on the client side, so it will be possible to map a new item to the database entity.

If we run application now and open [http://127.0.0.1:3000]() we should have a fully operational scheduler:

<img src="node_ready_scheduler.png">
