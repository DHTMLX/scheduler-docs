buttons_right
=============
@short:stores a collection of buttons resided in the right bottom corner of the lightbox
	
@default:["dhx_delete_btn"]
@type:array 
@example:
<style>
.custom_btn_info{
    background-image:url('../../codebase/imgs/controls.gif');
    width:20px;
}
</style>
<script>
	scheduler.config.buttons_right = ["custom_btn_info"];
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
	api/scheduler_buttons_left_config.md
    api/scheduler_onlightboxbutton_event.md

@apigroup: Lightbox
    