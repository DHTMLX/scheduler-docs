---
sidebar_label: "serialize"
title: "serialize method"
description: "serialisiert alle aktuell im Scheduler geladenen Events"
---

# serialize

### Description

@short: Serialisiert alle aktuell im Scheduler geladenen Events

@signature: serialize: () =\> void

### Example

~~~jsx
console.log(scheduler.serialize());


//(5) [{…}, {…}, {…}, {…}, {…}]
//> 0: {id: 1, start_date: '2022-05-17 09:00', end_date: '2022-05-17 12:00', 
//    text: 'Event'}
//> 1: {id: 2, start_date: '2022-05-18 10:00', end_date: '2022-05-18 16:00', 
//    text: 'Event'}
//> 2: {id: 3, start_date: '2022-05-20 10:00', end_date: '2022-05-20 14:00', 
//    text: 'Event'}
//> 3: {id: 4, start_date: '2022-05-21 16:00', end_date: '2022-05-21 17:00', 
//    text: 'Event'}
//> 4: {id: 5, start_date: '2022-05-22 09:00', end_date: '2022-05-22 17:00', 
//    text: 'Event'}
~~~

### Details

Diese Methode gibt ein Array aller aktuell im Scheduler geladenen Events zurück.

Das resultierende Array schließt alle temporären Datensätze aus, die durch die [Wiederkehrende Ereignisse](guides/recurring-events.md) Erweiterung erstellt wurden.

Eigenschaften, die mit `_` oder `$` beginnen, werden aus den zurückgegebenen Objekten ausgelassen, und alle `Date`-Eigenschaften werden als Strings unter Verwendung der [format_date](api/template/format_date.md) Vorlage konvertiert.

### Related API
- [format_date](api/template/format_date.md)

### Change log
- hinzugefügt in v6.0
