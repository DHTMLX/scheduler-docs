---
sidebar_label: day_column_padding
title: "day_column_padding config"
description: "adds padding to a view column"
---

# day_column_padding

### Description

@short: Adds padding to a view column

@signature: day_column_padding: number

### Example

~~~jsx
scheduler.config.day_column_padding = 20;
~~~

**Default value:** 8

### Details

Events can extend to the full width of the view columns. The `day_column_padding` setting limits the maximum width that events can occupy within cells. This ensures that there is always some empty space at the sides of the column, allowing users to create new events by double-clicking on these empty areas.

**Disabled padding**
~~~
scheduler.config.day_column_padding = 0;
~~~

![Scheduler - no padding in day columns](/img/day_column_padding_none.png)


**Enabled padding**
~~~
scheduler.config.day_column_padding = 8;
~~~
![Scheduler - padding inside day columns](/img/day_column_padding_set.png)

### Change log
- added in v7.0
