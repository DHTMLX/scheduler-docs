---
sidebar_label: "hour_size_px"
title: "hour_size_px config"
description: "定义小时块的高度，单位为像素"
---

# hour_size_px

### Description

@short: 定义小时块的高度，单位为像素

@signature: hour_size_px: number

### Example

~~~jsx
scheduler.config.hour_size_px = 40;
...
scheduler.init('scheduler_here', new Date(2010, 7, 5), "week");
~~~

**Default value:** 42

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)
- [Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

### Details

![weekView_properties](/img/weekView_properties.png)

### Related API
- [hour_date](api/config/hour_date.md)
