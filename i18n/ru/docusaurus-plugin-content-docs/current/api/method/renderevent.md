---
sidebar_label: renderEvent
title: "renderEvent метод"
description: "генерирует HTML-содержимое бокса пользовательского события"
---

# renderEvent

### Description

@short: Генерирует HTML-содержимое бокса пользовательского события

@signature: renderEvent: (container: HTMLElement, event: any) =\> boolean

### Parameters

- `container` - (required) *HTMLElement* - контейнер события
- `event` - (required) *object* - объект события

### Returns
- ` `display` - (boolean) - <ul><li><b>true</b> - планировщик отображает настраиваемую форму</li><li><b>false</b> - планировщик отображает форму по умолчанию</li></ul>

### Example

~~~jsx
scheduler.renderEvent = function(container, ev) {
    const container_width = container.style.width;
    let html = "<div class='dhx_event_move my_event_move' style='width:" +
    + container_width + "'></div>";
    ...
    container.innerHTML = html;
    return true; 
}
~~~

### Related samples
- [Пользовательский бокс события](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

Примечание: метод работает только для представлений с вертикальной шкалой, таких как Day view, Week view и т.д.

### Related Guides
- [Гайд по отображению настраиваемого события](guides/custom-events-display.md)