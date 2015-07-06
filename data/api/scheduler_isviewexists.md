isViewExists
=============
@short: checks whether a view with the specified name exists
	

@params:
- name	string	the view name

@returns:
- isExist	boolean		<i>true</i>, if the view exists. Otherwise, <i>false</i>
@example:
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/

@template:	api_method
@descr:

