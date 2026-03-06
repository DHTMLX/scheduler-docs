---
sidebar_label: "week_date_class"
title: "week_date_class template"
description: "определяет CSS класс, назначаемый ячейке дня"
---

# week_date_class

### Description

@short: Определяет CSS класс, назначаемый ячейке дня

@signature: week_date_class: (start: Date, today: Date) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата колонки
- `today` - (required) *Date* - текущая дата

### Returns
- ` css_class` - (string) - css класс для соответствующего элемента

### Example

~~~jsx
scheduler.templates.week_date_class = function(start, today){
    return "";
};
~~~

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Шаблоны недельного вида](views/week-view-templates.md)
