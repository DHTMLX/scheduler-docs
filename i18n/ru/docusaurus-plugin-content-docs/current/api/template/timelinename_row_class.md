---
sidebar_label: "TIMELINE_row_class"
title: "TIMELINE_row_class template"
description: "определяет CSS класс, который будет присвоен строке в представлении Timeline"
---

# TIMELINE_row_class
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет CSS класс, который будет присвоен строке в представлении Timeline

@signature: TIMELINE_row_class: (section: object, timeline: object) =\> string;

### Parameters

- `section` - (required) *object* - объект секции
- `timeline` - (required) *object* - объект таймлайна

### Returns
- ` css_class` - (string) - CSS класс для соответствующего элемента

### Example

~~~jsx
scheduler.templates.timeline_row_class = function(section, timeline){
    return "";
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот шаблон требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

Стандартная реализация шаблона выглядит следующим образом:

~~~js
scheduler.templates.TIMELINE_row_class = function(section, timeline){
    if(timeline.folder_events_available && section.children){
        return "folder";
    }
    return "";
};
~~~

### Related API
- [`TIMELINE_cell_class`](api/template/timelinename_cell_class.md)
- [`TIMELINE_cell_value`](api/template/timelinename_cell_value.md)

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)

### Change log
- добавлено в версии v5.3.9
