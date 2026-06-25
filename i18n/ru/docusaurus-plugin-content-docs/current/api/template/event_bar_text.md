---
sidebar_label: event_bar_text
title: "event_bar_text шаблон"
description: "задает текст события. Применяется только к многодневным событиям"
---

# event_bar_text

### Description

@short: Указывает текст события. Применяется только к многодневным событиям

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (обязательный) *Date* - дата начала запланированного события
- `end` - (обязательный) *Date* - дата завершения запланированного события
- `event` - (обязательный) *object* - объект события

### Returns
- `text` - (string) - HTML-текст для отображения в Scheduler

### Example

~~~jsx
scheduler.templates.event_bar_text = (start, end, event) => {
    return event.text;
};
~~~

**Доступные представления:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Related Guides
- [Шаблоны отображения месяца](views/month-view-templates.md)
- [Шаблоны отображения Таймлайна](views/timeline-view-templates.md)