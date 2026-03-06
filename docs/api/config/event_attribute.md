---
sidebar_label: event_attribute
title: "event_attribute config"
description: "sets the name of the attribute that will specify the id of the event's HTML element"
---

# event_attribute

### Description

@short: Sets the name of the attribute that will specify the id of the event's HTML element

@signature: event_attribute: string

### Example

~~~jsx
scheduler.config.event_attribute = "data-event-id"
~~~

**Default value:** "data-event-id"

### Change log
- added in v6.0
