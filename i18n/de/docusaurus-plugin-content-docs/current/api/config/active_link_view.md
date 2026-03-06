---
sidebar_label: "active_link_view"
title: "active_link_view config"
description: "Ermöglicht es, die Tageszahlen in der Monatsansicht als anklickbare Links anzuzeigen, die den entsprechenden Tag in der gewählten Ansicht öffnen."
---

# active_link_view

### Description

@short: Ermöglicht es, die Tageszahlen in der Monatsansicht als anklickbare Links anzuzeigen, die den entsprechenden Tag in der gewählten Ansicht öffnen.

@signature: active_link_view: string

### Example

~~~jsx
scheduler.config.active_link_view = "week"; // gibt die Ansicht an, zu der von der Monatsansicht gesprungen wird
...
scheduler.init('scheduler_here',new Date(2012,7,6),"month");
~~~

**Default value:** day

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
 Diese Einstellung erfordert, dass das [active_links](guides/extensions-list.md#active-links) Plugin aktiviert ist. 
:::

Setzen Sie diese Eigenschaft auf den Namen der Ansicht, zu der die Tageszahlen des Monats verlinken sollen.

### Related Guides
- [Monatsansicht](views/month.md#presenting-days-numbers-as-clickable-links)
