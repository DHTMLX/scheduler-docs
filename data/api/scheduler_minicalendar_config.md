minicalendar
=============
@short:specifies the mini calendar object
	

@type: object
@default: { mark_events: true }

@example:
scheduler.config.minicalendar.mark_events = false; 
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");

@template:	api_config
@descr:
{{note The property requires the [minical](extensions_list.md#minicalendardatepicker) plugin to be activated.}} 

The minicalendar object has 1 property:

- **mark_events** - (*array*) defines whether events will be highlighted in the mini calendar

<br>

<img src="api/minicalendar_property.png"/>
@relatedsample:	
	07_skins/01_default.html
    
@apigroup: General settings/View settings
    