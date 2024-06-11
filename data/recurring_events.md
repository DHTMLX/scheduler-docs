Recurring Events 
==============

Recurring events are a common feature in event calendar applications, allowing users to create events that repeat at specified intervals. Starting from v7.1 the Scheduler uses [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545) based format for recurring events. 

This article will explain how to use recurring events in the Scheduler and how to store them in the database.

{{note
You can find the description of the legacy format of recurring events [here](recurring_events_legacy.md)
}}

By default, Scheduler doesn't support recurring events. To provide such a support, you need to enable a special extension on the page - **recurring**: 

~~~js
scheduler.plugins({
    recurring: true
});
~~~

Once the support for recurring events is activated, the lightbox starts looking as shown below: 

<img src="recurring_lightbox.png"/>


Configuration options
---------------------------------------

The library provides the following options to configure recurring events:

{{links
- api/scheduler_repeat_date_config.md - sets the date format of the 'End by' field in the 'recurring' lightbox
- api/scheduler_include_end_by_config.md - defines whether the date specified in the 'End by' field should be exclusive or inclusive
- api/scheduler_recurring_overflow_instances_config.md - defines the behavior of the recurrences that transfer to the next month
}}

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~

{{sample
	03_extensions/01_recurring_events.html
}}

'Recurring' lightbox
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


Format description
---------------------------

A recurring event is stored in the database as a single record that contains all fields of a regular event plus 6 additional: 

1.  **stdate** - (_datetime_) defines the start date of the series
2.  **dtend** - (_datetime_) defines the end date of the series
3.  **rrule** - (_string_) defines the rule of repetition 
4.  **recurring_event_id** - (_string|number_) id of the parent series, only filled for modified or deleted occurrences of the series
5.  **original_start** - (_datetime_) the original date of the edited instance, only filled for modified or deleted occurrences of the series
6.  **deleted** - (_boolean_) specifies the deleted instance of the series, only filled for deleted occurrences of the series

**rrule** Follows the iCalendar format as specified in RFC-5545, detailing the frequency, interval, and other parameters that control the recurrence pattern.

### Differences from iCalendar Format

Our format differs from the iCalendar format in the two key moments:

#### Separate storage of STDATE and DTEND:

In the iCalendar format, the start and end dates of a recurring series are typically included as a part of the **RRULE** string as **STDATE** and **DTEND** properties.
In our format, **stdate** and **dtend** are stored as separate fields. This separation allows for easier manipulation and querying of recurring events by date without the need to parse the **RRULE** string.

Here is an example of the recurring event series which is set to repeat every Monday starting from June 1, 2024 up until December 1, 2024:

~~~
{
  "id": 1,
  "text": "Weekly Team Meeting",
  "start_date": "2024-06-01 09:00:00",
  "end_date": "2024-06-01 10:00:00",
  "dstart": "2024-06-01 09:00:00",
  "dtend": "2024-12-01 10:00:00",
  "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
  "recurring_event_id": null,
  "original_start": null
}
~~~

#### Handling exceptions

Exceptions, also referred to as modified or deleted occurrences of the series, are stored as separate event records that are linked to their parent series.
Exceptions have three additional properties: **recurring_event_id**, **original_start**, and **deleted**. 
These properties allow us to identify modified or deleted instances and their relationship to the parent series easily.

{{note
Note, that unlike the traditional iCalendar format, exceptions (modified or deleted instances) are **not** stored in the **EXDATE** property of the **RRULE** of the series.
}}

Here is the example of the recurring series with one modified and one deleted occurrence:
~~~
[
  {
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2024-06-03 09:00:00",
    "end_date": "2024-06-03 10:00:00",
    "dstart": "2024-06-03 09:00:00",
    "dtend": "2024-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
  },
  {
    "id": 2,
    "text": "Special Team Meeting",
    "start_date": "2024-06-10 09:00:00",
    "end_date": "2024-06-10 11:00:00",
    "dstart": null,
    "dtend": null,
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-10 09:00:00"
  },
  {
    "id": 3,
    "text": "Deleted Team Meeting",
    "start_date": "2024-06-17 09:00:00",
    "end_date": "2024-06-17 10:00:00",
    "dstart": null,
    "dtend": null,
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-17 09:00:00",
    "deleted": true
  }
]
~~~

The repeated event scheduled for `2024-06-10 09:00:00` will be replaced with `Special Team Meeting` record, and the event scheduled for `2024-06-17 09:00:00` will be skipped.

Note, that **dstart**, **dtend**, and **rrule** of the modified or deleted occurrences are ignored. 

**text**, **start_date**, and **end_date** of deleted instances are also ignored and the values of these fields won't affect the behavior of the Scheduler.



Editing/deleting a certain occurrence in the series 
--------------------------------

There is a possibility to delete or edit a particular occurrence in a series. 

###Important tips

- For each update of the recurring event a separate record is created in the DB.
- Particular occurrences refer to the parent event through the **recurring_event_id** property.
- Once you have edited an occurrence in the series, the **original_start** field for this update 
will store the Date, when the occurrence should have happened if it wasn't edited, instead of the real event length. 
So if the occurrence has happened on July 27, 2024 at 15:00 and was moved to July 30, 2024 15:00, the time stamp would reflect the first date.


###Server-side logic 

In addition to extra fields, a specific logic needs to be added to the server-side controller:

- If a deleted instance was inserted - the server response must have the "deleted" status.
	- A deleted instance can be identified by the non-empty value of the **deleted** property.
- If a series was modified, all the modified and deleted occurrences of the series should be deleted.
	- Series can be identified by the non-empty value of the **rrule** property and the empty value of the **recurring_event_id** one.
	- Modified occurrences of the series are all the records in which **recurring_event_id** matches the **id** of the series.
- If an event with the non-empty **recurring_event_id** was deleted, it needs to be updated with **deleted=true** instead of deleting.

{{note
You can find the complete code examples [here](howtostart_guides.md)
}}


Custom control for the lightbox's recurring block
------------------------------------

Starting from version 4.2, dhtxmlScheduler allows you to specify a custom HTML form for the 'recurring' block of the lightbox.

####What customizations can you do?

1. To change the form markup
2. To delete unnecessary elements (e.g., the 'yearly' repeat type and all related inputs)
3. To set some default values for inputs (e.g., you need all series to be created with 'no end date'. Then, you make the 'no end date' option checked and hide the 
whole block for specifying the recurrence end.


### Usage example

Let's start with an example. Imagine that you want to remove the 'monthly' and 'yearly' repeat types and have 
the 'no end date' option for all events (i.e. remove the block for specifying the recurrence end). 

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
For example, for the English locale you need to check the <b>'scheduler\sources\locale\recurring\repeat_template_en.htm'</b> file.

Basically, the recurring block of the lightbox contains 3 groups of controls:

1) Controls for choosing the type of recurrence. These inputs have the 'repeat' name and one of the following values: 'daily', 'weekly', 'monthly', 'yearly'.
The form must have at least one 'repeat' input with a value. You can use radio buttons, selects or set the default type in the hidden input.

Consider the following examples, each of them is a valid way for selecting the type of recurrence in the form. 

- Radiobuttons:

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label><br />
<label><input type="radio" name="repeat" value="week"/>Weekly</label><br />
<label><input type="radio" name="repeat" value="month" />Monthly</label><br />
<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select input, without the 'Monthly' and 'Yearly' options:

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Hidden input (the lightbox will create only the 'Daily' series):

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

3) Controls for specifying the end of recurrence. The end of recurrence is defined by the input with the 'end' name.
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
that takes the number of occurrences from an input named 'occurences_count'.
<br>

You can remove any type or predefine it in a hidden input:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2024" />
~~~
	
###Notes for changing the recurring block

Please, before starting to apply a custom configuration to the lightbox's recurring block, note the following things: 

1. The 'name' attribute is hardcoded for all inputs: the inputs with different names will be ignored.
2. The 'value' attribute is fixed for all inputs except for ones that imply the direct input.
3. When you specify a new form, dhtmlxScheduler doesn't use it directly and just replicates your HTML structure in the lightbox's template.
It means that all event handlers or custom properties that have been attached to DOMElements of your form from the code won't be applied to the form in the lightbox.
If you want to attach an event handler, you need either to specify it as an inline HTML attribute, or attach a handler to the form when it's shown in the lightbox.

{{note
Beware, dhtmlxScheduler doesn't work with your original HTML form and just creates its copy in the lightbox's template.
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

Legacy format of recurring events
-----------------------

Until v7.1 Scheduler used a custom format for recurring events, you can find the format details [here](recurring_events_legacy.md).

@index:

- recurring_events_legacy.md





