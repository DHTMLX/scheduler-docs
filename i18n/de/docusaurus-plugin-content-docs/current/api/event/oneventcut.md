---
sidebar_label: "onEventCut"
title: "onEventCut event"
description: "Wird ausgelöst, wenn der Benutzer die Tastenkombination 'CTRL+X' drückt (funktioniert nur, wenn die 'keyboard navigation' Extension aktiviert ist)"
---

# onEventCut

### Description

@short: Wird ausgelöst, wenn der Benutzer die Tastenkombination 'CTRL+X' drückt (funktioniert nur, wenn die 'keyboard navigation' Extension aktiviert ist)

@signature: onEventCut: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - Das Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventCut", function(ev) {
    dhtmlx.message("Sie haben das Event ausgeschnitten: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

:::note
 Dieses Event funktioniert nur, wenn die [key_nav](guides/extensions-list.md#keyboard-navigation) Extension aktiviert ist. 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventPasted](api/event/oneventpasted.md)
