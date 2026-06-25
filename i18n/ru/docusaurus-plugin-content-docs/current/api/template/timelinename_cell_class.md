---
sidebar_label: "TIMELINE_cell_class"
title: "TIMELINE_cell_class template"
description: "задаёт CSS класс, который будет присвоен ячейке в представлении"
---

# TIMELINE_cell_class
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Задаёт CSS класс, который будет присвоен ячейке в представлении

@signature: TIMELINE_cell_class: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - массив объектов событий, содержащихся в ячейке (доступно только в режиме 'cell')
- `date` - (required) *Date* - дата, соответствующая колонке
- `section` - (required) *object* - объект секции

### Returns
- ` css_class` - (string) - CSS класс, который будет применён к элементу

### Example

~~~jsx
scheduler.templates.timeline_cell_class = function(evs, date, section){
    return "";
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот шаблон требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

### Related API
- [TIMELINE_row_class](api/template/timelinename_row_class.md)

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
