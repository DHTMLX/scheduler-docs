---
sidebar_label: "UNITS_scale_text"
title: "UNITS_scale_text template"
description: "определяет элементы, отображаемые на оси X"
---

# UNITS_scale_text
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет элементы, отображаемые на оси X

@signature: UNITS_scale_text: (key: string, label: string, unit: object, date: Date) =\> string;

### Parameters

- `key` - (required) *string* - идентификатор единицы
- `label` - (required) *string* - метка для единицы
- `unit` - (required) *object* - объект, представляющий единицу, включая 'key' и 'label'
- `date` - (required) *Date* - дата, соответствующая колонке (полезно для просмотра с несколькими днями)

### Returns
- ` text` - (string) - HTML-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.unit_scale_text = function(key, label, unit, date) {
    if (option.css) {
        return "<span class='" + option.css + "'>" + label + "</span>";
    } else {
        return label;
    }
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 Этот template требует включения плагина [units](guides/extensions-list.md#units). 
:::

### Related Guides
- [Шаблоны Units View](views/units-view-templates.md)
