time_step
=============
@short:sets the minimum step (in minutes) for event's time values
	

@type: number
@default:5
@views:day, week, month, units
@example:
scheduler.config.time_step = 15;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr: 

- Start and end times of an event will have the values multiple of the time step, i.e. if *time_step = 20*, the event can start only at: 0, 20, 40 minutes etc. 
- This option is not applicable to the Timeline view, since the duration of an event in this view is defined by the **x_step** property. Check the api/scheduler_createtimelineview.md article for details.
- The lightbox time selector will have the same time step (it's true for the Timeline view as well).

@relatedsample:
	02_customization/01_events_coloring.html
    03_extensions/24_week_agenda.html
    
@apigroup: Time, time zones