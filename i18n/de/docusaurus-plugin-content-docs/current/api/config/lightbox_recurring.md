---
sidebar_label: "lightbox_recurring"
title: "lightbox_recurring config"
description: "steuert das Verhalten der Lightbox beim Bearbeiten eines wiederkehrenden Ereignisses"
---

# lightbox_recurring

### Description

@short: Steuert das Verhalten der Lightbox beim Bearbeiten eines wiederkehrenden Ereignisses

@signature: lightbox_recurring: string

### Example

~~~jsx
scheduler.config.lightbox_recurring = 'series';
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 'ask'

### Details

:::note
 Diese Eigenschaft erfordert die Aktivierung der [recurring](guides/extensions-list.md#recurring) Erweiterung. 
:::

Diese Option ist seit Version 3.5 verfügbar.
