dhtmlxScheduler with dhtmlxConnector 
=====================================

In this tutorial we want to consider the creation of a standard scheduler that loads data from a database and saves it back. 
The final code of the tutorial can be used as the start point while creating applications with dhtmlxScheduler.  

This tutorial discusses the sequence of steps needed for implementing Scheduler with PHP. If you want to create Scheduler with a different language, 
check the available options in the list below:

- howtostart_nodejs.md
- howtostart_dotnet_core.md
- howtostart_dotnet.md
- howtostart_plain_php.md
- howtostart_php_slim4.md
- howtostart_php_laravel.md
- howtostart_ruby.md

Follow the step-by-step guide to create such an application.

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector).
}}

![init_scheduler_front.png](init_scheduler_front.png)

{{sample
	01_initialization_loading/05_loading_database.html
}}

## Step 1. A new HTML file and required code files 

Let's start our application with creating a new HTML file and including the required scheduler code files to it.
  
  
The required code files are:


- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css*


~~~js
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
</head>
<body>
   	//your code will be here
</body>
</html>

~~~

Let's quickly explore the structure of the dhtmlxScheduler package to find out where to look for the files.

- <b>backend</b> - the node.js app that can be used to run package samples.
- <b>samples</b> - the code samples.
- <b>codebase</b> - the code files of the library. The *codebase/source* folder contains not-minified files.

## Step 2. Related DIV elements 

Before initialization of the scheduler, you should define the related DIV containers for its elements.
  
  
 
The standard set of 'divs' (needed for the scheduler) looks like this:


~~~js
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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
~~~


## Step 3.  Style
To work correctly in the full-screen mode in different browsers, define the following style for the scheduler:

~~~js
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>

~~~

If you don't use the full-screen mode, you don't need to specify that style. Specify the desired CSS properties directly in the main **div**:

~~~js
<div id="scheduler_here" class="dhx_cal_container" 
style='width:200px; height:300px; padding:10px;'>
...

~~~


## Step 4. Initialization
After you have finished the preparations, you can move to initialization. Beware, the scheduler is a static object and can be instantiate on the page once. 
To refer to the scheduler's instance, use **dhtmlxScheduler** or simply **scheduler**.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~


## Step 5. Loading data
If you run the app now, you can already see a scheduler on the page. But it won't contain any data.

To populate the scheduler, we will take the data from a sample data source. We will use the easiest of the ways and specify the data source as an inline object. <br>
To load data from an inline object, use the api/scheduler_parse.md method. 

The properties of a data object are:

- **id** - (*string, number*) the event id.
- **start_date** - (*string*) the date when an event is scheduled to begin. The default format - "%m/%d/%Y %H:%i".
- **end_date** - (*string*) the date when an event is scheduled to be completed. The default format - "%m/%d/%Y %H:%i".
- **text** - (*string*) the event's description.

~~~js
var events = [
{id:1, text:"Meeting",   start_date:"2019-11-14 14:00",end_date:"2019-11-14 17:00"},
{id:2, text:"Conference",start_date:"2019-11-13 12:00",end_date:"2019-11-13 19:00"},
{id:3, text:"Interview", start_date:"2019-11-14 09:00",end_date:"2019-11-14 10:00"}
];

scheduler.parse(events);//takes the name and format of the data source
~~~

## Step 6. Database structure 
{{note
Read this and further steps if you want to load data from a database instead of from an inline object.
}}

Now, if you have decided to load data from the server - you need to create  a table in your database as in:

<img style="padding-top:15px;" src='db_table.png'/>

You can execute the following code to create the table:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

Besides the aforementioned fields, you can create any number of extra ones, which then can be passed to the client side and 
[mapped to the lightbox](custom_details_form.md#mapping_db_fields_to_the_form).


Beware, the format of the DataTime data type is '%Y-%m-%d %H:%i' that differs from the date format expected by the scheduler ('%m/%d/%Y %H:%i'). 
So, to provide correct data conversion, you should change the default scheduler format. It can be achieved by specifying the api/scheduler_date_format_config.md configuration option.
  
  
Note, any configuration options go BEFORE the initialization string, i.e.:

~~~js
scheduler.init('scheduler_here',new Date(),"month");
~~~

##Step 7. Loading data from the server

To load data from a database, use the api/scheduler_load.md method where specify the backend url as a parameter. 
You can implement the backend by yourself using our [guides](howtostart_guides.md), but for this tutorial we'll cover the [PHP connector library](https://docs.dhtmlx.com/connector__php__index.html) as the quickest way.
  

So, for our task you need to call the method as shown below:

~~~js
//method takes the url to the file that will process CRUD operations on the server
scheduler.load("data/connector.php");
~~~


## Step 8. Server-side script 

You can download the connector library from the official repository https://github.com/DHTMLX/connector-php

The server-side script for dhtmlxScheduler is the following:

~~~php
<?php 
require_once("./connector/scheduler_connector.php");

$res = new PDO("mysql:host=localhost;dbname=scheduler", "username", "password");

$connector = new SchedulerConnector($res);
$connector->render_table("events","id","start_date,end_date,text");
~~~

<br>

Note, you can name the table fields, as you want. In any case, the scheduler interprets 3 first fields to load, as the required ones. For instance, if you load data as in:

~~~php
$connector->render_table("events","id","event_start,event_end,event_text");
~~~

the interpretation will be as follows:

- *event_start* -> *start_date*;
- *event_end* -> *end_date*;
- *event_text* ->*text*. 

{{note You can read about recurring events in the [Recurring Events](recurring_events.md#serversideintegration) article.
}}

{{note A recurring event is stored in the database as a single record that can be splitted up by Scheduler on the client side.
If you need to get dates of separate events on the server side, use a helper library for parsing recurring events of dhtmlxScheduler on PHP. 

You will find [the ready library on GitHub](https://github.com/DHTMLX/scheduler-helper-php).}}
## Step 9. Saving data 
If you run the app now, you will see that the scheduler is able to load data from the database, but unable to save it back. 
To 'force' the scheduler save data in the database, use [dataProcessor](server_integration.md#technique).

It's very easy to use dataProcessor. All you need is to initialize it and attach to the scheduler.

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~

  
That's all. A standard scheduler that can load data from the database and save it back is ready.
  
   
Now you may configure, change and customize it further to meet all your needs. 


{{sample
	01_initialization_loading/05_loading_database.html
}}

You can view the full code on [GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector), clone or download it and use it for your projects.