---
sidebar_label: "repeat_precise"
title: "repeat_precise config"
description: "Verhindert die Einbeziehung vergangener Tage bei Ereignissen mit wöchentlicher Wiederholung"
---

# repeat_precise

### Description

@short: Verhindert die Einbeziehung vergangener Tage bei Ereignissen mit wöchentlicher Wiederholung

@signature: repeat_precise: boolean

### Example

~~~jsx
scheduler.config.repeat_precise = true;
~~~

**Default value:** false

### Details

:::note
 Die Eigenschaft erfordert, dass die [recurring](guides/extensions-list.md#recurring) Erweiterung aktiviert ist. 
:::

Standardmäßig fügt der Scheduler bei gesetzter 'weekly' Wiederholung die aktuelle Woche zur Wiederholung hinzu, 
unabhängig davon, ob das Ereignis nach, zwischen oder vor den angegebenen Tagen erstellt wurde.<br>

Wenn beispielsweise ein Ereignis an einem Donnerstag erstellt wird und sich wöchentlich an Montag und Mittwoch wiederholen soll, 
beinhaltet das Ereignis den Montag und Mittwoch der aktuellen Woche, obwohl diese Tage bereits vergangen sind.

Wenn die **repeat_precise** Option auf *true* gesetzt ist, wird das Startdatum eines wiederkehrenden Ereignisses 
auf das Datum des ersten tatsächlichen Auftretens gesetzt, was in unserem Beispiel der Montag der folgenden Woche ist.

### Related Guides
- [Wiederkehrende Ereignisse](guides/recurring-events.md)
