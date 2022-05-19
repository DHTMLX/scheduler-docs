all_timed
=============
@short:'says' to show multi-day events in  the regular way (as one-day events are displayed)
	

@type: boolean, string

@default:'short'
@views: day, week, units
@example:


@template:	api_config
@descr:
{{note The property requires the [all_timed](extensions_list.md#alltimed) plugin to be activated.}}

As a string the parameter can take the only value - *'short'*.

<br>

So, there are 3 possible values that the parameter can take:

- **'short'**  - to show only multi-day events that last less than 24 hours ( starts one day and ends another) in the regular way.
- **true** - to show all multi-day events in the regular way.
- **false** - to show all multi-day events as lines in the upper part of the scheduler (the standard display mode for multi-day events). 

@relatedsample:
	03_extensions/26_multi_day_visible.html

@apigroup: Events/Multi-day events
