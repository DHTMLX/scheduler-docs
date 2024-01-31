overwrite_marked_timespans
=============


@short: enables blocking priority for marked timespans
	

@type: boolean
@default: true

@example:

scheduler.config.overwrite_marked_timespans = false;


@template:	api_config
@descr:

Marked timespans have different priority, depending on their settings.
When several marked timespans of different priority are located inside the same section of the scheduler,
only markers of the highest priority will be displayed by default.

Disable this setting in order to change this behavior and display all the defined markers:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~


@related:


limits.md#blockingpriority

@changelog: added in v6.0

