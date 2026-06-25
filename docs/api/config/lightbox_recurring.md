---
sidebar_label: lightbox_recurring
title: "lightbox_recurring config"
description: "defines the lightbox's behavior, when the user opens the lightbox to edit a recurring event"
---

# lightbox_recurring

### Description

@short: Defines the lightbox's behavior, when the user opens the lightbox to edit a recurring event

@signature: lightbox_recurring: string
### Parameters

- `ask | instance | series` - (required) *string* <br> <b>ask:</b> before the lightbox is opened, a message box alerts and asks the user whether he will edit a certain instance or the entire recurring event. <br> <b>instance:</b> the lightbox is opened straight for editing a certain instance of the event. <br> <b>series:</b> the lightbox is opened straight for editing the entire recurring event.


### Example

~~~jsx
scheduler.config.lightbox_recurring = 'series';
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 'ask'

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

The parameter is available from version 3.5.
