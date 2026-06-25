---
sidebar_label: "include_end_by"
title: "include_end_by config"
description: "Legt fest, ob das im 'End by'-Feld eingegebene Datum als exklusiv oder inklusiv behandelt wird"
---

# include_end_by
:::warning
Diese Eigenschaft ist nur mit der Legacy-Erweiterung für wiederkehrende Ereignisse funktionsfähig.
:::
### Description

@short: Legt fest, ob das im 'End by'-Feld eingegebene Datum als exklusiv oder inklusiv behandelt wird

@signature: include_end_by: boolean

### Example

~~~jsx
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** false

### Details

:::note
 Diese Eigenschaft erfordert, dass die [recurring](guides/extensions-list.md#recurring) Erweiterung aktiviert ist. 
:::

Standardmäßig wird das Datum im 'End by'-Feld als exklusiv betrachtet.

Beispielsweise, wenn der Benutzer '01.15.2027' im 'End by'-Feld eingibt:

- bei <code>include_end_by = false</code> (Standard) endet die wiederkehrende Serie am 14.01.2027.
- bei <code>include_end_by = true</code> endet die wiederkehrende Serie am 15.01.2027.

## Wie speichert die Datenbank die Daten?

Alle im Scheduler ausgewählten Daten enthalten Stunden- und Minutenangaben, sodass ein Datum wie *15.11.2027*, das in einem beliebigen Datepicker ausgewählt wird, als *15.11.2027 00:00* interpretiert wird.

Dies beeinflusst die Dauer der Serie bei der Auswahl von 'End by' im Formular für wiederkehrende Ereignisse.

Zum Beispiel, wenn der Benutzer *15.11.2027* im 'End by'-Feld eingibt:

- mit <code>include_end_by = false</code> (Standard) wird das Serienenddatum als *15.11.2027 00:00* gespeichert, das bedeutet, dass das letzte mögliche Ereignis bis zum *14.11.2027 23:59* stattfinden kann, also keine Ereignisse am ausgewählten Tag;
- mit <code>include_end_by = true</code> wird das Serienenddatum als *16.11.2027 00:00* (Mitternacht nach dem ausgewählten Datum) gespeichert, wodurch der ausgewählte Tag in der Serie enthalten ist und das letzte Ereignis bis zum *15.11.2027 23:59* stattfinden kann.

### Related API
- [repeat_date](api/config/repeat_date.md)

### Related Guides
- [Wiederkehrende Ereignisse](guides/recurring-events.md)
