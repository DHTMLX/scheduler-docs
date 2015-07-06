matrix
=============
@short:stores the configuration objects of all timelines specified on the page
	

@relatedsample:
	06_timeline/12_section_tooltip.html
@type:object

@example:
scheduler.createTimelineView({
	name:	"myTimeline",
	x_unit:	"minute",
	x_date:	"%H:%i",
	x_step:	30,
	x_size: 24,
	x_start: 16,
	x_length:	48,
	y_unit:	sections,
	y_property:	"section_id",
	render:"bar"
});

var configObj = scheduler.matrix;

@template:	api_config
@descr:

The **configObj** variable will have the following value:

~~~js
{
	myTimeline:{
    	name:	"myTimeline",
		x_unit:	"minute",
		...
	}
}
~~~

{{note
The property can be used to dynamically change the configuration of a timeline. <br>
But if you need to change the configuration greatly, it will be better to specify several configuration objects and rewrite the current timeline, instead of using the **matrix** property.
}}

For example, you want to dynamically change the x_step,x_sise,x_start parameters of the timeline shown in the sample above:

~~~
//you can use this variant 
configObj.x_step = 50;
configObj.x_size = 28;
configObj.x_start = 20;
scheduler.updateView();

//but it will be better to use this variant:

scheduler.createTimelineView({
	name:	"myTimeline",
	x_unit:	"minute",
	x_date:	"%H:%i",
	x_step:	50,
	x_size: 28,
	x_start: 20,
	x_length:	48,
	y_unit:	sections,
	y_property:	"section_id",
	render:"bar"
});
~~~
*when you create a timeline with the name of some already existing one, the scheduler won't create a new timeline but rewrite the existing one.*
