serverList
=============
@short: 
	returns a list of options

@params: 
- list_name	string 		the name of a list
* options	array		an array of options

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
// with such declaration it would be possible to update options 
// in the select element through the list named 'goods'

scheduler.config.lightbox.sections=[   
	{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
	{name:"items", height:23, type:"select", 
    options:serverList("goods", goods_array), map_to:"section_id" }, 
	{name:"time", height:72, type:"time", map_to:"auto"}
]; 
...
// the same, but with the "units" list
scheduler.createUnitsView({
	name:"unit",
	property:"section_id",
	list:scheduler.serverList("units", sections),
	size:20,
	step:1
});

~~~

