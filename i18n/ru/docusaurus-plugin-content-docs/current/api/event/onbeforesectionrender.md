---
sidebar_label: "onBeforeSectionRender"
title: "onBeforeSectionRender event"
description: "срабатывает непосредственно перед установкой отдельного раздела Timeline, но до его рендеринга (применимо только к виду Timeline)"
---

# onBeforeSectionRender
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает непосредственно перед установкой отдельного раздела Timeline, но до его рендеринга (применимо только к виду Timeline)

@signature: onBeforeSectionRender: (mode: string, section: object, timeline: object) =\> object

### Parameters

- `mode` - (required) *string* - режим timeline: 'cell', 'bar' или 'tree'
- `section` - (required) *object* - объект раздела, содержащий свойства 'key' и 'label', как определено в массиве 'y_unit' конфигурации Timeline (например, \{key:1, label:"James Smith"\})
- `timeline` - (required) *object* - объект конфигурации Timeline

### Returns
- ` result` - (object) - объект раздела

### Example

~~~jsx
scheduler.attachEvent("onBeforeSectionRender", function(mode, section, timeline){
    // здесь можно добавить пользовательскую логику
    return section;
});
~~~

### Details

Это событие позволяет вам кастомизировать разделы timeline перед их рендерингом.
