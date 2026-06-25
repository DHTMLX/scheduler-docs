---
sidebar_label: "TIMELINE_scalex_class"
title: "TIMELINE_scalex_class template"
description: "определяет имя CSS-класса, который будет назначен элементам на оси X"
---

# TIMELINE_scalex_class
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет имя CSS-класса, который будет назначен элементам на оси X

@signature: TIMELINE_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` css_class` - (string) - CSS-класс для соответствующего элемента

### Example

~~~jsx
scheduler.templates.timeline_scalex_class = function(date){
    return "";
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот шаблон требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
