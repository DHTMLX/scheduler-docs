---
sidebar_label: "event_attribute"
title: "event_attribute config"
description: "definiert den Attributnamen, der verwendet wird, um das HTML-Element des Events über seine id zu identifizieren"
---

# event_attribute

### Description

@short: Definiert den Attributnamen, der verwendet wird, um das HTML-Element des Events über seine id zu identifizieren

@signature: event_attribute: string

### Example

~~~jsx
scheduler.config.event_attribute = "data-event-id"
~~~

**Default value:** "data-event-id"

### Change log
- hinzugefügt in v6.0
