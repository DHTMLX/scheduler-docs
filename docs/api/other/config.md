---
sidebar_label: config
title: "config config"
description: "defines configuration options for dates, scale, controls"
---

# config

### Description

@short: Defines configuration options for dates, scale, controls

@signature: config: SchedulerConfigOptions

### Example

~~~jsx
//sets the format of Y-Axis items
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "month");
~~~

### Details

The properties of the **config** object are described in a separate chapter of the root API page [Scheduler API: Properties](api/overview/properties_overview.md).
