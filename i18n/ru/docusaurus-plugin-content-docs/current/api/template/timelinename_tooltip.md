---
sidebar_label: "TIMELINE_tooltip"
title: "TIMELINE_tooltip template"
description: "предоставляет текст тултипа для ячейки дня, которая содержит запланированное событие(я)"
---

# TIMELINE_tooltip
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Предоставляет текст тултипа для ячейки дня, которая содержит запланированное событие(я)

@signature: TIMELINE_tooltip: (start: Date, end; date, event: object) =\> string;

### Parameters

- `start` - (required) *Date* - дата начала события  
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - html-содержимое для отображения в тултипе планировщика

### Example

~~~jsx
scheduler.templates.timeline_tooltip = function(start,end,event){
    return event.text;
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот шаблон работает только если включен плагин [timeline](guides/extensions-list.md#timeline). 
:::

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
