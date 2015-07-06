Customizing the select and edit bars
==============

dhtmlxScheduler provides the possibility to define a custom set of buttons for the edit and select bars. 

##The select bar
By default, the select bar contains 3 buttons ('Details', 'Edit', 'Delete') that are specified by the api/scheduler_icons_select_config.md configuration option.


~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];

~~~


###Usage example
Let's consider the select bar shown on the picture below:
  
   
  
  

![select_bar.png](select_bar.png)

To the existing buttons we have added a new one - **Location**.

Here are our steps:



-  Redefine api/scheduler_icons_select_config.md as in:
  
   
  
   
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];

~~~
 _Note, any button must start from "icon_"_. 


-  Set the label for the new button:
  
   
  
   
~~~js
scheduler.locale.labels.icon_location = "Location";

~~~



-  Set the css class for the button:
  
   
  
   
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~



-  Specify the handler for processing clicks on the button:
  
   
  
   
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};

~~~
 where **scheduler._click.buttons** contains the collection of onClick handlers for the buttons of the bar. 'location' is the name of the button set in the api/scheduler_icons_edit_config.md after the 'icon_' part.

##The edit bar
Generally, the edit bar contains 2 buttons ('Save' and 'Cancel') that are specified by the api/scheduler_icons_edit_config.md configuration option.


~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];

~~~


###Usage example
Let's consider the edit bar shown on the picture below:
  
   
  
  
![customizing_edit_bar.png](customizing_edit_bar.png)


To the **Save** and **Cancel** buttons we have added a new one - **Info**.

Here are our steps:



-  Redefine api/scheduler_icons_edit_config.md as in:
  
   
  
   
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];

~~~



-  Set the label for the new button:
  
   
  
   
~~~js
scheduler.locale.labels.icon_custom = "Info";

~~~



-  Set the css class for the button:
  
   
  
   
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~



-  Specify the handler for processing clicks on the button:
  
   
  
   
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};

~~~
 where **scheduler._click.buttons** contains the collection of onClick handlers for the buttons of the bar. 'custom' is the name of the button set in the api/scheduler_icons_edit_config.md after the 'icon_' part.
 

Dynamic changing of bars' elements
------------------------------------------
The buttons of the edit and select bars can be changed dynamically depending on some condition. 

For example, your events have a custom boolean property - **important** - that indicates whether the event is important and can't be deleted by a user.
Depending on the value of this property you'd like to hide/show the 'delete' button in the select bar. To provide such behaviour, use the following technique:

~~~js
scheduler.attachEvent("onClick", function(id){
    var event = scheduler.getEvent(id),
    if (event.important)
    	scheduler.config.icons_select = ["icon_details"];
    else
    	scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~

