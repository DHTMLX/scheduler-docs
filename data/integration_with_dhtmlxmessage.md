Popup Messages and Modal Boxes
======================

Messages are used in the Scheduler to notify a user about an error, confirm or deny an action, choose one of the options and so on.
Scheduler messages use [the fork of the dhtmlxMessage repository](https://github.com/DHTMLX/message) as their basis. 
So, all the functionality of dhtmlxMessage is actual for dhtmlxScheduler messages.

There are two main types of messages: a [simple popup message box](#basicpopupmessage) and a [modal message box](#modalmessageboxes) with buttons 
that blocks the work of an application.

A modal message box can belong to one of three possible types:

- [Alert message box](#alert)
- [Confirm message box](#confirm)
- [Modalbox](#modal)


## Basic Popup Message 

To create a basic modal message box, use the [scheduler.message](api/scheduler_message.md) method. The obligatory parameter of the method is the text of the message:

~~~js
scheduler.message("The event is updated");
~~~

There are three types of message boxes:
	
- a default message box (**type:"info"**)

<img src="default_message.png"/>
	
- an error message box (**type:"error"**)

<img src="error_message.png"/>

- a warning message box (**type:"warning"**)

<img src="warning_message.png">

To create a necessary message box, you need to define the *type* property with the corresponding value: 

~~~js
// creating an error message box
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~

{{sample 09_api\11_popups_and_messages.html}}

To apply different styles to a message box you need to specify a CSS class through the type parameter as described [here](#styling).

### Positioning message boxes

By default, a popup message box appears in the right top corner of the window. It doesn't prevent the work of the parent application, unlike [modal message boxes](#modalmessageboxes)
that overlay the parent application and block its work. You can change the position of a message box by using the **scheduler.message.position** property:

~~~js
scheduler.message.position = 'bottom';
~~~

There are four possible values for the message position:

- **top** - displays a message box in the right top corner of the window, set by default

- **bottom** - displays a message box in the right bottom corner of the window

- **left** -  displays a message box on the left side of the window under Scheduler

- **right** - displays a message box on the right side of the window under Scheduler

### Expire Interval

It's possible to customize the expire interval for a message box with the help of the *expire* parameter. It is the time period after the end of which the message box disappears (in milliseconds).
By default, the expire interval is equal to 4000 milliseconds. 

You can either change this value or to cancel the expire period at all, by setting the expire parameter to "-1". In this case a message box will disappear only on a mouse click.

~~~js
scheduler.message({
	type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Hiding a Message Box with API

To hide the specified message box manually and not to wait while it hides automatically, you can use the **scheduler.message.hide(boxId)** method. It takes one parameter:

- **boxId** - the box id specified in the box's constructor

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## Modal Message Boxes

Modal message boxes prevent the work of the parent app, until a necessary action is performed (usually, button clicking). They close on a button click and a callback function, if any is executed.

There exist three types of modal message boxes:

- [Alert Message Box](#alert) - an alert box with a button;
- [Confirm Message Box](#confirm) - a confirmation box with two buttons (to confirm or to cancel); 
- [Modalbox](#modal) - a modal message box with an unlimited number of buttons. 

Common properties of the boxes are:

- **id** - the message box's id;
- **title** - the text of the header;
- **type** - the type of the message box (a warning or an error);
- **text** - the text of the message box's body; 
- **ok** - the text of the "OK" button;
- **cancel** - the text of the "Cancel" button (for the confirm box);
- **callback** - the function called on button click. Takes *true* or *false* as the parameter (subject to the clicked button);
- **position** - for now supports only one value - "top", any other value will result in center-align;
- **width**	- the width of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%");
- **height** - the height of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%").

## Alert Message Box {#alert}

<img src="alert.png"/>

An alert message box contains the "OK" button. To set the text of the "OK" button, use the *ok* parameter with the text as a value:

- a short form (contains just the text of a message - implicit usage of the parameter 'text'. The other parameters take default values):

~~~js
scheduler.alert("Text");
~~~

- a full form (contains several available parameters. Non-specified parameters take default values)

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
	callback: function(){...}
});
~~~


## Confirm Message Box {#confirm}

<img src="confirm.png"/>

A confirm message box has two buttons: the "OK" button and the "Cancel" one. The text of the buttons is defined in the properties with the corresponding names. 


- a short form

~~~js
scheduler.confirm("ConfirmText");
~~~

- a full form

~~~js
scheduler.confirm({
	title:"Confirm",
	text:"This is a simple confirm",
	ok:"Ok",
	cancel:"Cancel",
	callback: function(result){
		if(result){
			scheduler.message("You clicked Ok");
		}else{
			scheduler.message("You clicked Cancel");
		}
	}
});
~~~


## Modal Box {#modal}

<img src="modalbox.png"/>

A modalbox possesses some peculiar features: 

- its *text* can include any *HTML* content;
- it may have many buttons specified in the *buttons* array that contains the text values of the buttons;
- the *callback* function takes the *index* of the chosen button as a parameter.

~~~js
scheduler.modalbox({
	title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});
~~~


### Configuring modalbox buttons

There are two main ways to define the configuration of modalbox buttons:

- a short form:

~~~js
scheduler.modalbox({
	// other settings
	buttons:["Save", "Delete", "Cancel"],
	callback: function(result){
   		switch(result){
			case "0":
				//Save
				break;
			case "1":
				//Delete
				break;
			case "2":
				//Cancel
				break;
		}	
	}
});
~~~

The result of the callback function will be equal to the stringified index of a pressed button from the array ("0", "1", "2",...).
Each button will receive a CSS class from its label converted to the lower case, e.g. *scheduler_**save**_button*, *scheduler_**delete**_button*, *scheduler_**cancel**_button*. 

These classes can be used to style buttons:

~~~js
.scheduler_delete_button div{
	background:red;
}
~~~

In case the same button name is used by several popups that should be styled differently, the **type** config can be used:

~~~js
scheduler.modalbox({
	// other settings
	type:"special_popup",
	buttons:["Save", "Delete", "Cancel"]
});
~~~

The **type** will be prefixed with the "scheduler_" string and added as a class name to the popup element:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
  	background:red;
}
~~~

- a full form:

The CSS classes of buttons and callback values can be defined explicitly using a longer form of configuration:

~~~js
scheduler.modalbox({
	// other settings
    buttons: [
		{ label:"Save",   css:"link_save_btn",   value:"save" },
		{ label:"Cancel", css:"link_cancel_btn", value:"cancel" },
		{ label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
		switch(result){
    		case "save":
    			//Save
    			break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
		}
    }
});
~~~

The **label** parameter is mandatory, while **css** and **value** options can be omitted. Missing parameters will be calculated as in the short form of buttons configuration: CSS will be inherited from a lower-cased button label and the button index will be used as a value.


The **css** will be prefixed with the "scheduler_" string and added to the button element as a class name:

~~~js
.scheduler_link_delete_btn div{
  	background:red;
}
~~~

## Hiding Modal Message Boxes

To hide a modal message box manually, you can use the **scheduler.modalbox.hide()** method. As a parameter it takes the div container of the modalbox:

~~~js
var box = scheduler.modalbox({	
	title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

For the **alert** and **confirm** modal boxes, you also need to use the **scheduler.modalbox.hide()** method:

~~~js
var box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        scheduler.message("Result: "+result);
    }
});

scheduler.modalbox.hide(box);
~~~


## Styling

For any type of the message box you can define a custom style to achieve the desired look.
Generally, the appropriate CSS class is specified through the *type* parameter: you define a CSS class and set the parameter to its name.

There are some rules related to setting the 'type' parameter you should keep in mind:

- To set a CSS class for the alert and confirm boxes, you must initialize such a box using the 'window-related' way.
- To set a CSS class for the message boxes, you must initialize such a box using the 'common' way.
- The name of a CSS class should go with the 'scheduler-' prefix.
- To apply the style correctly, it's necessary to use the name of the class as **.scheduler-some div** to specify that it is intended for the element inside a scheduler message. 

~~~js
<style type="text/css">
.scheduler-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


scheduler.message({ type:"myCss", text:"some text" });
~~~

## Modal Windows and Keyboard Interaction

The keyboard functionality for modal boxes is controlled by the **scheduler.message.keyboard** property. Initially, it's set to *true*. 

By default, modal boxes block keyboard events of the page. The only keys that can be used are: 

- "space" and "enter" - sets the *true* value as a modal box result;
- "escape" - sets the *false* value as a modal box result.

By setting the **keyboard** property to *false*, you'll enable keyboard events (and disable the above mentioned keys):

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

It allows using the full keyboard, e.g. for typing values into inputs inside modal boxes. 