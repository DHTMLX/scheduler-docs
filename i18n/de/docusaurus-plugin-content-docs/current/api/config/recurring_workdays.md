---
sidebar_label: "recurring_workdays"
title: "recurring_workdays config"
description: "definiert, welche Tage als Arbeitstage für wiederkehrende Ereignisse gelten, wenn in der Lightbox die Option 'Every workday' gewählt wird."
---

# recurring_workdays

### Description

@short: Definiert, welche Tage als Arbeitstage für wiederkehrende Ereignisse gelten, wenn in der Lightbox die Option "Every workday" gewählt wird.

@signature: recurring_workdays: any[]

### Example

~~~jsx
//setzt Arbeitstage von Dienstag bis Freitag
scheduler.config.recurring_workdays = [2, 3, 4, 5];
~~~

**Default value:** [1, 2, 3, 4, 5]

### Details

:::note
 Diese Einstellung erfordert, dass die [recurring](guides/extensions-list.md#recurring) Extension aktiviert ist. 
:::

![recurringworkdays_config](/img/recurringworkdays_config.png)
