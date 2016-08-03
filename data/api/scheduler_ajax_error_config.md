ajax_error
=============
@short:specifies how to display the default error notification in case the XML data loading failed
	
@default: "alert"

@type: string, boolean
@example:
// logs error message to console
scheduler.config.ajax_error = "console";

// or
// supresses the default error messages
// scheduler.config.ajax_error = false;

scheduler.init("scheduler_here");

@template:	api_config
@descr:

The default error notification (i.e. when  <code>scheduler.config.ajax_error = "alert"</code>) looks like this: 

<img src="api/ajax_error_property.png">

@apigroup: General settings
