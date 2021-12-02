serverList
=============

@short: 
	defines a named collection that can be loaded into Units, Timeline views, or the Lightbox

@params: 
- list_name	string 		the name of a list
* options	array		optional, an array of options

@returns:
- list		array 	a list of options

@example: 
//returns a list of options with the name 'my_list'
var list = scheduler.serverList("my_list"); 
...
//creates and returns the specified list
var list = scheduler.serverList("options", [
	{key: 1, label: "John"},
	{key: 2, label: "Adam"},
	{key: 3, label: "Diane"}
]);



@template:	api_method
@relatedapi:
	api/scheduler_updatecollection.md
@relatedsample:
	01_initialization_loading/09_connector_options.html
    03_extensions/17_connector_units.html   
    03_extensions/21_multiselect_options.html
    
@descr: 
- If the method is called only with the first parameter, the method will return a list with that name (if exists).
- If the method is called with 2 parameters, the scheduler will create a list with the specified name or,if a list with such name already exists, the scheduler will rewrite it

Lists, created with the method, can be after updated with the api/scheduler_updatecollection.md method.

That's why, if there is a need to update collections, e.g. select options, a list of units in  the Timeline, Units view, 
it's a good idea to create them as a named list of options.

~~~js
scheduler.serverList("sections", [
	{ key: 1, label: "Section A" },
	{ key: 2, label: "Section B" },
	{ key: 3, label: "Section C" },
	{ key: 4, label: "Section D" }
]);

scheduler.config.lightbox.sections = [
	{ 
		name: "description", height: 130, map_to: "text", type: "textarea", 
	  	focus: true 
	},
	{ 
		name: "sections", type: "select",
	  	options: scheduler.serverList("sections"), map_to: "section_id"  /*!*/
	},
	{ 
		name: "time", height: 72, type: "time", map_to: "auto" 
	}
]; 
...
// the same, but with the "units" list
scheduler.createUnitsView({
	name: "unit",
	property: "section_id",
	list: scheduler.serverList("sections") /*!*/ 
});

scheduler.createTimelineView({
	name: "timeline",
	x_unit: "minute",
	x_date: "%H:%i",
	x_step: 30,
	x_size: 24,
	x_start: 16,
	x_length: 48,
	y_unit: scheduler.serverList("sections"), /*!*/
	y_property: "section_id",
	render: "bar"
});

scheduler.init("scheduler_here", new Date(), "unit");
~~~

Then, at a later point in time, it will be possible to change options on all these places by calling [scheduler.updateCollection](api/scheduler_updatecollection.md):

~~~js
scheduler.updateCollection("sections", [
	{ key: 5, label: "Section E" },
	{ key: 6, label: "Section F" },
	{ key: 7, label: "Section G" }
]);
~~~