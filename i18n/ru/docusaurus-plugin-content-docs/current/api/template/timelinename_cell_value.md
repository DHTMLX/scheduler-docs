---
sidebar_label: "TIMELINE_cell_value"
title: "TIMELINE_cell_value template"
description: "показывает, сколько событий запланировано в ячейке представления"
---

# TIMELINE_cell_value
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Показывает, сколько событий запланировано в ячейке представления

@signature: TIMELINE_cell_value: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - массив объектов событий, находящихся в ячейке
- `date` - (required) *Date* - дата, соответствующая ячейке
- `section` - (required) *object* - объект секции

### Returns
- ` text` - (string) - html-текст, используемый для рендеринга в scheduler

### Example

~~~jsx
scheduler.templates.timeline_cell_value = function(evs, date, section){
    return evs?evs.length:"";
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Шаблон требует, чтобы плагин [timeline](guides/extensions-list.md#timeline) был включен. 
:::

:::note

По умолчанию этот шаблон вызывается только в режиме 'cell' представления Timeline. Однако, если опция **cell_template** у [Timeline view](api/method/createtimelineview.md) включена, шаблон будет вызываться и в [всех остальных режимах представления](views/timeline.md#customcontentincells).
 
:::

### Related API
- [TIMELINE_row_class](api/template/timelinename_row_class.md)

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
