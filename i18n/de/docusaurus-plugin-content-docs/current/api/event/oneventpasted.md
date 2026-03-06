---
sidebar_label: "onEventPasted"
title: "onEventPasted event"
description: "Wird ausgelöst, wenn der Benutzer die Tastenkombination 'CTRL+V' drückt"
---

# onEventPasted

### Description

@short: Wird ausgelöst, wenn der Benutzer die Tastenkombination 'CTRL+V' drückt

@signature: onEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> void;

### Parameters

- `isCopy` - (required) *boolean* - zeigt an, ob das Event vor dem Einfügen kopiert oder ausgeschnitten wurde. Ein Wert von <em>true</em> bedeutet, dass das Event kopiert wurde
- `pasted_ev` - (required) *object* - das neu erstellte Event-Objekt, das durch die Einfügeaktion entstanden ist
- `original_ev` - (required) *object* - das ursprüngliche Event-Objekt, das kopiert oder ausgeschnitten wurde

### Example

~~~jsx
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
    // beliebige eigene Logik hier
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### Details

:::note
 Dieses Event erfordert, dass die [key_nav](guides/extensions-list.md#keyboard-navigation) Erweiterung aktiviert ist. 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
