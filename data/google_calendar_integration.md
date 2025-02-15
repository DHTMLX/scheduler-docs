Integration with Google Calendar 
==============

**Download the package** [here](https://github.com/DHTMLX/scheduler-google-calendar/archive/master.zip).

Introduction
-----------------------------------

In this chapter you'll find out, how to keep Scheduler and Google Calendar in sync.
  
Note, that the sync is 2-way, i.e. any changes you make to events in either Scheduler or Google Calendar will be reflected in both applications.

- If you alter the same event in both applications, the latest update will be synced between Scheduler and Google Calendar.
- If you delete an event in one of the calendars, this event will be deleted from both applications.
- You sync Scheduler with the primary Google Calendar. Events from the secondary calendars won't be synced.
- Note, you sync all the events, containing in both Google Calendar and Scheduler, at once. You can't sync just some specific part of events.
- By default, Scheduler takes the text and duration (start and end times) of the Google Calendar event. If you need, you can get additional information of the event. See the details [below](synchronization_with_google_calendar.md#howtopassadditionalinformationrelatedtotheevent). 

## Getting started

To start the integration, do the following preparations: 

1. Login to the **Google API console** - <a href="https://console.cloud.google.com/cloud-resource-manager">https://console.cloud.google.com/cloud-resource-manager</a>.
2. Click on the **"Create new project"** button. The **"Google apis"** screen opens.
3. Enable the **"Calendar API"** service in the **"Services"** tab.
4. Go to the "API Access" tab and click on **"Create an OAuth2.0 Client ID"** button. The **"Create Client ID"** form opens.
5. Fill in the form  and click the **"Next"** button. The next screen of the form opens.
6. Select the **"Service account"** option and click on the **"Create client ID"** button. As a result, you will have the private key file, Client ID and Email address - they will be necessary later.
8. Login to  Google Calendar, which you want to use for the app, and share it on the Email address, which was used for login to the **Google API console** (step 1).
9. Locate and save the calendar id (you can find the calendar id in the settings section of each calendar).



**Server-side:** 

<ol>
	<li> Create a php file with the name "data.php" with the code as in:
~~~php
<?php

include('../src/google_proxy.php');

$calendar = new GoogleCalendarProxy(
    "<account>@developer.gserviceaccount.com",
    "<account>.apps.googleusercontent.com",
    file_get_contents("<key>"),
    "<calendar id>"
);

$calendar->connect();
?>
~~~
	</li>
</ol>
where

- **&lt;account&gt;** -  the "Email address", which was used for login to the Google API console.
- **&lt;key&gt;** - the path to your private key
- **&lt;calendar_id&gt;** - the calendar's id (can be taken from the settings of your Google Calendar account)
   
  
**Client-side:**

1\. Open the HTML file containing the initialized scheduler or initialize one in a standard way (see details in the [How to Start](howtostart_php.md#step2addingschedulertothepage) article.

2\. Load Google Calendar's events to the scheduler through the api/scheduler_load.md method. The 1st parameter is the path to the 'data.php' file, the 2nd parameter - expected data format that should be 'json'.
   
~~~js
scheduler.load("./data.php", "json");
~~~

3\. Initialize <a href="https://docs.dhtmlx.com/dataprocessor__index.html">dataProcessor</a>, to provide 2-way sync (if you need the readonly access - ignore this code). 
  
~~~js
var dp =  scheduler.createDataProcessor("./data.php");
dp.init(scheduler);
dp.setTransactionMode("POST", false);
~~~
	


How to pass additional information related to the event
--------------------

By default, the scheduler gets values of all Google Calendar fields, but processes only 4 of them. All other values are read-only. 

**There is the following mapping between Google Calendar and Scheduler:**

_Google Calendar_ ->  Scheduler  
  
  
- id -> id 
- title -> text  
- startTime -> start_date  
- endTime -> end_date  
  
 
To process some other properties, make changes in the **"src/google_proxy.php"** file, resided in the provided package 
([link to download](https://github.com/DHTMLX/scheduler-google-calendar/archive/master.zip)).

@index: 
- synchronization_with_google_calendar.md