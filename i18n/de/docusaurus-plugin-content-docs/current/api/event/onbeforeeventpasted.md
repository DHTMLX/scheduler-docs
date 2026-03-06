---
sidebar_label: "onBeforeEventPasted"
title: "onBeforeEventPasted event"
description: "Wird ausgelöst, kurz bevor der Benutzer die Tastenkombination 'CTRL+V' drückt"
---

# onBeforeEventPasted

### Description

@short: Wird ausgelöst, kurz bevor der Benutzer die Tastenkombination 'CTRL+V' drückt

@signature: onBeforeEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> boolean

### Parameters

- `isCopy` - (required) *boolean* - zeigt an, ob das Event vor dem Einfügen kopiert oder ausgeschnitten wurde. Ein <em>true</em>-Wert bedeutet, dass das Event kopiert wurde
- `pasted_ev` - (required) *object* - das neue Event-Objekt, das nach dem Einfügen erstellt wurde
- `original_ev` - (required) *object* - das ursprüngliche Event-Objekt, das kopiert oder ausgeschnitten wurde

### Returns
- ` result` - (boolean) - bestimmt, ob das Standardverhalten des Events ausgeführt wird (<b>true</b>) oder blockiert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // hier können Sie `pastedEvent` modifizieren
    return true; 
});
~~~

### Details

Stellen Sie sicher, dass die Erweiterung 'keyboard navigation' aktiviert ist.

### Related API
- [onEventPasted](api/event/oneventpasted.md)
