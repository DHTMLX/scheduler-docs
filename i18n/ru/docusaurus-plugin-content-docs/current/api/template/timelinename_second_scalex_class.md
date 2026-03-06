---
sidebar_label: "TIMELINE_second_scalex_class"
title: "TIMELINE_second_scalex_class template"
description: "Устанавливает имя CSS-класса, который будет добавлен к элементам на второй оси X."
---

# TIMELINE_second_scalex_class
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Устанавливает имя CSS-класса, который будет добавлен к элементам на второй оси X.

@signature: TIMELINE_second_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` css_class` - (string) - CSS-класс для соответствующего элемента

### Example

~~~jsx
scheduler.templates.timeline_second_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Для работы шаблона необходимо включить плагин [timeline](guides/extensions-list.md#timeline). 
:::

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
