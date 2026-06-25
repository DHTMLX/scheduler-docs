---
sidebar_label: include_end_by
title: "include_end_by config"
description: "defines whether the date specified in the 'End by' field should be exclusive or inclusive"
---

# include_end_by
:::warning 
The property works only in the legacy extension for recurring events.
:::
### Description

@short: Defines whether the date specified in the 'End by' field should be exclusive or inclusive

@signature: include_end_by: boolean

### Example

~~~jsx
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** false

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

By default, the date set in the 'End by' field is exclusive.

For example, if the user specifies value '01.15.2019' in the 'End by' field then:

- if <code>include_end_by = false</code> (default)  - the recurring series will be finished on 01.14.2019. 
- If <code>include_end_by = true</code> - the recurring series will be finished on 01.15.2019.

## How does the database save the dates?

All dates selected in the scheduler have the hour-minute part, meaning that the date *15.11.2021* selected in any date picker will be interpreted as *15.11.2021 00:00*.

This will affect the duration of the series when you select the 'End by' in the recurring form.

For example, if the user specifies the value *15.11.2021* in the 'End by' field, then:

- if <code>include_end_by = false</code> (default) - the end date of the recurring series will be saved as *15.11.2021 00:00* and the latest possible instance of the series may occur until *14.11.2021 23:59*, thus the series won't have events on the selected day;
- if <code>include_end_by = true</code> - the end date of the recurring series will be saved as *16.11.2021 00:00* (the midnight after the selected date), so the selected day would be included in the series duration and the last instance of the series may occur until *15.11.2021 23:59*.

### Related API
- [repeat_date](api/config/repeat_date.md)

### Related Guides
- [Recurring Events](guides/recurring-events.md)
