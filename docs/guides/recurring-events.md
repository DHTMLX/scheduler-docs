---
title: "Recurring Events"
sidebar_label: "Recurring Events"
---

# Recurring Events 

Recurring events are a common feature in event calendar applications, allowing users to create events that repeat at specified intervals. Starting from v7.1 the Scheduler uses [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545) based format for recurring events. 

This article will explain how to use recurring events in the Scheduler and how to store them in the database.

:::note
You can find the description of the legacy format of recurring events [here](guides/recurring-events-legacy.md)
:::

By default, Scheduler doesn't support recurring events. To provide such a support, you need to enable a special extension on the page - **recurring**: 

~~~js
scheduler.plugins({
    recurring: true
});
~~~

Once the support for recurring events is activated, the lightbox starts looking as shown below: 

![recurring_lightbox](/img/recurring_lightbox.png)


## Configuration options

The library provides the following option to configure recurring events:

- [repeat_date](api/config/repeat_date.md) - sets the date format of the 'End by' field in the 'recurring' lightbox


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' lightbox

By default, once the recurring extension is enabled, the lightbox starts to have one more section - "Repeat event". 
And the default definition of the 'recurring' lightbox starts to be as in:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Format description

A recurring event is stored in the database as a single record that contains all fields of a regular event plus several additional properties: 

1. **start_date** - (_datetime_) defines the start date of the series
2. **end_date** - (_datetime_) defines the end date of the series
3. **rrule** - (_string_) defines the rule of repetition
4. **duration** - (_number_) the duration of the recurring instance
5. **recurring_event_id** - (_string|number_) the id of the parent series, only filled for modified or deleted occurrences of the series
6. **original_start** - (_datetime_) the original date of the edited instance, only filled for modified or deleted occurrences of the series
7. **deleted** - (_boolean_) specifies the deleted instance of the series, only filled for deleted occurrences of the series

**rrule** follows the iCalendar format as specified in RFC-5545, detailing the frequency, interval, and other parameters that control the recurrence pattern.

### Differences from iCalendar Format

Our format differs from the iCalendar format in the two key moments:

#### Separate storage of STDATE and DTEND:

In the iCalendar format, the start and end dates of a recurring series are typically included as a part of the **RRULE** string as **STDATE** and **DTEND** properties.
In our format, **stdate** and **dtend** are stored as separate fields. This separation allows for easier manipulation and querying of recurring events by date without the need to parse the **RRULE** string.

Here is an example of the recurring event series which is set to repeat every Monday starting from June 1, 2024 up until December 1, 2024:

~~~js
{
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2024-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2024-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
}
~~~

#### Handling exceptions

Exceptions, also referred to as modified or deleted occurrences of the series, are stored as separate event records that are linked to their parent series.
Exceptions have three additional properties: **recurring_event_id**, **original_start**, and **deleted**. 
These properties allow us to identify modified or deleted instances and their relationship to the parent series easily.

:::note
Note, that unlike the traditional iCalendar format, exceptions (modified or deleted instances) are **not** stored in the **EXDATE** property of the **RRULE** of the series.
:::

Here is the example of the recurring series with one modified and one deleted occurrence:

~~~js
[
    {
        "id": 1,
        "text": "Weekly Team Meeting",
        "start_date": "2024-06-03 09:00:00",
        "duration": 3600,
        "end_date": "2024-12-02 10:00:00",
        "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
        "recurring_event_id": null,
        "original_start": null
    },
    {
        "id": 2,
        "text": "Special Team Meeting",
        "start_date": "2024-06-10 09:00:00",
        "end_date": "2024-06-10 11:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2024-06-10 09:00:00"
    },
    {
        "id": 3,
        "text": "Deleted Team Meeting",
        "start_date": "2024-06-17 09:00:00",
        "end_date": "2024-06-17 10:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2024-06-17 09:00:00",
        "deleted": true
    }
]
~~~

The repeated event scheduled for `2024-06-10 09:00:00` will be replaced with `Special Team Meeting` record, and the event scheduled for `2024-06-17 09:00:00` will be skipped.

Note, that **rrule** of the modified or deleted occurrences is ignored. 

**text**, **start_date**, and **end_date** of deleted instances are also ignored and the values of these fields won't affect the behavior of the Scheduler.

## Editing/deleting a certain occurrence in the series 

There is a possibility to delete or edit a particular occurrence in a series. 

### Important tips

- For each update of the recurring event a separate record is created in the DB.
- Particular occurrences refer to the parent event through the **recurring_event_id** property.
- Once you have edited an occurrence in the series, the **original_start** field for this update 
will store the Date, when the occurrence should have happened if it wasn't edited, instead of the real event length. 
So if the occurrence has happened on July 27, 2024 at 15:00 and was moved to July 30, 2024 15:00, the time stamp would reflect the first date.


### Server-side logic 

In addition to extra fields, a specific logic needs to be added to the server-side controller:

- If a deleted instance was inserted - the server response must have the "deleted" status.
  - A deleted instance can be identified by the non-empty value of the **deleted** property.
- If a series was modified, all the modified and deleted occurrences of the series should be deleted.
  - Series can be identified by the non-empty value of the **rrule** property and the empty value of the **recurring_event_id** one.
  - Modified occurrences of the series are all the records in which **recurring_event_id** matches the **id** of the series.
- If an event with the non-empty **recurring_event_id** was deleted, it needs to be updated with **deleted="true**" instead of deleting.

:::note
You can find the complete code examples [here](integrations/howtostart-guides.md)
:::


## Custom control for the lightbox's recurring block

Starting from version 4.2, Scheduler allows you to specify a custom HTML for the 'recurring' block of the lightbox.

#### What customizations can you do?

1. Change the markup
2. Delete unnecessary elements (e.g., the "yearly" repeat type)
3. Set some default values for inputs (e.g., you need all series to be created with "no end date")

### Default template of the control for the lightbox's recurring block

The default template of the control for the lightbox's recurring block looks like the following code, 
where the `loc` object is a [locale](api/other/locale.md) object (region-specific labels) of the Scheduler:

~~~html
<div class="dhx_form_rrule">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">${loc.repeat_never}</option>
            <option value="DAILY">${loc.repeat_daily}</option>
            <option value="WEEKLY">${loc.repeat_weekly}</option>
            <option value="MONTHLY">${loc.repeat_monthly}</option>
            <option value="YEARLY">${loc.repeat_yearly}</option>
            <option value="WORKDAYS">${loc.repeat_workdays}</option>
            <option value="CUSTOM">${loc.repeat_custom}</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom dhx_hidden">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
              <option value="DAILY">${loc.repeat_freq_day}</option>
              <option value="WEEKLY">${loc.repeat_freq_week}</option>
              <option value="MONTHLY">${loc.repeat_freq_month}</option>
              <option value="YEARLY">${loc.repeat_freq_year}</option>
            </select>
        </div>

    <div class="dhx_form_repeat_custom_additional">
        <div class="dhx_form_repeat_custom_week dhx_hidden">
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="MO" />${loc.day_for_recurring[1]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TU" />${loc.day_for_recurring[2]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="WE" />${loc.day_for_recurring[3]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TH" />${loc.day_for_recurring[4]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="FR" />${loc.day_for_recurring[5]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SA" />${loc.day_for_recurring[6]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SU" />${loc.day_for_recurring[0]}</label>
        </div>

        <div class="dhx_form_repeat_custom_month dhx_hidden">
            <select name="dhx_custom_month_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_year dhx_hidden">
            <select name="dhx_custom_year_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>
    </div>

    <div class="dhx_form_repeat_ends">
        <div>${loc.repeat_ends}</div>
            <div class="dhx_form_repeat_ends_options">
                <select name="dhx_custom_repeat_ends">
                    <option value="NEVER">${loc.repeat_never}</option>
                    <option value="AFTER">${loc.repeat_radio_end2}</option>
                    <option value="ON">${loc.repeat_on_date}</option>
                </select>
                <div class="dhx_form_repeat_ends_extra">
                    <div class="dhx_form_repeat_ends_after dhx_hidden">
                        <label><input name="dhx_form_repeat_ends_after" type="number" 
                          min="1">${loc.repeat_text_occurrences_count}</label>
                    </div>
                    <div class="dhx_form_repeat_ends_on dhx_hidden">
                      <input type="date" name="dhx_form_repeat_ends_ondate">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
~~~

#### The main recurring select control

Basically, the recurring block of the lightbox contains the main recurring select control that has 5 
default types of recurrence with the following options: "Every day", "Every week", "Every month", 
"Every year", "Every weekday". Additionally, it includes the "Custom" option for creating the required
type and the "Never" option to disable the recurrence:

~~~html
<div class="dhx_form_repeat_pattern">
    <select>
        <option value="NEVER">Never</option>
        <option value="DAILY">Every day</option>
        <option value="WEEKLY">Every week</option>
        <option value="MONTHLY">Every month</option>
        <option value="YEARLY">Every year</option>
        <option value="WORKDAYS">Every weekday</option>
        <option value="CUSTOM">Custom</option>
    </select>
</div>
~~~

For the "Custom" repeat type there are special repeat type units: "Day", "Week", "Month", "Year" and the repeat interval input.
The "Week", "Month" and "Year" units have their own sections with specific repetition options (by default these sections are hidden until you select the required type):

~~~html
<div class="dhx_form_repeat_custom ">
    <div class="dhx_form_repeat_custom_interval">
        <input name="repeat_interval_value" type="number" min="1">
        <select name="repeat_interval_unit">
            <option value="DAILY">${loc.repeat_freq_day}</option>
            <option value="WEEKLY">${loc.repeat_freq_week}</option>
            <option value="MONTHLY">${loc.repeat_freq_month}</option>
            <option value="YEARLY">${loc.repeat_freq_year}</option>
        </select>
    </div>

    <div class="dhx_form_repeat_custom_additional">
        <div class="dhx_form_repeat_custom_week dhx_hidden">
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="MO" />${loc.day_for_recurring[1]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TU" />${loc.day_for_recurring[2]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="WE" />${loc.day_for_recurring[3]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TH" />${loc.day_for_recurring[4]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="FR" />${loc.day_for_recurring[5]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SA" />${loc.day_for_recurring[6]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SU" />${loc.day_for_recurring[0]}</label>
        </div>

        <div class="dhx_form_repeat_custom_month dhx_hidden">
            <select name="dhx_custom_month_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_year dhx_hidden">
            <select name="dhx_custom_year_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>
    </div>
</div>
~~~

#### The block for specifying the end of the recurrence

The end of recurrence is defined by the select control with the following values: "NEVER", "ON", "AFTER". If the "AFTER" option is selected, there will be an additional 
input for the amount of repeat events. If the "ON" option is selected, there will be an additional date input:

~~~html
<div class="dhx_form_repeat_ends">
    <div>${loc.repeat_ends}</div>
        <div class="dhx_form_repeat_ends_options">
            <select name="dhx_custom_repeat_ends">
                <option value="NEVER">${loc.repeat_never}</option>
                <option value="AFTER">${loc.repeat_radio_end2}</option>
                <option value="ON">${loc.repeat_on_date}</option>
            </select>
            <div class="dhx_form_repeat_ends_extra">
                <div class="dhx_form_repeat_ends_after dhx_hidden">
                  <label><input name="dhx_form_repeat_ends_after" type="number" 
                    min="1">${loc.repeat_text_occurrences_count}</label>
                </div>
            <div class="dhx_form_repeat_ends_on dhx_hidden">
                <input type="date" name="dhx_form_repeat_ends_ondate">
            </div>
        </div>
    </div>
</div>
~~~

### Example of a custom recurring block

Let's create an example of a custom recurring block. Imagine that you want to remove the "monthly" and "yearly" repeat types and have the "no end date" option
for all events (i.e. remove the block for specifying the recurrence end). 

1. Define the markup of a custom form and place it somewhere on the page 
(you can start by copying the default template):

~~~html
<!-- note that you need to specify the id of your custom recurring form  -->
<div class="dhx_form_rrule" id="my_recurring_form" style="display:none;">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">Never</option>
            <option value="DAILY">Every day</option>
            <option value="WEEKLY">Every week</option>
            <option value="WORKDAYS">Every weekday</option>
            <option value="CUSTOM">Custom</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
                <option value="DAILY">Day</option>
                <option value="WEEKLY">Week</option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_additional">
            <div class="dhx_form_repeat_custom_week dhx_hidden">
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="MO" />Monday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TU" />Tuesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="WE" />Wednesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TH" />Thursday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="FR" />Friday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SA" />Saturday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SU" />Sunday</label>
            </div>
        </div>
    </div>
</div>
~~~

2. Set the **form** parameter of the "recurring" section to the id of your custom form:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", 
        form: "my_recurring_form" }, /*!*/
    { name: "time", type: "time", map_to: "auto", height: 72 },
];
~~~

The resulting lightbox with a custom recurring block is shown in the image below:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

The following snippet demonstrates how a lightbox with a custom recurring block given above can be implemented:

**Related sample** [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)
  
### Notes for changing the recurring block

Please, before starting to apply a custom configuration to the lightbox's recurring block, note the following things: 

1. The **name** attribute is hardcoded for all inputs: the inputs with different names will be ignored.
2. The **value** attribute is fixed for all inputs except for ones that imply direct input.
3. When you specify a new form, Scheduler doesn't use it directly and just replicates your HTML structure in the lightbox's template.
It means that all event handlers or custom properties that have been attached to DOMElements of your form from the code won't be applied to the form in the lightbox.
If you want to attach an event handler, you need either to specify it as an inline HTML attribute, or attach a handler to the form when it's shown in the lightbox.

:::note
Beware, Scheduler doesn't work with your original HTML form and just creates its copy in the lightbox's template.
:::


For example:

- the following line will be copied to the lightbox:

~~~html
<input onclick="handler()"> 
~~~

- the line below won't be copied to the lightbox:

~~~js
addEventListener(node, "click", function(){...})
~~~

## Custom confirmation modal

When a user edits or drags a recurring event, the scheduler displays a built-in modal that asks whether to modify just this occurrence, this and following events, or the entire series. You can replace it with your own UI by overriding `scheduler.ext.recurring.confirm`.

~~~js
scheduler.ext.recurring.confirm = function(context) {
  // context contains:
  // - origin: "lightbox" | "dnd"
  // - occurrence: the occurrence event object
  // - series: the parent series event object
  // - labels: { title, ok, cancel, occurrence, following, series }
  // - options: ["occurrence", "following", "series"]
  //
  // Return one of: "occurrence", "following", "series", or null to cancel.
  // Can return a Promise for async UI.

  return new Promise(function(resolve) {
    myCustomDialog.show({
      title: context.labels.title,
      options: context.options,
      onSelect: function(choice) { resolve(choice); },
      onCancel: function() { resolve(null); }
    });
  });
};
~~~

The context object has the following properties:

| Property | Type | Description |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Whether the action was triggered from the lightbox or drag-and-drop |
| `occurrence` | `object` | The specific occurrence being edited |
| `series` | `object` | The parent recurring event |
| `labels` | `object` | Localized strings: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Available choices, e.g. `["occurrence", "following", "series"]` |

The function must return `"occurrence"`, `"following"`, `"series"`, or `null` to cancel. It can return the value directly or as a Promise.

For a React implementation, see the [React Scheduler documentation](integrations/react/overview.md#customizing-the-recurrence-confirmation-modal).


## Legacy format of recurring events

Until v7.1 Scheduler used a custom format for recurring events, you can find the format details [here](guides/recurring-events-legacy.md).
