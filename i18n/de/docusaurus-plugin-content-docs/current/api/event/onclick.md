---
sidebar_label: "onClick"
title: "onClick event"
description: "Wird ausgelöst, wenn der Benutzer die linke Maustaste auf ein Event klickt"
---

# onClick

### Description

@short: Wird ausgelöst, wenn der Benutzer die linke Maustaste auf ein Event klickt

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder blockiert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onClick", function (id, e){
       //beliebige eigene Logik hier
       return true;
  });
~~~

### Related samples
- [Hiding the select bar of the event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

Dieses Event kann blockiert werden. Wenn der Handler etwas anderes als true zurückgibt, wird das Standardverhalten (normalerweise das Anzeigen der Auswahlleiste) verhindert.

### Related Guides
- [Manipulationen mit dem Lightbox](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)
