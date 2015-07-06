resetLightbox
=============
@short: removes the current lightbox's HTML object element 


@example:        
var full_lightbox = [
	{ name: "description", map_to: "text", type: "textarea", focus: true},
	{ name: "time", 	   map_to: "auto", type: "time"}
];
var restricted_lightbox = [
	{ name: "description", map_to: "text", type: "textarea", focus: true},
];
...
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
	scheduler.resetLightbox();
    var ev = scheduler.getEvent(event_id);  
    if (ev.restricted ==true){
    	scheduler.config.lightbox.sections = restricted_lightbox;
    } else {
    	scheduler.config.lightbox.sections = full_lightbox;
    };   
	return true;
});


@template:	api_method
@relatedsample:
	02_customization/29_changing_lightbox_configurations.html
@descr: 

The method can be used to change the lightbox's configuration dynamically: you call the method to delete the current lightbox object and regenerate 
a new one based on the <a href="api/scheduler_lightbox_config.md">lightbox configuration</a>.

