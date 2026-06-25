---
sidebar_label: "renderEvent"
title: "renderEvent method"
description: "erstellt den HTML-Inhalt für eine benutzerdefinierte Event-Box"
---

# renderEvent

### Description

@short: Erstellt den HTML-Inhalt für eine benutzerdefinierte Event-Box

@signature: renderEvent: (container: HTMLElement, event: any) =\> boolean

### Parameters

- `container` - (required) *HTMLElement* - das Container-Element für das Event
- `event` - (required) *object* - das Event-Datenobjekt

### Returns
- ` display` - (boolean) - <ul><li><b>true</b> - der Scheduler verwendet ein benutzerdefiniertes Formular</li><li><b>false</b> - der Scheduler verwendet das Standardformular</li></ul>

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
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

Beachten Sie, dass diese Methode nur für Views mit einer vertikalen Skala gilt, wie z.B. Day oder Week Views.

### Related Guides
- [Benutzerdefiniertes Ereignisfeld](guides/custom-events-display.md)
