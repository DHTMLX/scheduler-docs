server_utc
=============

@short: enables converting server-side dates from UTC to a local time zone (and backward) while sending data to the server
	

@type: boolean
@default:false
@example:
scheduler.config.server_utc = true;

scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:


