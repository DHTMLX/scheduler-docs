---
sidebar_label: "calendar_scale_date"
title: "calendar_scale_date template"
description: "задаёт формат для меток дней недели в заголовке Мини-Календаря (date picker)"
---

# calendar_scale_date

### Description

@short: Задаёт формат для меток дней недели в заголовке Мини-Календаря (date picker)

@signature: calendar_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - конкретная дата, представляющая день недели для ячейки заголовка

### Returns
- ` text` - (string) - внутреннее HTML-содержимое для ячейки заголовка

### Example

~~~jsx
const weekDayLabel = scheduler.date.date_to_str("%D");
scheduler.templates.calendar_scale_date = function (date) {
    // M | T | W | T | F | S | S
    return weekDayLabel(date).substr(0, 1);
};
~~~

### Details

:::note
 Этот шаблон работает только при включённом плагине [minical](guides/extensions-list.md#minicalendardatepicker). 
:::

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)

### Related Guides
- [Шаблоны мини-календаря](guides/mini-calendar-templates.md)
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
