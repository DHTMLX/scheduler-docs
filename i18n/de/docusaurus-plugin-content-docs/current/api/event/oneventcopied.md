---
sidebar_label: "onEventCopied"
title: "onEventCopied event"
description: "Wird ausgelöst, wenn der Benutzer die Tastenkombination 'CTRL+C' drückt (funktioniert nur, wenn die Erweiterung 'keyboard navigation' aktiviert ist)"
---

# onEventCopied

### Description

@short: Wird ausgelöst, wenn der Benutzer die Tastenkombination 'CTRL+C' drückt (funktioniert nur, wenn die Erweiterung 'keyboard navigation' aktiviert ist)

@signature: onEventCopied: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - Das Objekt des kopierten Events

### Example

~~~jsx
scheduler.attachEvent("onEventCopied", function(ev) {
    dhtmlx.message("Sie haben das Event kopiert: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Details

:::note
 Dieses Event funktioniert nur, wenn die [key_nav](guides/extensions-list.md#keyboard-navigation) Erweiterung aktiviert ist. 
:::

### Related Guides
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
