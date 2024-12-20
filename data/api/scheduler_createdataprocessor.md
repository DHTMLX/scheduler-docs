createDataProcessor
=============

@short: creates a new dataProcessor instance and attaches it to scheduler
	

@params:
- config	string,object 		a dataProcessor configuration object

@returns: 
- dataProcessor		object		the dataProcessor object


@example:
var dp = scheduler.createDataProcessor({
	url: "/api",
	mode: "REST"
});

@template:	api_method
@descr:
The method can take one of the following types of parameters:

1\. `{url:string, mode:string}` object specifying one of the predefined modes of sending data

~~~js
var dp = scheduler.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

where:

- url - the URL to the server side
- mode - the mode of sending data to the server: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. Or a custom router object:

~~~js
var dp = scheduler.createDataProcessor(router);
~~~

where the router is either a function:

~~~js
// entity - "event"
// action - "create"|"update"|"delete"
// data - an object with event data
// id – the id of a processed object (event)
var dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
           	return scheduler.ajax.post(
                server + "/" + entity,
                data
           	);
        break;
        case "update":
           	return scheduler.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
           	return scheduler.ajax.del(
                server + "/" + entity + "/" + id
           	);
        break;
   	}
});
~~~

or an object of the following structure:

~~~js
var dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

All the functions of the router object should return either a Promise or a data response object. This is needed for the dataProcessor to apply the database id and to hook the **onAfterUpdate** event of the data processor.

~~~js
router = function(entity, action, data, id) {
	return new scheduler.Promise(function(resolve, reject) {
    	// … some logic
        return resolve({tid: databaseId});
 	});
}
~~~

Thus you can use DataProcessor for saving data in localStorage, or any other storage which is not linked to a certain URL, or in case if there are two different servers (URLs) responsible for creation and deletion of objects.


@related:
	server_integration.md
