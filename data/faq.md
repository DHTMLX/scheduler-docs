FAQ
==============

Scheduler isn't rendered correctly
-----------------------------------------
If the scheduler wasn't rendered on the page properly, please, check a CSS style for the scheduler container - it must have a valid size in pixels or percents.<br>

- If the size defined in percents - be sure that the parent container has some height specified as well. 
- If the scheduler was placed directly in the body - specify the next CSS style to use a percent-based height correctly:

~~~js
html, body{
	margin:0px;
	padding:0px;
	height:100%; /*mandatory*/
	overflow:hidden;
}
~~~




Scheduler isn't rendered in Internet Explorer correctly
---------------------------------------------------------
If the scheduler wasn't rendered on the page properly only in the Internet Explorer browser, please, make sure that your page uses a full DOCTYPE declaration.
Scheduler can work correctly in the standard modes of IE6, IE7 and IE8 but isn't purposed to be used with the quirks modes of IE.

For example,  HTML5 DOCTYPE is:

~~~html
<!DOCTYPE html>
~~~


Scheduler fails to initialize when a custom view is initial
------------------------------------------------------------------------------
A view that will be shown in the scheduler initially is specified in the api/scheduler_init.md method, i.e. during the scheduler initialization. 
But the templates, used by a custom view, can be not fully processed at that moment. Therefore,  the initialization will fail.<br>
To prevent such a situation and be sure that templates of your custom view are fully ready, before the scheduler is initialized - 
create custom views in a handler function of the  api/scheduler_ontemplatesready_event.md event that fires only when all the templates are fully processed:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
	//here you can place your code that creates a custom view
});

scheduler.init(container, date, "custom view name");
~~~

XML Parsing Error when I load data through PHP script
------------------------------------------------------------
Seems like the server-side script returns some whitespace characters before outputting the XML that causes an error.

Make sure that all the includes used within the connector's script don't have any whitespaces beyond <br>
the <b>&#60;?php</b> and  <b>?&#62;</b> tags. <br>

How to set 12-hour time format (non-military time)?
-----------------------------------
By default, the scheduler uses 24-hour format (also called as military time) and displays time like 13:00. <br>
To set 12-hour format and display  time like 1:00 PM, use the api/scheduler_hour_date_config.md property:

~~~js
scheduler.config.hour_date = "%g:%i%a"; /*!*/
scheduler.init('scheduler_here', new Date(), "month");
~~~

Events that last less then 1 hour look in the scheduler the same as the 1-hour events do
----------------------------------------------------------------------------------------
Note, the default scale unit height is 42px (or the hour height) and the minimum height of the event box is 42px as well. Therefore, 15-minute and 1-hour events will look the same in the scheduler.

To fix it and make events fit the scale, you can use several ways.  Read about them  in the article sizing.md. 

Calendar background grid and time scale are misaligned
----------------------------------------------------------------------------------------
This may appear on non-default zoom levels.

Such a behavior is expected and currently can't be avoided.
The calendar layout is guaranteed to look correctly at 100% (default) zoom, on other levels some elements may be shifted due to browser scaling.

Scheduler scalability limitations and the maximum number of events
----------------------------------------------------------
The Scheduler scalability depends on several factors. 

If you use the Timeline view, the number of rows has a significant impact on the rendering speed. 
If you have hundreds of timeline sections displayed in a calendar,
it may create noticeable lags. However, it would depend on combinations of different settings.

Regarding the maximum possible number of events, if you expect a large amount of data, you can enable the [dynamic loading mode](loading_data.md#dynamicloading). 
Thus, Scheduler will fetch only those records that need to be displayed (an AJAX request will contain related dates, so you can do selection by date range on the backend).

When this option is enabled, the only limitation is the number of events displayed at the same time. Usually, this number is relatively high, and you can have up to a couple of
thousand events with no lack of performance. However, it would also depend on the view you are using. 

For example, the regular Day or Week modes of Scheduler won't be able to display such amounts of events, mostly because they won't fit into the calendar layout 
(since events are displayed in columns and the column width is limited).

Generally, the overall number of events is rarely an issue. Although, if you have a lot of Timeline sections (i.e. timeline with 200 rows), it may require some code tweaks to reduce the repainting time
to some comfortable value.
