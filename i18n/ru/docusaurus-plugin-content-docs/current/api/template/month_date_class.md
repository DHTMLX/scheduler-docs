---
sidebar_label: "month_date_class"
title: "month_date_class template"
description: "определяет CSS класс, назначаемый ячейке дня"
---

# month_date_class

### Description

@short: Определяет CSS класс, назначаемый ячейке дня

@signature: month_date_class: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` css_class` - (string) - CSS класс для соответствующего элемента

### Example

~~~jsx
scheduler.templates.month_date_class = function(date){
    return "";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
