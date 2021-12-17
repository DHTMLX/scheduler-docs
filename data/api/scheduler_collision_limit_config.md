collision_limit
=============
@short:sets the maximum allowable number of events per time slot 
	
@type: number
@default:1
@example:
scheduler.config.collision_limit = 2;
...
scheduler.init('scheduler_here',new Date(2010,05,11),"week");

@related:
	collisions.md
@template:	api_config
@descr:
{{note The property requires the [collision](extensions_list.md#collision) plugin to be activated.}}

@apigroup: Events

