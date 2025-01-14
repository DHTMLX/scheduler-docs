Multiple Users
=============================


While there is no such a concept as different calendars, you can use multiple data feeds in the same scheduler to imitate such a behavior. 

~~~js
// load two data feeds
scheduler.load("events_shared.php?user=1");
scheduler.load("events_shared.php?user=2");
scheduler.config.readonly = true;
~~~


and on the server side: 

~~~php
$scheduler->render_sql("select * from events_shared where event_type=1 AND 
userId = ".$user_id,"event_id","start_date,end_date,text,event_type,userId");
~~~


With such an approach it's possible to load and show data from multiple sources. **userId** in the code above is used just for the sample purpose - it may be any different set of rules in your case. 

The same code can be used in a more complex scenario: users see all the events, but can edit only their own ones:

~~~js
//enable saving for the first data feed
var dp =  scheduler.createDataProcessor("events.php?user");
dp.init(scheduler);
		
//allow editing operations only for own events
function allow_own(id){
	var ev = this.getEvent(id);
	return ev.userId == 1;
}
scheduler.attachEvent("onClick",allow_own);
scheduler.attachEvent("onDblClick",allow_own);

//default properties of a new event
scheduler.attachEvent("onEventCreated",function(id){
	const ev = this.getEvent(id);
    // userId will be sent to the backend by DataProcessor,
    // make sure to verify 
	ev.userId = CURRENT_USER_ID; 
});
~~~
