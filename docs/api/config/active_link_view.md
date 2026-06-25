---
sidebar_label: active_link_view
title: "active_link_view config"
description: "'says' to present the numbers of days in the Month view as clickable links that open the related day in the specified view"
---

# active_link_view

### Description

@short: 'says' to present the numbers of days in the Month view as clickable links that open the related day in the specified view

@signature: active_link_view: string

### Example

~~~jsx
scheduler.config.active_link_view = "week"; //where we'll jump from the Month view
...
scheduler.init('scheduler_here',new Date(2027,7,6),"month");
~~~

**Default value:** day

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
 The property requires the [active_links](guides/extensions-list.md#active-links) plugin to be activated. 
:::

The property should be set to the name of the view you want to open month's days in.

### Related Guides
- [Month View](views/month.md#presenting-days-numbers-as-clickable-links)
