---
sidebar_label: "onScaleAdd"
title: "onScaleAdd event"
description: "Wird unmittelbar ausgelöst, nachdem eine einzelne View-Einheit (wie eine Spalte, ein Abschnitt oder eine Tageszelle) im Scheduler gerendert wurde."
---

# onScaleAdd

### Description

@short: Wird unmittelbar ausgelöst, nachdem eine einzelne View-Einheit (wie eine Spalte, ein Abschnitt oder eine Tageszelle) im Scheduler gerendert wurde.

@signature: onScaleAdd: (unit: HTMLElement, date: object) =\> void

### Parameters

- `unit` - (required) *HTMLElement* - ein HTML-Element, das die spezifische View-Einheit repräsentiert
- `date` - (required) *object* - das Datum, das mit dieser Einheit verknüpft ist

### Example

~~~jsx
scheduler.attachEvent("onScaleAdd", function (unit, date){
    //platzieren Sie hier Ihre benutzerdefinierte Logik
});
~~~

### Details

Verschiedene Views enthalten unterschiedliche Einheiten:

- **Day view** - eine Spalte, die den gesamten Tag repräsentiert;
- **Week view** - eine Spalte für jeden Tag;
- **Month view** - eine Zelle für jeden Tag;
- **Units** - ein Abschnitt;
- **Timeline** - ein Abschnitt;
- **Year** - eine Zelle, die einen Tag darstellt.
