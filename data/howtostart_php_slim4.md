dhtmlxScheduler with PHP:Slim 
=================================

In this tutorial you will find necessary information on how to create a PHP-based Scheduler using Slim 4 Framework and REST API on the server side.

{{note This tutorial uses Slim Framework v4.x.
If you need a tutorial for an older version, check the [Slim Framework v3.x](howtostart_php.html) guide.}}

There are tutorials intended for building server-side integration with the help of other platforms and frameworks:

- howtostart_dotnet_core.md
- howtostart_dotnet.md
- howtostart_nodejs.md
- howtostart_plain_php.md
- howtostart_php_laravel.md
- howtostart_salesforce.md
- howtostart_ruby.md
- howtostart_connector.md

It seems obvious that while developing an application with PHP, one will use a ready framework instead of creating everything from scratch.

We will use the [Slim 4](https://www.slimframework.com/) framework together with REST API on the server side and MySQL as a data storage to create a Scheduler.
CRUD logic will rely on PDO and will be generic enough to be usable with any other framework.

You can have a look at the [ready demo on GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim). Follow the step-by-step guide to create such an application.

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim).
}}

Step 1. Initializing a project
----------------------------

###Creating a project

We will make use of a [skeleton application](https://github.com/slimphp/Slim-Skeleton) for the Slim 4 framework.

So you should start with creating an application with the help of Composer:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
~~~

Step 2. Adding Scheduler to the page
----------------------------

The next step is to add a scheduler on a page. It includes two simple sub-steps, described below.

###Creating a view

Create a * basic.html* file in the `app` app/templates folder:

{{snippet app/templates/basic.html}}
~~~html
<!doctype html>
<html>
  <head>
    <title> Getting started with dhtmlxScheduler</title>
      <meta charset="utf-8">
       <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
       <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
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
            scheduler.config.xml_date="%Y-%m-%d %H:%i";
            scheduler.init('scheduler_here', new Date(2019,0,20), "week");
            scheduler.load("/events", "json");
 
            var dp = scheduler.createDataProcessor("/events");
            dp.init(scheduler);
            dp.setTransactionMode("REST"); // use to transfer data with REST
        </script> 
  </body> 
</html>
~~~

###Setting up routes

After a new page is added, you need to make it accessible from a browser. Add a route to **app/routes.php**:

{{snippet app/routes.php }}
~~~
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents('../app/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Now you can run the app to see that a scheduler is rendered on a page:

![Scheduler initialization](php_init_slim4.png)

Step 3. Preparing database
-------------------------

So, you've got an empty scheduler. It's time to create a database and connect it to our app.

###Creating database

You can create a database from your favorite mysql-client (for example, phpMyAdmin), or via the console. Here is SQL to create a new database with a table for calendar events:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
~~~

To import via a mysql-console, create a *dump.sql* file with the code above. And execute the command below in the shell:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

Open your *app/settings.php* file, add an array with database settings, and update it with your configurations:

{{snippet app/settings.php }}
~~~php
'pdo' => [
	'engine' => 'mysql',
	'host' => 'localhost',
	'database' => 'scheduler',
	'username' => 'user',
	'password' => 'pass',
	'charset' => 'utf8',
	'collation' => 'utf8_unicode_ci',

	'options' => [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => true,
	],
]
~~~

After that go to *app/dependencies.php* in order to add a PDO instance into the app:

{{snippet app/dependencies.php }}
~~~
// Inject a new instance of PDO into the container
$containerBuilder->addDefinitions([
  PDO::class => function (ContainerInterface $container) {
    $config = $container->get('settings')['pdo'];
    $dsn = "{$config['engine']}:host={$config['host']};dbname={$config['database']};
        charset={$config['charset']}";
    $username = $config['username'];
    $password = $config['password'];
    return new PDO($dsn, $username, $password, $config['options']);
  },
]);
~~~

Step 4. Loading data
------------------

Our scheduler already calls the "/events" URL to retrieve events. Now we can add a handler for that request and populate scheduler with actual data.

Since scheduler will need several different handlers, we'll use [route groups](https://www.slimframework.com/docs/v4/objects/routing.html#route-groups) of the Slim 4 framework in order to keep them organized.

Open the *app/routes.php* file, and add a group "/events", and actions into it:

{{snippet app/routes.php}}
~~~php
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $query = $db->prepare($queryText);
        $query->execute();
        $result = $query->fetchAll();
        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
});
~~~

Now if you add some events into the database, they will appear in your scheduler.

###Dynamic loading

Currently scheduler loads all records from the events table on startup. It can work well if you know that the amount of data will remain small over time. But when scheduler is used for something like a planning/booking
application and you don't delete or move obsolete records to another table, the amounts of data will build up fairly quickly. As a result, in a couple of months of active usage you may find that your app requests a couple of MBs 
of events each time a user loads the page.

It can be easily avoided by using dynamic loading. Scheduler will add the displayed dates to the request parameters and you'll be able to return only the records that need to be displayed. 
Each time a user switches to a new data range, scheduler will request a new portion of data.

To enable dynamic loading in UI, you can set the *setLoadMode* option to any of values: "day", "week", "month". Firstly, enable dynamic loading on the client using the api/scheduler_setloadmode.md method:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events", "json");
~~~

On the server side it will be processed correctly by this code:

{{snippet app/routes.php}}
~~~php
$app->group('/events', function ($group) {
        $group->get('',  function (Request $request, Response $response, array $args) {
            $db = $this->get('PDO');
            $queryText = 'SELECT * FROM `events`';
            $params = $request->getQueryParams(); /*!*/
            $queryParams = []; /*!*/
            if (isset($params['from']) && isset($params['to'])) { /*!*/
                $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;"; /*!*/
                $queryParams = [$params['from'], $params['to']]; /*!*/
            } /*!*/
            $query = $db->prepare($queryText);
            $query->execute($queryParams); /*!*/
            $result = $query->fetchAll();
            $payload = json_encode($result);

            $response->getBody()->write($payload);
            return $response->withHeader('Content-Type', 'application/json');
        });
});
~~~


Step 5. Saving changes
------------------------

###Implementing backend handlers

For now, scheduler can read data from the backend. Let's make it write changes back to the database.

The client side will work in the REST mode, meaning it will send POST/PUT/DELETE requests for events actions.
[Check the format of requests and all the routes the scheduler will use](server_integration.md#requestandresponsedetails).

Now you need to define a controller that handles actions on the model, create route for it and enable data saving on the client side.

Go back to *app/routes.php* and add a handler for a POST request to the "/events" group, it will handle inserting of new events:

{{snippet app/routes.php }}
~~~php
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text']
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $result = [
        'tid' => $db->lastInsertId(),
        'action' => 'inserted'
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

{{note When a new task is inserted, you return its id back to the client in the `tid` property of the response object.
The response JSON can have any number of additional properties, they all can be accessed from the client-side handler.}}

The same way to add an action for a PUT request:

~~~php
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        $id
    ];

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

and for a DELETE request:

~~~php
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';
    
    $query = $db->prepare($queryText);
    $query->execute([$id]);
    
    $result = [
        'action' => 'deleted'
    ];
    
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

###Enabling data saving on the client side

Finally, we will configure the client side to utilize the API we've just implemented:

{{snippet public/basic.phtml}}

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// load data from the backend
scheduler.load("/events", "json");
 
// send updates to the backend
var dp = scheduler.createDataProcessor("/events"); dp.init(scheduler); /*!*/ 
// set data exchange mode
dp.setTransactionMode("REST"); /*!*/
~~~

If you restart the application now, you should be able to create delete and modify events in scheduler, all changes will be there after you reload the page.

![Scheduler CRUD](php_crud_slim4.png)


Recurring events
---------------------

In order to enable recurrence (e.g. "repeat event daily") you'll need to add an appropriate extension to the scheduler page:

~~~html
...
<body>
    ...
    <script>
        scheduler.plugins({
            recurring: true /*!*/
        });
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
        ...
   </script> 
</body>
~~~

The "events" table needs additional columns to store recurrence info. Here is an SQL query for creating recurring events table:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `event_pid` int(11) DEFAULT 0,
  `event_length` bigint(20) unsigned DEFAULT 0,
  `rec_type` varchar(25) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
~~~

Or, you can update the events table from our previous step:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

###Updating the backend

Finally, you'll need to [update our handlers](recurring_events.md#editingdeletingacertainoccurrenceintheseries)

Firstly, let's take a look at the `POST` route. Here you need to update the SQL query in order to add new columns.

Secondly, you need to process a special case for recurring events - deletion of a specific occurrence of the recurring series requires creating a new database record and the client will call the *insert* action for it:

{{snippet app/routes.php}}
~~~php
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?,
                `event_pid`=?, 
                `event_length`=?, 
                `rec_type`=?'; 
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        // recurring events columns
        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0, 
        $body['rec_type'] 
    ];

    // delete a single occurrence from  recurring series
    $resultAction = 'inserted'; /*!*/
    if ($body['rec_type'] === "none") { /*!*/
        $resultAction = 'deleted'; /*!*/
    } /*!*/
    /*
    end of recurring events data processing
    */

    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $result = [
        'tid' => $db->lastInsertId(),
        'action' => $resultAction
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

The `PUT` handler requires the same changes in the SQL query.
Additionally, you need to handle a different special case there: when a recurring series is modified, you need to delete all modified occurrences of that series:

{{snippet app/routes.php}}
~~~php
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?,
            `event_pid`=?,
            `event_length`=?,
            `rec_type`=?
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],

        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0,
        $body['rec_type'],/*!*/
        $id
    ];
    if ($body['rec_type'] && $body['rec_type'] != 'none') {
        //all modified occurrences must be deleted when you update recurring series
        //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
            $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
            $subQuery = $db->prepare($subQueryText);
            $subQuery->execute([$id]);
    }

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

And finally, the `DELETE` action. Here we have to check two special cases:

- if the event you are going to delete has a non-empty `event_pid`, it means a user deletes a modified instance of the recurring series. Instead of deleting such a record from the database, 
you need to give it `rec_type='none'`, in order for scheduler to skip this occurrence.
- if a user deletes a whole recurring series, you also need to delete all the modified instances of that series.

{{snippet app/routes.php}}
~~~php
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    // some logic specific to recurring events support
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id=? LIMIT 1;';
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch(PDO::FETCH_ASSOC);

    if ($event['event_pid']) {
        // deleting a modified occurrence from a recurring series
        // If an event with the event_pid value was deleted - it needs updating 
        // with rec_type==none instead of deleting.
        $subQueryText='UPDATE `recurring_events` SET `rec_type`=\'none\' WHERE `id`=?;';
        $subQuery = $db->prepare($subQueryText);
        $query->execute($queryParams);

        $result = [
            'action' => 'deleted'
        ];

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    if ($event['rec_type'] && $event['rec_type'] != 'none') {/*!*/
        // if a recurring series deleted, delete all modified occurrences of the series
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }

    /*
        end of recurring events data processing
    */

    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';

    $query = $db->prepare($queryText);
    $query->execute([$id]);

    $result = [
        'action' => 'deleted'
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

### Parsing recurring series
A recurring event is stored in the database as a single record that can be splitted up by Scheduler on the client side.
If you need to get dates of separate events on the server side, use a helper library for parsing recurring events of dhtmlxScheduler on PHP. 
<br>
You will find [the ready library on GitHub](https://github.com/DHTMLX/scheduler-helper-php).

Application security
------------------

dhtmlxScheduler is a client-side component that doesn't have built-in security safeguards for the sake of flexibility. 
Moreover, the client side only is not able to provide reliable security measures.

It means that the application security is in the responsibility of a backend developer. The most obvious aspects to pay attention to are the following:

- SQL injections. All operations done in this example use parameterized SQL queries which should be safe in terms of SQL injections.

- XSS attacks. The client side doesn't sanitize neither user input before sending it to the backend, nor server data before displaying it on a page.
This example doesn't contain any xss-filtering and you'll have to consider adding it, if you want to use this sample for your app.

In order to prevent any possible XSS attacks, you’ll need to make sure you escape all strings that can be inserted into HTML.
In our case it should be sufficient to escape the “text” properties of the events when they are loaded to the client:

{{snippet app\routes.php}}
~~~php
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $queryParams = [];
        if (isset($params['from']) && isset($params['to'])) {
            $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
            $queryParams = [$params['from'], $params['to']];
        }
        $query = $db->prepare($queryText);
        $query->execute($queryParams);
        $result = $query->fetchAll();

        // escaping unsafe text
        foreach($result as $index=>$event){
            $result[$index]["text"] = htmlentities($event["text"]);
        }

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
~~~

Error handling
------------------

If the backend has failed to perform an action, the client side [expects it to return the "error" status of an action](server_integration.md#errorhandling).

You can do it by modifying the default Error Handler. Open the `src/Application/Handlers/HttpErrorHandler.php` file  and replace the following strings:


{{snippet rc/Application/Handlers/HttpErrorHandler.php}}
~~~php
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $error->setDescription($exception->getMessage());
}
~~~

with the code:

~~~php
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $encodedPayload = json_encode([
        'action' => 'error', 'message' => $exception->getMessage()
    ]);
    $response = $this->responseFactory->createResponse();
    $response->getBody()->write($encodedPayload);
    return $response->withHeader('Content-Type', 'application/json');
}
~~~

On the client side you can capture these errors using the [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) event of the dataProcessor:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // do something here
    }
});
~~~

Trouble shooting
-----------------

In case you've completed the above steps to implement Scheduler integration with PHP, but Scheduler doesn't render events on a page, have a look at the troubleshooting.md article. It describes 
the ways of identifying the roots of the problems.


What's next
------------

Now you have a fully functioning Scheduler. You can view the full code on [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim), clone or download it and use it for your projects.

You can also check [guides on the numerous features of Scheduler](guides.md) or tutorials on [integration of Scheduler with other backend frameworks](howtostart_guides.md).



