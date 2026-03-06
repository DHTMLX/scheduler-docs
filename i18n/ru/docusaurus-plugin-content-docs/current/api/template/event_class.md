---
sidebar_label: "event_class"
title: "event_class template"
description: "определяет CSS класс, который будет добавлен к контейнеру события"
---

# event_class

### Description

@short: Определяет CSS класс, который будет добавлен к контейнеру события

@signature: event_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `ev` - (required) *object* - объект события

### Returns
- ` css_class` - (string) - CSS класс для соответствующего элемента

### Example

~~~jsx
scheduler.templates.event_class = function(start,end,ev){
    return "";
};
~~~

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Для Timeline view этот шаблон используется только в режимах 'Bar' и 'Tree'.

Для подробных инструкций по настройке цветов событий смотрите связанный материал [Пользовательский цвет события](guides/custom-events-color.md).

### Related Guides
- [Пользовательский цвет события](guides/custom-events-color.md)
- [Шаблоны для дневного вида](views/day-view-templates.md)
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
