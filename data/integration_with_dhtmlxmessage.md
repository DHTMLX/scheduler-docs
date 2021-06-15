

 Integration with dhtmlxMessage 
==============

Since the version 3.5 dhtmlxScheduler includes dhtmlxMessage, a lightweight JavaScript message library. 



~~~js
scheduler.attachEvent("onEventCopied", function(ev) {
	dhtmlx.message("You've copied an event: <br/><b>"+ev.text+"</b>");
});

~~~


To add some message you don't need to make any special actions, just follow the common dhtmlxMessage techniques.


Visit these pages to get the detailed information: 


- The library main page - <a href="http://dhtmlx.github.com/message">http://dhtmlx.github.com/message</a>
- The documentation - <a href="https://docs.dhtmlx.com/message__index.html">https://docs.dhtmlx.com/message__index.html</a>