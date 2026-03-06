---
sidebar_label: "onEventSave"
title: "onEventSave event"
description: "Wird ausgelöst, wenn der Benutzer im Lightbox-Formular (Bearbeitungsformular) auf die Schaltfläche 'Speichern' klickt."
---

# onEventSave

### Description

@short: Wird ausgelöst, wenn der Benutzer im Lightbox-Formular (Bearbeitungsformular) auf die Schaltfläche „Speichern" klickt.

@signature: onEventSave: (id: string, ev: object, original_ev: object) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `ev` - (required) *object* - ein Zwischenobjekt des Events, das die Werte aus der Lightbox enthält
- `is_new` - (required) *Date* - bietet das Erstellungsdatum des Events, falls es sich um ein neues Event handelt, das gespeichert wird; andernfalls <i>null</i>, wenn das Event bereits existiert

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev,is_new){
    if (!ev.text) {
        alert("Text darf nicht leer sein");
        return false;
    }
    if (!ev.text.length<20) {
        alert("Text ist zu kurz");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)

### Details

Dieses Event kann blockiert werden und ist nützlich für Validierungszwecke. Wenn *false* zurückgegeben wird, wird der Standard-Speichervorgang verhindert.

Beachte:

- Wenn dieses Event ausgelöst wird, wurden die Werte aus der Lightbox noch nicht auf das Original-Event angewendet, daher liefert <code>scheduler.getEvent(id)</code> das Event in seinem ursprünglichen Zustand zurück.
- Das 'ev'-Objekt enthält nur Eigenschaften, die den Eingabefeldern in der Lightbox entsprechen; wenn die Lightbox beispielsweise nur ein Eingabefeld hat, enthält 'ev' nur diese einzelne Eigenschaft.
