PHP Code Samples
===================

This article is devoted to integration of Scheduler with server side implemented in PHP and REST API.

To get more information on how to use Scheduler with PHP, read the [extended tutorial](howtostart_php.md).

If you use some other technology, check the list of related articles below:

- server_nodejs.md
- server_dotnet.md
- server_ruby.md

We will use the [Slim](http://www.slimframework.com/) framework together with REST API on the server side and MySQL as a data storage to create Scheduler.

Making Preparations
-----------------------

We will make use of a [skeleton application](https://github.com/slimphp/Slim-Skeleton) for the Slim framework.

Firstly, we need to import the project and install it. You can easily do it with the help of composer:

~~~php
php composer.phar create-project slim/slim-skeleton scheduler-rest-php
~~~

If you have composer installed globally, you can apply the following command:

~~~php
composer create-project slim/slim-skeleton scheduler-rest-php
~~~

Then you should check if everything works fine. For this, go to the application folder and run webserver:

~~~php
cd scheduler-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Loading Data 
-------------

While initializing Scheduler [on the client side](server_integration.md#technique), we added the line below into the code:

~~~js
scheduler.load("/event", "json");
~~~

This command will send an AJAX request to the specified URL and take Scheduler data in [JSON format](data_formats.md#json) as a response. 
Thus, we should add the necessary route for "/event". You can find the complete route scheme in the article server_integration.md#technique.

Open the *index.php* file. After the *$app* declaration add the code below:

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

- we read all events from the database and set them to the *$result* object
- we send the *$result* object to the client side as JSON

Saving Data
----------

The following [client-side](server_integration.md#technique) code is responsible for sending updates that happen on the client side back to the server:

~~~js
var dp = scheduler.createDataProcessor("/event");
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


To complete all stages of creating Scheduler with PHP on the server side, read the [extended tutorial](howtostart_php.md).
