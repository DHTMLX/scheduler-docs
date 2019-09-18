RTL (Right-to-left) Mode
=========================

You can enable the RTL mode for the scheduler via the [rtl configuration option](api/scheduler_rtl_config.md).

~~~js
scheduler.config.rtl = true;
~~~

After implementing the RTL mode, all the elements of the calendar will be displayed automatically from right to left, except for the elements of the scheduler header.

<img src="rtl.png"/>


to change...

RTL Mode Examples
-------------------

<b>Month View in the RTL mode</b>

Let's see how the Month View looks in the RTL mode. The event's titles and details now are located on the right side of the event's box.

<img src="month_view_rtl.png"/>

<b>Event's Window in the RTL mode</b>

There is a good sample how the appearance of the window with event's details changes after applying the RTL mode in the image below

<img src="window_with_details.png"/>

<b>Timeline in the RTL mode</b>

The RTL mode automatically arranges timelines in the scheduler from right to left

<img src="timeline_rtl.png"/>