Node.js Code Samples
==================================

The current article describes the steps that should be completed on the server side implemented with Node.js and REST API
for loading data into Scheduler and storing changes on the server. 

You can find more information in the [full tutorial](howtostart_nodejs.md) on using Scheduler with Node.js.

If you use some other technology, check the list of available integration variants below:

- server_php.md
- server_dotnet.md
- server_ruby.md


Making preparations
---------------------

We need to begin with adding some dependencies on the server side.
The necessary dependencies are:

- [Express](http://expressjs.com/) module
- [body-parser](https://www.npmjs.com/package/body-parser) module
- [date-format-lite](https://www.npmjs.com/package/date-format-lite) - a small module that will be used to convert dates of Scheduler entries into the format 
compatible with the client-side Scheduler API

~~~js
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

require("date-format-lite");
~~~

Loading data
---------------

[On the client side](server_integration.md#technique) we've initialized scheduler and added the following line:

~~~js
scheduler.load("/data", "json");
~~~

It will send an AJAX request to the specified [URL](server_integration.md#requestresponsedetails), 
expecting to get a [JSON](data_formats.md#json) response with Scheduler data. 

So, on the server side we should add a server route for this URL. It will generate the corresponding response.
For this purpose, add the following code on the server side:

~~~js
app.get("/data", function(req, res){
    db.event.find().toArray(function(err, data){
        //set id property for all records
        for (var i = 0; i < data.length; i++)
        {
            data[i].id = data[i]._id;
            data[i].start_date = data[i].start_date.format(dateFormat);
            data[i].end_date = data[i].end_date.format(dateFormat);
        }
 
        //output response
        res.send(data);
    });
});
~~~

In the above code we read events from database tables and format dates so the client side could parse them. 
After that we'll send the collected data to the HTTP response.

Saving data
-----------

The following [client-side](server_integration.md#technique) code is responsible for sending updates that happen on the client side back to the server:

~~~js
var dp = new dataProcessor("/data/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Each time data is added to, changed or deleted from Scheduler, dataProcessor will send an AJAX request
containing all the necessary details for saving changes into the database.
dataProcessor in the REST mode will use different HTTP verbs for each type of operation. 

You can find the details in the [list](server_integration.md#requestresponsedetails) of HTTP methods and the related URLs.

To apply the changes in the database, we need to add the required routes and handlers on the server side:

~~~js
app.post("/data/:id", function(req, res){
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

In the above code we've specified the route for events entities. The *"/data/:id"* URL will serve for requests.


###Types of requests

- POST request implies that a new item should be inserted into database
- PUT updates an existing record
- DELETE performs deleting

###Responses

All the actions return a JSON response containing the type of the performed operation or "error" if something went wrong.

A response for the "insert" action will also contain the database id of the new record. It will be applied on the client side, 
so the new item could be mapped to the database entity.

