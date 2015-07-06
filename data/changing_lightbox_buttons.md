Changing Buttons in the Lightbox
==========================================
There is a possibility to redefine the default buttons in the lightbox.

<br>

<img src="lightbox_buttons.png"/>

Let's start from the collection where all these buttons are stored.<br>
By default, the lightbox contains 3 buttons ('Save', 'Cancel', 'Delete') that are specified by the api/scheduler_buttons_left_config.md and api/scheduler_buttons_right_config.md configuration options.

~~~js
scheduler.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn"];
scheduler.config.buttons_right = ["dhx_delete_btn"];
~~~

To redefine the default sets of buttons, follow the steps below:

<ol>
	<li>Specify new members of the <b>buttons_left</b> or  <b>buttons_right</b> array:
~~~js
scheduler.config.buttons_left=["dhx_save_btn","dhx_cancel_btn","locate_button"];
~~~
</li>
	<li>Set the button label:
~~~js
 scheduler.locale.labels["locate_button"] = "Location";
~~~
</li>
	<li>To set the icon for the button (and/or apply some other styling) you should specify the CSS class as in:
~~~js
.locate_button
{
	background-image:url('../../codebase/imgs/location.gif');
    background-position: -2px 0px;
    width:20px;
}
~~~
</li>
	<li>Specify the  api/scheduler_onlightboxbutton_event.md handler that will treat clicks on the button:
~~~js
scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
	if(button_id == "locate_button"){
    	alert("Location!");
    }
});
~~~
</li>
</ol>
