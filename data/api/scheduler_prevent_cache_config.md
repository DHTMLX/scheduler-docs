prevent_cache
=============
@short:enables/disables caching of GET requests in the browser 
	

@type: boolean
@default:false
@example:
scheduler.config.prevent_cache = true;
...
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

@relatedsample:
	01_initialization_loading/05_loading_database.html

@template:	api_config
@descr:
Enabling the property is recommended.

@apigroup: General settings