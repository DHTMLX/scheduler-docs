---
sidebar_label: event_attribute
title: "event_attribute конфигурация"
description: "задает имя атрибута, которое будет задавать идентификатор элемента HTML события"
---

# event_attribute

### Description

@short: Устанавливает имя атрибута, которое будет задавать идентификатор элемента HTML события

@signature: event_attribute: string

### Example

~~~jsx
scheduler.config.event_attribute = "data-event-id"
~~~

**Значение по умолчанию:** "data-event-id"

### Change log
- добавлено в v6.0