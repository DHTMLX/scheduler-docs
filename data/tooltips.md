 Tooltips 
==============
To display tooltips for events you should include the **dhtmlxscheduler_tooltip.js** extension once on the page.

~~~js
<script src="codebase/ext/dhtmlxscheduler_tooltip.js"></script>
~~~


After that tooltips will be displayed with the default settings.

<img src="tooltip.png"/>
  

To configure the tooltips you have 4 properties and 2 templates:

Configuration properties
------------------------------------

- **className** -  the name of a css class that will be applied to tooltips
- **delta_x** - the right (if positive) offset of the cursor's position (by default, 15)
- **delta_y**- the top (if positive) offset of the cursor's position (by default, -20)
- **timeout_to_display** - the delay in milliseconds, before tooltip is displayed for an event(by default, 50)

~~~js
dhtmlXTooltip.config.className = 'dhtmlXTooltip tooltip'; 
dhtmlXTooltip.config.timeout_to_display = 50; 
dhtmlXTooltip.config.delta_x = 15; 
dhtmlXTooltip.config.delta_y = -20; 
~~~

Templates
------------------------------------------
- api/scheduler_tooltip_text_template.md - specifies the text of tooltips  
- api/scheduler_tooltip_date_format_template.md - specifies the format of start and end dates displayed in the tooltip

~~~js
var format=scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
	return "<b>Event:</b> "+event.text+"<br/><b>Start date:</b> "+
    format(start)+"<br/><b>End date:</b> "+format(end);
};
~~~



