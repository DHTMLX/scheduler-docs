container_autoresize
=============

@short: forces the scheduler container to automatically change its size to show the whole content without scrolling
	

@type: boolean
@default:true
@require:container_autoresize
@example:
scheduler.config.container_autoresize = false;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");

@template:	api_config
@descr:
{{note
Note, it's enough to include the extension file to enable the parameter.
}}
<img src="api/container_autoresize_property.png"/>

@apigroup: General setting/View settings
