---
sidebar_label: "event_attribute"
title: "event_attribute config"
description: "определяет имя атрибута, используемого для идентификации HTML-элемента события по его id"
---

# event_attribute

### Description

@short: Определяет имя атрибута, используемого для идентификации HTML-элемента события по его id

@signature: event_attribute: string

### Example

~~~jsx
scheduler.config.event_attribute = "data-event-id"
~~~

**Default value:** "data-event-id"

### Change log
- добавлено в версии v6.0
