getActionData
=============
@short: 
	returns the current cursor-pointed date and section (if defined) 
    
@params: 
- e		Event	a native event object

@returns:
- point		object	an object with 2 properties: <ul><li><b>date</b> - (<i>Date</i>) the object of the cursor-pointed date </li> <li><b>section</b> - (<i>string, number</i>) the id of the cursor-pointed section (<i>for the Timeline and Units view</i>)</li></ul>
@example: 
scheduler.attachEvent("onMouseMove", function(id, e){
   var action_data = scheduler.getActionData(e);
   // -> {date:Tue Jun 30 2009 09:10:00, section:2}
   ...
})



@template:	api_method
@relatedsample:
	09_api/01_action_data.html
	06_timeline/12_section_tooltip.html
@descr: 
{{note
Available from version 3.5
}}



