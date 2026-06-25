---
sidebar_label: onBeforeSectionRender
title: "onBeforeSectionRender событие"
description: "срабатывает до того, как отдельный раздел Timeline будет настроен, но ещё не отрисован (только представление Timeline)"
---

# onBeforeSectionRender

:::info
 Эта функциональность доступна только в PRO-версии. 
:::

### Description

@short: Срабатывает до того, как отдельный раздел Timeline будет настроен, но ещё не отрисован (только представление Timeline)

@signature: onBeforeSectionRender: (mode: string, section: object, timeline: object) =\> object

### Parameters

- `mode` - (required) *string* - режим таймлайна: 'cell', 'bar' или 'tree'
- `section` - (required) *object* - объект раздела с указанными в массиве 'y_unit' свойствами 'key' и 'label' конфигурационного объекта Timeline (например \{key:1, label:"James Smith"\})
- `timeline` - (required) *object* - конфигурационный объект Timeline

### Returns
- `result` - (object) - объект раздела

### Example

~~~jsx
scheduler.attachEvent("onBeforeSectionRender", function(mode, section, timeline){
    // любая ваша логика здесь
    return section;
});
~~~

### Details

Событие можно использовать для настройки разделов таймлайна.