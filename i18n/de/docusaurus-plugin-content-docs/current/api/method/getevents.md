---
sidebar_label: "getEvents"
title: "getEvents method"
description: "gibt eine Sammlung von Ereignissen zurück, die innerhalb des angegebenen Zeitraums stattfinden"
---

# getEvents

### Description

@short: Gibt eine Sammlung von Ereignissen zurück, die innerhalb des angegebenen Zeitraums stattfinden

@signature: getEvents: (from?: Date, to?: Date) =\> any[]

### Parameters

- `from` - (optional) *Date* - das Startdatum des Zeitraums
- `to` - (optional) *Date* - das Enddatum des Zeitraums

### Returns
- ` array` - (array) - ein Array von Event-Objekten

### Example

~~~jsx
const evs = scheduler.getEvents(new Date(2027,1,10),new Date(2027,2,10)); 
evs.forEach((e) => console.log(e.text));
// oder
const evs = scheduler.getEvents();// gibt alle Ereignisse zurück
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

Wenn die Unterstützung für [recurring events](guides/recurring-events.md) aktiviert ist, variiert das Verhalten der **getEvents**-Methode je nachdem, ob die "from-to"-Parameter angegeben sind.

#### Verwendung von getEvents mit Recurring Events

- Wenn **from-to**-Parameter angegeben sind, gibt die Methode alle Einzelereignisse, Vorkommen aus wiederkehrenden Serien und alle modifizierten Instanzen innerhalb dieses Zeitraums zurück:
~~~js
const today = scheduler.date.day_start(new Date());
const nextWeek = scheduler.date.add(today, 1, "week");
const events = scheduler.getEvents(today, nextWeek);
~~~

- Werden die **from-to**-Parameter weggelassen, gibt die Methode alle Einzelereignisse, wiederkehrende Serien als Einträge (nicht einzelne Vorkommen) sowie alle modifizierten oder gelöschten Instanzen zurück. Allerdings sind dabei die konkreten Daten der wiederkehrenden Vorkommen nicht enthalten.

:::note
 In Versionen vor v7.1.2 erforderte die **getEvents**-Methode "from-to"-Parameter, wenn wiederkehrende Ereignisse aktiv waren. Ohne diese Parameter wurde ein leeres Array zurückgegeben, da die Recurring-Extension unendliche Ereignisfolgen erzeugen konnte, was es unpraktisch machte, alle Vorkommen zurückzugeben. 
:::

Sind wiederkehrende Ereignisse deaktiviert, verhält sich die Methode unabhängig davon, ob Parameter angegeben sind, gleich. Werden keine Parameter übergeben, gibt sie einfach alle Ereignisse zurück.

### Change log
- aktualisiert in v7.1.2
