Tooltips 
==============

To display tooltips for events, you should activate the **Tooltip** extension once on the page.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

After that tooltips will be displayed with the default settings.

<img src="tooltip.png">


{{sample 03_extensions/20_tooltip.html}}
<br><br>

To configure tooltips, you have the following API:

Methods
----------------

- **hide()** - hides the tooltip
- **show(event,text)** - shows the tooltip at the browser event location with a specified content. The method takes two parameters:
	- *event* - browser event
	- *text* - tooltip content, will be added to innerHTML of the tooltip element

~~~js
dhtmlXTooltip.hide();
dhtmlXTooltip.show(event,text);
~~~


Configuration properties
------------------------------------

- **className** -  the name of the CSS class that will be applied to tooltips
- **timeout_to_display** - the delay in milliseconds, before tooltip is displayed for an event (by default, 50)
- **timeout_to_hide** - the delay in milliseconds, before the tooltip hides (by default, 50)
- **delta_x** - the right (if positive) offset of the cursor position (by default, 15)
- **delta_y** - the top (if positive) offset of the cursor position (by default, -20)

~~~js
dhtmlXTooltip.config.className = 'dhtmlXTooltip tooltip'; 
dhtmlXTooltip.config.timeout_to_display = 50;
dhtmlXTooltip.config.timeout_to_hide = 50;
dhtmlXTooltip.config.delta_x = 15; 
dhtmlXTooltip.config.delta_y = -20; 
~~~

Templates
------------------------------------------

- api/scheduler_tooltip_text_template.md - specifies the text of tooltips  
- api/scheduler_tooltip_date_format_template.md - specifies the format of start and end dates displayed in the tooltip

~~~js
var format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
	return "<b>Event:</b> "+event.text+"<br/><b>Start date:</b> "+
    format(start)+"<br/><b>End date:</b> "+format(end);
};
~~~



