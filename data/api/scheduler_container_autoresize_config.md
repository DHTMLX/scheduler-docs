container_autoresize
=============

@short: forces the scheduler container to automatically change its size to show the whole content without scrolling
	

@type: boolean
@default:true

@example:
scheduler.config.container_autoresize = false;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");

@template:	api_config
@descr:

{{note The property will be enabled after you enable the [container_autoresize](extensions_list.md#containerautoresize) plugin.}} 

<img src="api/container_autoresize_property.png"/>

@apigroup: General setting/View settings

@relatedsample: 03_extensions/28_container_autoresize.html