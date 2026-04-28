---
sidebar_label: "UNITS_date"
title: "UNITS_date template"
description: "устанавливает дату, отображаемую в заголовке вида"
---

# UNITS_date
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Устанавливает дату, отображаемую в заголовке вида

@signature: UNITS_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html-текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.unit_date = function(date){
    return scheduler.templates.day_date(date);
};
~~~

**Доступные представления:** [Units view](views/units.md)

### Details

:::note
 Для использования шаблона необходимо активировать плагин [units](guides/extensions-list.md#units). 
:::

### Related Guides
- [Шаблоны Units View](views/units-view-templates.md)
