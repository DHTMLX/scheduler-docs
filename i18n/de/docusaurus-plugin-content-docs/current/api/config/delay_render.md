---
sidebar_label: "delay_render"
title: "delay_render config"
description: "setzt ein Timeout (in Millisekunden), das die Aufrufe von [updateView](api/method/updateview.md) und [setCurrentView](api/method/setcurrentview.md) (die den Scheduler zum Neuzeichnen veranlassen) umschließt"
---

# delay_render

### Description

@short: Setzt ein Timeout (in Millisekunden), das die Aufrufe von [updateView](api/method/updateview.md) und [setCurrentView](api/method/setcurrentview.md) (die den Scheduler zum Neuzeichnen veranlassen) umschließt

@signature: delay_render: number

### Example

~~~jsx
scheduler.config.delay_render = 30;

scheduler.init("scheduler_here");
~~~

### Details

:::note

Diese Option kann helfen, die Performance zu verbessern.
 
:::

:::note

Um sicherzustellen, dass ein Befehl erst nach dem tatsächlichen Neuzeichnen ausgeführt wird, platzieren Sie ihn in der Callback-Funktion des [onViewChange](api/event/onviewchange.md) Events.
 
:::

Der Standardwert ist 0.

Viele Scheduler-Konfigurationen erfordern ein Neuzeichnen. Bei komplexen Setups kann es vorkommen, dass mehrere Funktionen jeweils einige Einstellungen aktualisieren und den Scheduler neu zeichnen, um Änderungen anzuwenden. Häufige Neuzeichnungen können Ihre Anwendung verlangsamen.

Die **delay_render**-Option hilft, die Anzahl der Neuzeichnungen zu reduzieren.

<br>

Wenn Sie beispielsweise <code>scheduler.config.delay_render = 30;</code> setzen, wird bei jeder Anforderung eines Neuzeichnens der Scheduler den Aufruf in eine Warteschlange stellen und 30 Millisekunden warten.
Kommt während dieser Wartezeit eine weitere Neuzeichnungsanforderung hinzu, setzt der Scheduler den Timer zurück und wartet weitere 30 ms.
Als Ergebnis wird, wenn [updateView](api/method/updateview.md) und/oder [setCurrentView](api/method/setcurrentview.md) mehrfach kurz hintereinander aufgerufen werden 
(was häufig passiert, wenn Neuzeichnungen aus verschiedenen Teilen des Custom Codes ausgelöst werden), nur der letzte Aufruf tatsächlich ausgeführt.
