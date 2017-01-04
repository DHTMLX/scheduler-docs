dhtmlxScheduler with PHP 
=====================

In this tutorial you will find necessary information on how to create a Scheduler using PHP and REST API on the server side.

There are tutorials intended for building server-side integration with the help of other platforms:

- howtostart_nodejs.md
- howtostart_dotnet.md
- howtostart_ruby.md

It seems obvious that while developing an application with PHP, one will use a ready framework instead of creating everything from scratch.

We will use the [Slim](https://www.slimframework.com/) framework together with REST API on the server side and MySQL as a data storage to create a Scheduler.

Step 1. Making Preparations
----------------------------

###Creating a project

We will make use of a [skeleton application](https://github.com/slimphp/Slim-Skeleton) for the Slim framework.

Firstly, we need to import the project and install it. You can easily do it with the help of composer:

~~~js
php composer.phar create-project slim/slim-skeleton scheduler-rest-php
~~~

If you have a composer installed globally, you can apply the following command:

~~~js
composer create-project slim/slim-skeleton scheduler-rest-php
~~~

Then you should check, if everything works fine. For this, go to the application folder and run web server:

~~~js
cd scheduler-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

After that you can open [http://127.0.0.1:8080]() in a browser and you will see the default Slim page.

###Downloading DHTMLX Scheduler

Now you need to [download DHTMLX Scheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml). 
Then extract the content of the archive into the *"public"* folder of the created project. You will have the following structure of folders:

<img src="php_folder_structure.png">

There are two more ways of installing Scheduler:

- from Bower by running the next command:

~~~js
bower install scheduler
~~~

- from NPM by using the command below:

~~~js
npm install dhtmlx-scheduler
~~~

<h3 id="init_scheduler">Initializing Scheduler and dataProcessor</h3>

The next step is to initialize a scheduler and connect it to a dataProcessor instance.
Find the *index.phtml* file in the *scheduler-rest-php/templates* directory and complete several simple steps:

- include dhtmlxscheduler.js and dhtmlxscheduler.css files on the page
- initialize scheduler and enable loading data into it
- set the date format that will be used to parse data from the data set with the api/scheduler_xml_date_template.md property
- initialize dataProcessor
- attach the dhtmlxDataProcessor object to the dhtmlxScheduler one
- set dataProcessor to the REST mode

The full code looks as follows:

~~~html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' 
          type='text/css'>
        <script src="./codebase/sources/dhtmlxscheduler.js" type="text/javascript" 
          charset="utf-8"></script>
        <link rel="stylesheet" href="./codebase/dhtmlxscheduler.css" type="text/css" 
          charset="utf-8">
        <style type="text/css">
            html, body{ height:100%; padding:0px; margin:0px; overflow: hidden;}
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
				<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
				<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
				<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
			</div>
			<div class="dhx_cal_header">
			</div>
			<div class="dhx_cal_data">
			</div>
		</div>
		<script>
			scheduler.config.xml_date = "%Y-%m-%d %H:%i:%s";
			scheduler.init("scheduler_here", new Date(2016, 11, 26), "week");
			scheduler.load("/event", "json");
			
			var dp = new dataProcessor("/event/");
            dp.init(scheduler);
            dp.setTransactionMode("REST");
		</script>
    </body>
</html>
~~~

Run [http://127.0.0.1:8080/]() in a browser and you will see that a scheduler is rendered on the page.

###Configuring a database

It's high time to prepare tables for our database. You can find a simple instruction on how to create a database in [this tutorial](howtostart_connector.md#step6databasestructure).

When a database is ready, we can go further and populate the events table with some test data. You can use the following SQL sample for this:

~~~js
INSERT INTO `events`(`start_date`, `end_date`, `text`) VALUES ('2016-12-28 09:00:00',
	'2016-12-28 10:00:00','Event #1');
INSERT INTO `events`(`start_date`, `end_date`, `text`) VALUES ('2016-12-29 10:00:00',
	'2016-12-29 12:00:00','Event #2');
INSERT INTO `events`(`start_date`, `end_date`, `text`) VALUES ('2016-12-30 11:00:00',
	'2016-12-30 15:00:00','Event #3');
INSERT INTO `events`(`start_date`, `end_date`, `text`) VALUES ('2016-12-31 11:00:00',
	'2016-12-31 15:00:00','Event #4');
INSERT INTO `events`(`start_date`, `end_date`, `text`) VALUES ('2016-12-31 16:00:00',
	'2016-12-31 17:00:00','Event #5');
~~~

So, we've finished preparing our project. Now we can proceed with data loading.


Step 2. Loading Data into Scheduler
--------------------------------

While [initializing Scheduler](#init_scheduler), we added the line below into the code:

~~~js
scheduler.load("/event", "json");
~~~

This command will send an AJAX request to the specified URL and take Gantt data in [JSON format](data_formats.md#json) as a response. Thus, we should add the necessary route for "/event". 
You can find the complete route scheme in the article [Server-Side Integration](server_integration.md#requestresponsedetails).

Open the *"public/index.php"* file. After the *$app* declaration add the code below:

{{snippet index.php}}
~~~php
function getConnection()
{
    $pdoSettings = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
 
    return new PDO("mysql:host=localhost;dbname=scheduler","root","root",$pdoSettings);
}
 
$app->get('/event', function($request, $response) {
    $conn = getConnection();
    $result = array();
	
	$result["data"] = array();
 
    foreach($conn->query("SELECT * FROM events") as $row){
        array_push($result["data"], $row);
    }
 
    return $response->withJson($result);
});
~~~

Let's consider this code in detail:

- we read all events from the database and set them to the $result object
- we send the *$result* object to the client side as JSON

Thus, we have implemented data loading into Scheduler. Open [http://127.0.0.1:8080/]() and you will see that the scheduler is now populated with the test data we added on the previous step.

<img src="php_scheduler_test_data.png">

Step 3. Updating Data on the Server
--------------------------------------

Our next step is to provide data updating on the server, i.e. to implement sending changes made on the client side to the server. 
In the *index.phtml* file we already have the following lines of code:

~~~js
var dp = new dataProcessor("/event");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

DataProcessor will react to each action on the client (i.e. adding data into chart, modifying or removing it) by sending an AJAX request to the server.

Such a request will include all the data necessary to save changes. We set the dataProcessor to the REST mode in order to make it send corresponding HTTP verbs 
for different operations. All CRUD requests are described in details in the [Server-Side Integration](server_integration.html#requestresponsedetails) article.

Well, now we will complete the index.php file with all the URLs and handlers that we need:

~~~php
// getting a response for a CRUD action
function prepareResponse($res, $action, $tid = NULL){
    $result = array(
        'action' => $action
    );
    if(isset($tid) && !is_null($tid)){
        $result['tid'] = $tid;
    }
    
    return $res->withJson($result);
}

// getting an event from the request data
function getEvent($data)
{
    return array(
        ':text' => $data["text"],
        ':start_date' => $data["start_date"],
        ':end_date' => $data["end_date"]
    );
}

// Insert event action
$app->post('/event/{id}', function($request, $response){
    $event = getEvent($request->getParsedBody());
    $conn = getConnection();
    $query = "INSERT INTO events(text, start_date, end_date) ".
  "VALUES (:text,:start_date,:end_date)";
    $conn->prepare($query)->execute($event);
    return prepareResponse($response, "inserted", $conn->lastInsertId());
});

// Update event action
$app->put('/event/{id}', function($request, $response){
    $sid = $request->getAttribute("id");
    $event = getEvent($request->getParsedBody());
    $conn = getConnection();
    $query = "UPDATE events ".
    "SET text = :text, start_date = :start_date, end_date = :end_date ".
    "WHERE id = :sid";
 
    $conn->prepare($query)->execute(array_merge($event, array(":sid"=>$sid)));
    return prepareResponse($response, "updated");
});

// Remove event action
$app->delete('/event/{id}', function($request, $response){
    $sid = $request->getAttribute("id");
    $conn = getConnection();
    $query = "DELETE FROM events WHERE id = :sid";
 
    $conn->prepare($query)->execute(array(":sid"=>$sid));
    return prepareResponse($response, "deleted");
});
~~~

Now let's see what we have inside of this code.

We make use of the route "/event" for requests related to operations with events.


###Requests

As for requests, we define three types of them:

- POST – for adding new items into the database
- PUT – for updating existing records 
- DELETE – for deleting records

###Responses

A response will come after each action. Each response will contain a JSON object containing the type of the performed operation.

The response for the *insert* action will also include the id of the new record in the database that will be applied on the client side.

If the operation fails, the "error" type should be returned.

Now everything is ready. Let’s run our application. Open [http://127.0.0.1:8080]() and enjoy a nice Scheduler we’ve just created.

<img src="php_ready_scheduler.png">