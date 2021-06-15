Integration with Google Calendar <br>(API v.2)
==============


{{note
This article refers to Google Calendar API v2, which isn't used any more. The details on actual version of Google Calendar API v3, are given [here](google_calendar_integration.md).
}}

## Getting started

First of all, to start sync, check whether the extension _php_curl.dll_ is enabled.
  
  
If it's not, activate it by removing a semicolon from the following line in the _php.ini_ file, used by your web server:

~~~php
;extension=php_curl.dll

~~~


Once you are sure that the needed extension is enabled, you can move to setup.

**To sync Scheduler with Google Calendar, do the following:**

- Download the '**gCal_proxy_v2**' package. ([download link](http://dhtmlx.com/x/download/regular/gCal_proxy_v2.zip))
- Unzip the package into the root directory of your web server.

**Server-side:** 

- Open the _'01_proxy.php'_ file placed at **[rootFolder] gCal_proxy server** in notepad. The file contains the standard proxy initialization code:

~~~php
<?php

$email = "";
$pass = "";
$cal = "";

include('google_proxy.php');
$calendar = new GoogleCalendarProxy($email, $pass, $cal);
//$calendar->map("location", "details");
$calendar->connect();

?>
~~~

- Set values for 3 variables and leave the rest of the code, as it is.<br> Variables that you should set values for, are:
  - **$email**  - the user name of your Gmail account;
  - **$pass** - the password of your Gmail account;
  - **$cal** - the name of your Google Calendar.

Make sure that you wrote the correct values. For example, if the name of your calendar is _test@googlemail.com_, the value _test@gmail.com_ results in error.
  
-  Save the changes and close the file.
  
**Client-side:**
  
- Open the HTML file containing the initialized scheduler. If you don't have any scheduler initialized, create a new HTML file in the root folder of your web server.
- Initialize scheduler in a standard way (see details in [How to Start](howtostart_php.md#step2addingschedulertothepage)).
- Load Google Calendar's events to Scheduler through the api/scheduler_load.md method. Set its parameter to the path to the '_01_proxy.php_' file, which you've recently modified.
   
~~~js
scheduler.load("../gCal_proxy/server/01_proxy.php");
~~~

- Initialize <a href="https://docs.dhtmlx.com/dataprocessor__index.html">dataProcessor</a>, to provide 2-way sync. 
  
-  Include one more file.
  
~~~js
<script src="../gCal_proxy/sample/codebase/dhtmlxdataprocessor.js"></script>

~~~

-  Take the path to the same php file '_01_proxy.php_', as the parameter of the constructor. 
  
   
~~~js
var dp =  new dataProcessor("../gCal_proxy/server/01_proxy.php");
dp.init(scheduler);//'scheduler' is the name of the scheduler instance.

~~~


The sync is finished. You can find the  ready-to-use example '_sample.html_' at [rootFolder] gCal_proxy sample.



Export
-------------------

To export events from Google Calendar to your database, just follow these steps:


1.  Open the _'03_export.php'_ file placed at **[_rootFolder_] gCal_proxy server** in notepad.
2.  Set values for the variables and leave the rest of the code as it is.<br> Variables that you should set values for:
  - **$email**  - the user name of your Gmail account;
  - **$pass** - the password of your Gmail account;
  - **$cal** - the name of your Google Calendar;
  - **$db_host**  - the name of your MySQL server host or IP-address;
  - **$db_user**  - the username of your MySQL account;
  - **$db_pass** - the password of your MySQL account;
  - **$db_name**  - the name of your MySQL database;
  - **$db_table** - the name of the database table;
3. Save changes and close the file.
4. Run the '_03_export.php_'.
5. Once the file has been run, events from Google Calendar will be saved to the appropriate database table.

{{note
The function 'export()' returns a number of records that have been exported from Google Calendar
}}


Import
------------------------

To import events from your database to Google calendar, just follow these steps:


1.  Open the _'02_import.php'_ file placed at **[_rootFolder_] gCal_proxy server** in notepad.
2.  Set values for the variables and leave the rest of the code as it is. Variables that you should set values for are the same as in case of exporting.
3.  Save changes and close the file.
4.  Run the '_02_import.php_'.
5.  Once the file has been run, events from the database will be moved to the Google Calendar.

{{note
The function 'import()' returns a number of records that have been imported to Google Calendar
}}

 How to pass additional information related to the event
--------------------

Google Calendar has one set of fields and Scheduler has the other. So, to sync (import or export) the event information correctly, you should set mapping between the related fields of the calendars.

**By default, there is the following mapping between Google Calendar and Scheduler:**

_Google Calendar_ ->  Scheduler  
  
  
- id -> id 
- title -> text  
- startTime -> start_date  
- endTime -> end_date  
  
 

**Additionally, you can pass information of the following Google Calendar fields:**

<table style='border-collapse: collapse; color:#444444' >
<tr><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
  Field  
</td><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
  Description   
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
**_canEdit_**  
</td><td markdown='1' style='border:1px solid #AAA;'>
 defines whether the logged-in user can edit the current event. Possible values: '0' or '1' 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
**_created_**  
</td><td markdown='1' style='border:1px solid #AAA;'>
 the event's creation date in _gcal_ format 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
**_details_**  
</td><td markdown='1' style='border:1px solid #AAA;'>
 the event's details
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
**_updated_**  
</td><td markdown='1' style='border:1px solid #AAA;'>
 the last update date of the event in _gcal_ format 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
**_location_**  
</td><td markdown='1' style='border:1px solid #AAA;'>
 the location, where the event takes place 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
**_status_**  
</td><td markdown='1' style='border:1px solid #AAA;'>
 shows the current status of the event: _cancelled_ (the event is canceled), _confirmed_ (the event is confirmed), _tentative_ (the event is tentatively scheduled) 
</td></tr>
</table>

**To pass some additional info, follow the steps below:** 

**Server-side:**

-  According to the desired action, open in notepad the appropriate file placed at **[rootFolder] gCal_proxy server**: to sync - _'01_proxy.php'_, to import - _'02_import.php'_, to export - _'03_export.php'_. 
-  Map the desired fields by using the method **map()**. For example, if you want to get the location of the event (in addition to the text, start and end times) you should write the following line:

~~~php
$calendar->map("location", "place");

~~~
- **_location_** - the name of the Google Calendar field;
- **_place_** - the name of the related Scheduler field. You can write any name here.
  
   
-  Save changes and close the file.

**Client-side:**


- Open the HTML file containing the initialized scheduler.
- Add to the definition of the scheduler:

The lightbox section:

~~~js
scheduler.config.lightbox.sections=[
	...
    {name:"placeField", height:50, map_to:"place", type:"textarea"}
];

~~~
 where the **map_to** parameter must be set to the value, specified on server-side (see above).


- the label of the newly added section:
  
~~~js
scheduler.locale.labels.section_placeField = 'Place';

~~~
 where after the underscore you should specify the name of the related section.


- Save changes and close the file.