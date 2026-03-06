---
sidebar_label: "event_bar_text"
title: "event_bar_text template"
description: "задаёт текст, отображаемый на событиях, охватывающих несколько дней."
---

# event_bar_text

### Description

@short: Задаёт текст, отображаемый на событиях, охватывающих несколько дней.

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события  
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - HTML-содержимое для отображения внутри scheduler

### Example

~~~jsx
scheduler.templates.event_bar_text = function(start,end,event){
      return event.text;
};
~~~

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
