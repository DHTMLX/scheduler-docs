---
sidebar_label: "calendar_date"
title: "calendar_date template"
description: "определяет, что отображается внутри ячеек дней Мини-Календаря (date picker)"
---

# calendar_date

### Description

@short: Определяет, что отображается внутри ячеек дней Мини-Календаря (date picker)

@signature: calendar_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, представленная в ячейке

### Returns
- ` text` - (string) - внутренний HTML-контент для ячейки даты Мини-Календаря

### Example

~~~jsx
const dayDate = scheduler.date.date_to_str("%d");
scheduler.templates.calendar_date = function (date) {
    // отображаем количество событий за день в tooltip на ячейке календаря
    const dayEnd = scheduler.date.add(date, 1, "day");
    const events = scheduler.getEvents(date, dayEnd);
    return "<div title='"+events.length+" events'>" +dayDate(date)+ "</div>";
};
~~~

### Details

:::note
 Шаблон работает только если включён плагин [minical](guides/extensions-list.md#minicalendardatepicker). 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Шаблоны мини-календаря](guides/mini-calendar-templates.md)
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
