---
sidebar_label: event_text
title: "event_text шаблон"
description: "устанавливает текст события"
---

# event_text

### Description

@short: Указывает текст события

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала запланированного события
- `end` - (required) *Date* - дата завершения запланированного события
- `event` - (required) *object* - объект события

### Returns
- `text` - (string) - HTML-текст для отображения в Scheduler

### Example

~~~jsx
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Стилизация событий с помощью шаблонов](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Обратите внимание, что для представлений Month и Timeline необходимо использовать шаблон [`event_bar_text`](api/template/event_bar_text.md) для указания текста события.

### Related Guides
- [Шаблоны для дневного вида](views/day-view-templates.md)
