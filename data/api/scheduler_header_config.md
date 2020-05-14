header
=============

@short: provides a layout-like configuration for the scheduler header (navigation panel)


@type: array|object
@default: null
@example:
scheduler.config.header = [
	"day",
	"week",
	"month",
	"date",
	"prev",
	"today",
	"next"
];
scheduler.init("scheduler_here");

@template:	api_config

@descr:

When scheduler is initialized using this config, any HTML placed in the scheduler container prior to initialization will be removed and a generated markup will be put instead.

The value of this config can either be a plain array of elements, or a nested structure which describes a complex layout.

Note, that the height of the header/navigation bar is still controlled by the [scheduler.xy.nav_height](api/scheduler_xy_other.md#day) option.

{{snippet JS}}
~~~js
scheduler.xy.nav_height = 80;
scheduler.config.header = {
	rows: [
		{
			cols: [
				"prev",
				"date",
				"next",
			]
		},
		{
			cols: [
				"day",
				"week",
				"month",
				"spacer",
				"today"
			]
		}
	]
};
scheduler.init("scheduler_here");
~~~

{{snippet HTML}}
~~~html
<div id="scheduler_here" style="height:100vh;width:100vw"></div>
~~~


The supported values are:

 - **{rows: Array, css:string}** - a container for a multi-row header
 - **{cols: Array, css:string}** - a single row of a multi-row header
 - **"prev","next","today"** - date navigation buttons
 - **"date"** - the date label
 - **"day", "week", "month", etc.** - view tabs
 - **"spacer"** - a transparent element which takes the whole free space, can be used to push another element to the right side of the header
 - **{html: string, click: function, css: string}** - an object for injecting custom buttons or icons into the header
 - **"minicalendar"** - a [Mini Calendar](minicalendar.md) toggle.

~~~js
scheduler.config.header = [
	"day",
	"week",
	"month",
	{html:"click me!", click:function(){alert("done!")}},
	"date",
	"prev",
	"today",
	"next"
];
scheduler.init("scheduler_here");
~~~

#### Mini Calendar settings:

The "minicalendar" value will display a minicalendar button with the following click handler:

~~~
function showCalendar () {
	if (scheduler.isCalendarVisible()) {
		scheduler.destroyCalendar();
	} else {
		scheduler.renderCalendar({
			position: this,
			date: scheduler.getState().date,
			navigation: true,
			handler: function (date, calendar) {
				scheduler.setCurrentView(date);
				scheduler.destroyCalendar();
			}
		});
	}
};
~~~

If you want to call api/scheduler_rendercalendar.md with different parameters, you need to provide your own onclick handler for the minicalendar button:

~~~
scheduler.config.header = [
	"day",
	"week",
	"month",
	{view: "minicalendar", click: function () {
		if (scheduler.isCalendarVisible()) {
			scheduler.destroyCalendar();
		} else {
			scheduler.renderCalendar({
				position: this,
				date: scheduler.getState().date,
				navigation: true,
				handler: function (date, calendar) {
					scheduler.setCurrentView(date);
					scheduler.destroyCalendar();
				}
			});
		}
	}},
	"date",
	"prev",
	"today",
	"next"
];
~~~

@related:
touch_support.md
initialization.md#initializingschedulervialayoutconfigurationproperty
minicalendar.md