batchUpdate
=============

@short:updates multiple events at once

@params:
- callback  function    the callback function
* noRedraw  boolean     optional, specifies if Scheduler should repaint the chart after the callback function; <i>true</i> - not to repaint and <i>false</i> (by default) - to repaint

@example:
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(var i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});


@template:	api_method

@descr:
You can use this method to update multiple events at once with a single re-rendering  instead of making multiple updates with multiple re-renderings.


@relatedapi:
- api/scheduler_onbeforebatchupdate_event.md
- api/scheduler_onafterbatchupdate_event.md