---
title: "Blocking and Marking Dates"
sidebar_label: "Blocking and Marking Dates"
---

# Blocking and Marking Dates

The library provides the **Limit** extension that allows you to block and mark (highlight) certain dates or date ranges.

To start using the plugin, activate it on the page. 

:::note
Note, if you use the [](views/timeline.md), the 'limit' extension should be enabled before the 'timeline' one:
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~


## Configuration options

The extension gives at your disposal the next configuration options:

- [display_marked_timespans](api/config/display_marked_timespans.md) - defines whether the marked (blocked) time spans should be highlighted in the scheduler
- [check_limits](api/config/check_limits.md) - activates/disables checking of limits
- [mark_now](api/config/mark_now.md) - enables/disables the marker displaying the current time
- [now_date](api/config/now_date.md) - sets the date for the [mark_now](api/config/mark_now.md) option
- [limit_end](api/config/limit_end.md) - sets the end limit of the allowable date range
- [limit_start](api/config/limit_start.md) - sets the start limit of the allowable date range
- [limit_view](api/config/limit_view.md) - limits viewing events


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## Related events 

If the scheduler detects an attempt to create/modify an event with a non-allowed date, the [onLimitViolation](api/event/onlimitviolation.md) event will be generated.

## How to block certain dates?

There are a couple of methods you can specify a limit in the scheduler with:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - marks dates, but with certain settings makes blocking (allows setting custom styling for the limit)
- [markTimespan](api/method/marktimespan.md) - marks and/or blocks date(s) by applying the default or a custom style to them. Marking is canceled right after any internal update occurs in the app. Can be used for highlighting


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## How to mark certain dates?

There are 2 methods that can be used to mark the specified date(s):


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - marks dates, but with certain settings makes blocking (allows setting custom styling for the limit)
- [markTimespan](api/method/marktimespan.md) - marks and/or blocks date(s) by applying the default or a custom style to them. Marking is canceled right after any internal update occurs in the app. Can be used for highlighting


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Removing marking/blocking

There are a couple of methods that can be used to remove the currently marked/blocked time spans:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - removes marking/blocking set by the [addMarkedTimespan](api/method/addmarkedtimespan.md) method
- [unmarkTimespan](api/method/unmarktimespan.md) - removes marking/blocking, set by the [markTimespan](api/method/marktimespan.md) method


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Blocking priority

When you call the 'blocking' methods several times and block different ranges, blocking will follow this priority (from highest to lowest):


1. Dates specified through Date() objects for certain items;
2. Dates for certain items (when the **sections** parameter is defined);
3. Dates specified through Date() objects;
4. Other dates.

- A blocking/marking with the higher priority will overwrite ones with the lower priority if they have the same **type**. 
- Several blocking/marking methods with the same priority (located in the same time slot) will be applied simultaneously.

For example:


~~~js
scheduler.addMarkedTimespan({ // blocks 4th July, 2027 (this is Wednesday).
    days:  new Date(2027, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // the name of applied CSS class
});
scheduler.addMarkedTimespan({ // blocks each Sunday, Monday, Wednesday
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // the name of applied CSS class
});
//blocks each Sunday and Wednesday just for an item with id="2" 
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // the name of applied CSS class
    sections: { timeline: 2} 
});

~~~


As a result of calling these methods you will get the following:


1. First of all, the scheduler will block **each Sunday and Wednesday for the item (id="2)" in the Timeline view** and **color them in gray**.
2. Then, will block **4th July, 2012** and **color it in red**.
3. Finally, will block **each Sunday, Monday, Wednesday** and **color them in blue**.

![limits_priority.png](/img/limits_priority.png)

In order to change this behavior and display all markers regardless of their priority, you can use the [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) setting:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~
