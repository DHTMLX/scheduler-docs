undo_deleted
=============

@todo:
	check 


@short:provides the Undo popup when you delete an event 
	

@type: boolean
@default:true
@example:
// disables the Undo popup showing
scheduler.config.undo_deleted = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");

@template:	api_config
@descr:
<img src="api/undo_deleted_config.png"/>

@changelog:
Added in v7.1