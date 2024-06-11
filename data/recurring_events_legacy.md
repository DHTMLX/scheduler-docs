Recurring Events 
==============

*The article refers to the legacy format of recurring events for DHTMLX Scheduler. If you use DHTMLX Scheduler v7.1+ see the details on the current version [here](recurring_events.md).*

By default, the scheduler doesn't support recurring events. To enable such support, you need to enable a special extension on the page - **recurring_legacy**. 


~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~


Once the support for recurring events is activated, the lightbox starts looking as shown below: 


<img src="recurring_lightbox.png"/>


Configuration Options
---------------------------------------

The library provides the following options to configure recurring events:

{{links
- api/scheduler_repeat_date_config.md - sets the date format of the 'End by' field in the 'recurring' lightbox
- api/scheduler_include_end_by_config.md - defines whether the date specified in the 'End by' field should be exclusive or inclusive
- api/scheduler_recurring_overflow_instances_config.md - defines the behavior of the recurrences that transfer to the next month
- api/scheduler_repeat_precise_config.md - prevents including past days to events with the 'weekly' recurrence
- api/scheduler_occurrence_timestamp_in_utc_config.md - allows working with recurring events independently of time zones
}}

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~

{{sample
	03_extensions/01_recurring_events.html
}}

'Recurring' Lightbox
------------------------------------------

By default, once the recurring extension is enabled, the lightbox starts to have one more section  - "Repeat event". 
And the default definition of the 'recurring' lightbox starts to be as in:

~~~js
[	 
	{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
	{name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
    	button:"recurring"},
	{name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

You may add any extra sections, but need to preserve both the "recurring" and "time" sections. 
Also, it's required to place the "time" section **after** the "recurring" one.


{{sample
	03_extensions/01_recurring_events.html
}}


Server-side Integration 
---------------------------

A recurring event is stored in the database as a single record that contains all fields of a regular event plus 3 additional: 

1.  **rec_type** - (_varchar_) defines the logic of repetition. This field is filled in automatically
2.  **event_length** - (_long int_) the actual time length of an event in seconds
3.  **event_pid** - (_int_) the parent id of a series of events

So, the connector query will have a look similar to the next one:

~~~php
$scheduler->render_table("events_rec","event_id",
"start_date,end_date,text,rec_type,event_pid,event_length");
~~~

In a usual case, in addition to the mandatory fields you can extract any extra data from the DB.

However, fields **start_date** and **end_date** slightly change their meaning:


- **start_date** - the start date of the first event in a series in the format 'yyyy-mm-dd hh:mm:ss' (settings_format.md).
- **end_date** - the end date of the last event in a series in the format 'yyyy-mm-dd 00:00:00' (settings_format.md).

For example, a recurring event that starts on January 3, 2019 at 10:00, repeats every day and ends on January 13, 2019 at 12:00, 
will be presented in the database as follows:


~~~js
id:1,
start_date:"2019-01-03 10:00:00",
end_date:"2019-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" //0 for the parent events or the ID of parent events for sub-events
~~~


The client side gets data from the **rec_type** field as a string of the following format:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

where:

- *type* - the type of repetition: 'day','week','month','year'.
- *count* - the interval between events in the "type" units.
- *day* and *count2* - define a day of a month ( first Monday, third Friday, etc ).
- *days* - a comma-separated list of affected week days.
- *extra* - extra info that can be used to change the presentation of recurring details.

Examples of the **rec_type** data:


- *"day_3___"* - each three days
- *"month _2___"* - each two months
- *"month_1_1_2_"* - second Monday of each month
- *"week_2___1,5"* - Monday and Friday of each second week 
  
*The double or triple underline indicates that the related parameters of the string are omitted*.

Parsing series on the backend
------------------------------

A recurring event is stored in the database as a single record that can be splitted up by Scheduler on the client side.
If you need to get dates of separate events on the server side, use a helper library for parsing recurring events of dhtmlxScheduler on ASP.NET/ASP.NET Core/PHP. 

You will find the ready libraries on our GitHub:

- [for ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [for PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

Editing/deleting a certain occurrence in the series 
--------------------------------

There is a possibility to delete or edit a particular occurrence in a series. 

###Important tips

- For each update of the recurring event a separate record is created in the DB.
- Particular occurrences refer to the parent event through the **event_pid** property.
- Once you have edited an occurrence in the series, the **event_length** field for this update 
will store the time stamp of the date, when the occurrence should have happened if it wasn't edited, instead of the real event length. 
So if the occurrence has happened on July 27, 2019 at 15:00 and was moved to July 30, 2019 15:00, the time stamp would reflect the first date. 
The time stamp is measured in seconds from UNIX epoch.
- Note that if your DB contains records of edited occurrences in the series and you decide to 'Edit series' via the lightbox, all the stored records will be deleted after saving. 
The only record that will remain is the main recurring event, while its occurrences will lose their differences (will become identical).

###Let's consider an example

You are a fan of the Olympic Games and want to watch the upcoming London Olympic Games 2012 (*27 July - 12 August*) as much as possible. 
So you decide to create a recurring event that *starts at 17.00* (the end of your work day) and *ends at 23.00* (the time for you to be asleep).
But as the Opening Ceremony *starts only at 19.00* you want to edit the first event in the series (at this particular day) and set the time period 
*from 19.00 to 23.00*. Also, you remember that on *August 1, 2012* you have deadline and most probably you will be at home too late to watch anything. 
So you need to delete *August 1, 2012* from the series as well. 

####Shortly, your actions are the following:

1.  To create a recurring event **_(17.00-23.00)_** from **July 27,2012** till **August 12,2012**.
2.  To edit a particular occurrence on **July 27,2012** - to change the time period **_from 17.00-23.00 to 19.00-23.00_**.
3.  To delete a particular occurrence on **August 1,2012** from the series.

Consequently, we should have 3 records referring to our recurring event in the DB.

####What happens in DB as we follow action by action:

Creating the recurring event:

![create_a_recurring_event.png](create_a_recurring_event.png)

Editing **July 27,2012**:

![edit_a_recurring_event.png](edit_a_recurring_event.png)

Deleting **August 1,2012**: 

![delete_an_occurrence.png](delete_an_occurrence.png)


###Server-side logic 

In addition to extra fields, a specific logic needs to be added to the server-side controller:

- If an event with **rec_type==none** was inserted - the response must have the "deleted" status.
- If an event with **rec_type!=none** was updated or deleted - all records with the related **event_pid** must be deleted.
- If an event with the **event_pid** value was deleted - it needs updating with **rec_type==none** instead of deleting.

{{note
You can find complete code examples [here](howtostart_guides.md)
}}


If you use [PHP Connector](https://github.com/DHTMLX/connector-php) library, the server code may look like the following:

~~~php
function delete_related($action){
	global $scheduler;
	
    $status = $action->get_status();
	$type =$action->get_value("rec_type");
	$pid =$action->get_value("event_pid");
	//when series changed or deleted we need to remove all linked events
	if (($status == "deleted" || $status == "updated") && $type!=""){
		$scheduler->sql->query("DELETE FROM events_rec WHERE 
        event_pid='".$scheduler->sql->escape($action->get_id())."'");
	}
	if ($status == "deleted" && $pid != 0){
		$scheduler->sql->query("UPDATE events_rec SET rec_type='none' WHERE 
        event_id='".$scheduler->sql->escape($action->get_id())."'");
		$action->success();
	}
}
function insert_related($action){
	$status = $action->get_status();
	$type =$action->get_value("rec_type");
	if ($status == "inserted" && $type == "none")
		$action->set_status("deleted");
}

$scheduler->event->attach("beforeProcessing","delete_related");
$scheduler->event->attach("afterProcessing","insert_related");
~~~

Dragging all sequence 
-----------------------

To add for users the possibility to move the entire sequence while dragging recurring events, add the next code before scheduler initialization:

~~~js
scheduler.attachEvent("onBeforeEventChanged",function(dev){
	var parts = scheduler.getState().drag_id.toString().split("#");
 	if (parts.length > 1) {

  		var series = this.getEvent(parts[0]);

  		series.start_date.setHours(dev.start_date.getHours());
  		series.start_date.setMinutes(dev.start_date.getMinutes());
  		series.event_length = (dev.end_date - dev.start_date) / 1000;

  		setTimeout(function(){
   			scheduler.addEvent(series);
  		}, 1);

  		return false;
 	}
 	return true;
});
~~~

Custom control for the lightbox's recurring block
------------------------------------

Starting from version 4.2, dhtxmlScheduler allows you to specify a custom HTML form for the 'recurring' block of the lightbox.

####What customizations can you do?

1. To change the form markup
2. To delete unnecessary elements (e.g., the 'yearly' repeat type and all related inputs)
3. To set some default values for inputs (e.g., you need that all series are created with 'no end date'. Then, you make the 'no end date' option checked and hide  the 
whole block for specifying the recurrence end.


### Usage example

Lets start with an example. Let's imagine you want to remove the 'monthly' and 'yearly' repeat types and have the 'no end date' option for all events (i.e. remove the block for specifying the recurrence end). 

<ol> 
<li>Define the markup of a custom form and place it somewhere on the page (you can start by copying the default template, which can be found at <b>'scheduler\sources\locale\recurring\'</b>):
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
      </select>
    </div>
    <div>
      <div style="display:none;" id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div style="display:none;" id="dhx_repeat_week">
        Repeat every week next days:<br />

       <label><input type="checkbox" name="week_day" value="1" />Monday</label>
       <label><input type="checkbox" name="week_day" value="2" />Tuesday</label>
       <label><input type="checkbox" name="week_day" value="3" />Wednesday</label>
       <label><input type="checkbox" name="week_day" value="4" />Thursday</label>
       <label><input type="checkbox" name="week_day" value="5" />Friday</label>
       <label><input type="checkbox" name="week_day" value="6" />Saturday</label>
       <label><input type="checkbox" name="week_day" value="0" />Sunday</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
</li>
<li> Set the 'form' parameter of the 'recurring' section to the id of your custom form: 
~~~js
scheduler.config.lightbox.sections = [
	{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
	{name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
	{name:"time", height:72, type:"time", map_to:"auto"}
];
~~~
</li>
</ol>

<div style="text-align:center;"><img src="custom_recurring_form.png"/></div>

###Main parts

You can find the default HTML structure of the lightbox's recurring block for different languages at the <b>'scheduler\sources\locale\recurring\'</b> directory.<br>
For example,for the English locale you need to see the  <b>'scheduler\sources\locale\recurring\repeat_template_en.htm'</b> file.

Basically, the recurring block of the lightbox contains 3 groups of controls:

1) Controls for choosing the type of recurrence. These inputs have the name 'repeat' and one of the following values: 'daily', 'weekly', 'monthly', 'yearly'.
The form must have at least one 'repeat' input with the value. You can use radio buttons, selects or set the default type in the hidden input.

Consider the following examples, each of those is a valid way for selecting the type of recurrence in the form. 

- Radiobuttons

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label><br />
<label><input type="radio" name="repeat" value="week"/>Weekly</label><br />
<label><input type="radio" name="repeat" value="month" />Monthly</label><br />
<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select input, without 'Monthly' and 'Yearly' options:

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Hidden input (the lightbox will create only 'Daily' series):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) A block for configuring the recurrence depending on the repeat type. For example, for the 'Daily' repeat type, the block will take the following structure:

~~~html
<div class="dhx_repeat_center">
   <div style="display:none;" id="dhx_repeat_day">
	 <label>
       <input class="dhx_repeat_radio" type="radio" 
       		name="day_type" value="d"/>Every
     </label>
       <input class="dhx_repeat_text" type="text" 
       		name="day_count" value="1" />day<br>
     <label>
       <input class="dhx_repeat_radio" type="radio" 
       		name="day_type" checked value="w"/>Every workday
     </label>
  </div>
...
</div>
         
~~~

Note, that the markup which is related to a specific type of recurrence can be wrapped in a div with the <b>id</b> in the following format <b>"dhx_repeat_&lt;repeat type&gt;"</b>, e.g. "dhx_repeat_day".
In this case it will be displayed only when the appropriate repeat type is selected.

3) Controls for specifying the end of recurrence. The end of recurrence is defined by input with the name 'end'.
<br>Possible values are <b>'no'</b>, <b>'date_of_end'</b>, <b>'occurences_count'</b>.

Similar to the 'repeat' controls, the form must have at least one input of this type.

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>No end date
  </label><br />
  <label>
    <input type="radio" name="end" value="date_of_end" />After</label>
    <input type="text" name="date_of_end" />
  <br />
  <label>
    <input type="radio" name="end" value="occurences_count" />After</label>
    <input type="text" name="occurences_count" value="1" />Occurrences
</div>
~~~

The date for the <b>'date_of_end'</b> mode must be defined in an input named 'date_of_end'. The same works for the <b>'occurences_count'</b> mode, 
that takes the number of occurrences  from an input named 'occurences_count'.
<br>

You can remove any type or predefine it in a hidden input:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2016" />
~~~
	
###Notes for changing the recurring block

Please, before starting to apply a custom configuration to the lightbox's recurring block, note the following things: 

1. The 'name' attribute is  hardcoded for all inputs -  the inputs with different names will be ignored.
2. The 'value' attribute is fixed for all inputs except for ones that imply direct input.
3. When you specify a new form - dhtmlxScheduler doesn't use it directly and just  replicates your HTML structure into the lightbox's template.
It means that all event handlers or custom properties that have been attached to  DOMElements of your form from the code won't be applied to the form in the lightbox.
If you want to attach event handlers, you need to either specify it as an inline HTML attribute, or attach a handler to the form when it's shown in the lightbox.

{{note
Beware, dhtmlxScheduler doesn't work with your original HTML form and just creates it's copy in the lightbox's template.
}}


For example:

- the following line will be copied to the lightbox:

~~~html
<input onclick="handler()"> 
~~~

- the line below won't be copied to the lightbox:

~~~js
addEventListener(node, "click", function(){...})
~~~


@linkclass:hidden






