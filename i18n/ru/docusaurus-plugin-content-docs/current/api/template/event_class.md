---
sidebar_label: event_class
title: "Шаблон event_class"
description: "указывается CSS-класс, который будет применяться к контейнеру события"
---

# event_class

### Description

@short: Указывает CSS-класс, который будет применяться к контейнеру события

@signature: event_class: (start: Date, end: Date, ev: any) => string

### Parameters

- `start` - (required) *Date* - дата начала запланированного события
- `end` - (required) *Date* - дата окончания запланированного события
- `ev` - (required) *object* - объект события

### Returns
- `css_class` - (string) - CSS-класс связанного элемента

### Example

~~~jsx
scheduler.templates.event_class = (start, end, ev) => {
    return "";
};
~~~

**Доступные представления:** [Просмотр дня](views/day.md), [Просмотр месяца](views/month.md), [Просмотр недели](views/week.md), [Просмотр года](views/year.md), [Просмотр по единицам](views/units.md), [Вид таймлайна](views/timeline.md)

### Related samples
- [Окрашивание событий](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Стилизация событий с помощью шаблонов](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

В представлении Timeline шаблон применяется только к режимам 'Bar' и 'Tree'.

См. полную информацию об настройке цветов событий в соответствующей статье [Настройка цвета пользовательских событий](guides/custom-events-color.md).

### Related Guides
- [Настройка цвета пользовательских событий](guides/custom-events-color.md)
- [Шаблоны вида дня](views/day-view-templates.md)
- [Шаблоны вида месяца](views/month-view-templates.md)