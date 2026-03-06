---
sidebar_label: "renderEvent"
title: "renderEvent method"
description: "создает HTML-контент для кастомного блока события"
---

# renderEvent

### Description

@short: Создает HTML-контент для кастомного блока события

@signature: renderEvent: (container: HTMLElement, event: any) =\> boolean

### Parameters

- `container` - (required) *HTMLElement* - элемент-контейнер для события
- `event` - (required) *object* - объект с данными события

### Returns
- ` display` - (boolean) - <ul><li><b>true</b> - scheduler использует кастомную форму</li><li><b>false</b> - scheduler возвращается к стандартной форме</li></ul>

### Example

~~~jsx
scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width;
    var html = "<div class='dhx_event_move my_event_move' style='width:" +
    + container_width + "'></div>";
    ...
    container.innerHTML = html;
    return true; 
}
~~~

### Related samples
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

Учтите, что этот метод применим только для видов с вертикальной шкалой, таких как Day или Week views.

### Related Guides
- [Пользовательское Окно События](guides/custom-events-display.md)
