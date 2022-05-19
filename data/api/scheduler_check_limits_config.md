check_limits
=============
@short:activates/disables checking of limits 
	

@type: boolean
@default:true

@example:
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2013,7,6),"week");

@related:limits.md
@template:	api_config
@descr:

{{note The property requires the [limit](extensions_list.md#limit) plugin to be activated.}}

The parameter is available from version 3.5.

It makes sense to disable this option when you don't set any limits and just make some highlighting or mark the current time - this will increase the performance speed. But if you have some limitation set, disabling this option will disable all the 'blocking' methods

@apigroup: Time, time zones
