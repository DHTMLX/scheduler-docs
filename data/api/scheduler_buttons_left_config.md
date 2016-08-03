buttons_left
=============
@short: stores a collection of buttons resided in the left bottom corner of the lightbox
	
@default:["dhx_save_btn", "dhx_cancel_btn"]
@type: array
@example:
<style>
.custom_btn_info{
    background-image:url('../../codebase/imgs/controls.gif');
    width:20px;
}
</style>
<script>
	scheduler.config.buttons_left = ["custom_btn_info"];
	scheduler.locale.labels["custom_btn_info"] = "Info";
    scheduler.init('scheduler_here',new Date(2013,05,11),"week");
	...
	scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
    	if(button_id == "custom_btn_info"){
        	alert("Info!");
    	}
	});
</script>

@template:	api_config
@descr:

<img src="api/buttons_property.png"/>

@relatedapi:
	api/scheduler_buttons_right_config.md
    api/scheduler_onlightboxbutton_event.md

@apigroup: Lightbox
    