day_column_padding
=============

@short:
	adds padding to a view column

@type: number
@example:
scheduler.config.day_column_padding = 20;

@default: 8



@template:	api_config
@descr:

Events can extend to the full width of the view columns. The `day_column_padding` setting limits the maximum width that events can occupy within cells. This ensures that there is always some empty space at the sides of the column, allowing users to create new events by double-clicking on these empty areas.

**Disabled padding**
~~~
scheduler.config.day_column_padding = 0;
~~~

<img style="border: 1px solid #E4E4E4" src="day_column_padding_none.png" alt="Scheduler - no padding in day columns">


**Enabled padding**
~~~
scheduler.config.day_column_padding = 8;
~~~
<img style="border: 1px solid #E4E4E4" src="day_column_padding_set.png" alt="Scheduler - padding inside day columns">


@changelog: added in v7.0