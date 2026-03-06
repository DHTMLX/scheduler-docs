---
sidebar_label: occurrence_timestamp_in_utc
title: "occurrence_timestamp_in_utc config"
description: "allows working with recurring events independently of time zones"
---

# occurrence_timestamp_in_utc

### Description

@short: Allows working with recurring events independently of time zones

@signature: occurrence_timestamp_in_utc: boolean

### Example

~~~jsx
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

:::note

Watch out! The option is intended for 'newborn' schedulers with no existing recurring events.
Applying to the scheduler with already existing recurring events will break them.
 
:::
- If the option is enabled, timestamps of events are stored as UNIX time.
- The option is available from version 3.5.

### Related Guides
- [Recurring Events](guides/recurring-events.md)
