updateCollection
=============
@short: 
	updates the specified collection with new options

@params: 
- collection	string 		the name of the collection to update
- options		array	the new values of the collection

@example: 
	
scheduler.config.lightbox.sections=[   
	{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
	{name:"items", height:23, type:"select", 
    options:scheduler.serverList("goods", goods_array), map_to:"section_id" }, 
	{name:"time", height:72, type:"time", map_to:"auto"}
]; 


@returns: 
- collection	boolean		<i>true</i>, if the update was successful; <i>false</i>, if the collection wasn't found
@template:	api_method
@relatedapi:
	api/scheduler_serverlist.md
    api/scheduler_onoptionsload_event.md
@descr: 
 
- The method calls the api/scheduler_onoptionsload_event.md event and resets the lightbox. 
- The collection can be created with the api/scheduler_serverlist.md method.

###Examples

####Select control

Let's assume that you have the lightbox as in:

~~~js
scheduler.config.lightbox.sections = [
	{ name: "description", ...},
	{ name: "sections", type: "select", options: scheduler.serverList("sections"), /*!*/
		map_to: "section_id" },
	{ name: "time", ... }
]; 
~~~

With such declaration it would be possible to update options in the select control through the list named 'sections'. <br>
To update the 'sections' list you can use:
~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~


####Units view
Let's assume that you have the Units view as in:

~~~js
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections")  /*!*/
});
~~~

To update the list of displayed units you can use:

~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~

