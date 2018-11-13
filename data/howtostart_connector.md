dhtmlxScheduler with dhtmlxConnector 
=====================================

In this tutorial we want to consider the creation of a standard scheduler that loads data from a database and saves it back. 
The final code of the tutorial can be used as the start point while creating applications with dhtmlxScheduler.  

This tutorial discusses the sequence of steps needed for implementing Scheduler with PHP. If you want to create Scheduler with a different language, 
check the available options in the list below:

- howtostart_php.md
- howtostart_nodejs.md
- howtostart_dotnet.md
- howtostart_ruby.md

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

- <b>sources</b> - the source code files of the library. The files are not minified and easy-to-read. The package is mostly intended to be used for component's debugging.
- <b>samples</b> - the code samples.
- <b>docs</b> - the full documentation of the component.
- <b>codebase</b> - the packed code files of the library. These files have much smaller size and intended for use in production. <b>In your apps you need to use files from this folder.</b>






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
        <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
        <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
        <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
   	</div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~


## Step 3.  Style
To work correctly in the full-screen mode in different browsers, define the following style for the scheduler:

~~~js
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>

~~~

If you don't use the full-screen mode, you don't need to specify that style. Specify the desired css properties directly in the main **div**:

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
{id:1, text:"Meeting",   start_date:"04/11/2013 14:00",end_date:"04/11/2013 17:00"},
{id:2, text:"Conference",start_date:"04/15/2013 12:00",end_date:"04/18/2013 19:00"},
{id:3, text:"Interview", start_date:"04/24/2013 09:00",end_date:"04/24/2013 10:00"}
];

scheduler.parse(events, "json");//takes the name and format of the data source
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
So, to provide correct data conversion, you should change the default scheduler format. It can be achieved by specifying the api/scheduler_xml_date_config.md configuration option.
  
  
Note, any configuration options go BEFORE the initialization string, i.e.:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

##Step 7. Loading data from the server

To load data from a database, use the api/scheduler_load.md method where specify a file realizing server-side 'communication' as a parameter. You may write the full server side by yourself, 
but we recommend to use <a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:start">dhtmlxConnector</a>, as the easiest way.
  
  
So, for our task you need to call the method as shown below:

~~~js
//method takes the url to the file that will process CRUD operations on the server
scheduler.load("data/connector.php");
~~~


## Step 8. Server-side script 
The server-side script for dhtmlxScheduler is the following:

~~~php
<?php 
require_once("../codebase/connector/scheduler_connector.php");
 
$res=mysql_connect("localhost","root","");
mysql_select_db("schedulerDB");

$conn = new SchedulerConnector($res);

$conn->render_table("events","id","start_date,end_date,text");
~~~

<br>

Note, you can name the table fields, as you want. In any case, the scheduler interprets 3 first fields to load, as the required ones. For instance, if you load data as in:

~~~php
$conn->render_table("events","id","event_start,event_end,event_text");
~~~

the interpretation will be as follows:

- *event_start* -> *start_date*;
- *event_end* -> *end_date*;
- *event_text* ->*text*. 

## Step 9. Saving data 
If you run the app now, you will see that the scheduler is able to load data from the database, but unable to save it back. 
To 'force' the scheduler save data in the database, use <a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxdataprocessor:toc">dataProcessor</a>.

It's very easy to use dataProcessor. All you need is to initialize it and attach to the scheduler.

~~~js
var dp = new dataProcessor("data/connector.php");
dp.init(scheduler);
~~~

  
That's all. A standard scheduler that can load data from the database and save it back is ready.
  
   
Now you may configure, change and customize it further to meet all your needs. 


{{sample
	01_initialization_loading/05_loading_database.html
}}

@todo: check and compare to the current how to start
