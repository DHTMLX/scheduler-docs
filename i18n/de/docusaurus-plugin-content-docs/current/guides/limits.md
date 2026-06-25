---
title: "Blockieren und Markieren von Terminen"
sidebar_label: "Blockieren und Markieren von Terminen"
---

# Blockieren und Markieren von Terminen

Die Bibliothek bietet die **Limit**-Erweiterung, die es ermöglicht, bestimmte Termine oder Datumsbereiche zu blockieren und zu markieren (hervorzuheben).

Um das Plugin zu verwenden, aktivieren Sie es auf der Seite.

:::note
Hinweis, wenn Sie das [](views/timeline.md) verwenden, sollte die 'limit'-Erweiterung vor der 'timeline'-Erweiterung aktiviert sein:
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~

## Konfigurationsoptionen

Die Erweiterung bietet Ihnen folgende Konfigurationsoptionen:

- [display_marked_timespans](api/config/display_marked_timespans.md) - definiert, ob die markierten (blockierten) Zeitspannen im Scheduler hervorgehoben werden sollen
- [check_limits](api/config/check_limits.md) - aktiviert bzw. deaktiviert die Überprüfung von Limits
- [mark_now](api/config/mark_now.md) - aktiviert/deaktiviert den Marker, der die aktuelle Zeit anzeigt
- [now_date](api/config/now_date.md) - setzt das Datum für die Option [mark_now](api/config/mark_now.md)
- [limit_end](api/config/limit_end.md) - setzt das Endlimit des zulässigen Datumsbereichs
- [limit_start](api/config/limit_start.md) - setzt das Startlimit des zulässigen Datumsbereichs
- [limit_view](api/config/limit_view.md) - begrenzt das Anzeigen von Ereignissen


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## Zugehörige Ereignisse

Wenn der Scheduler versucht, ein Ereignis mit einem nicht zulässigen Datum zu erstellen oder zu ändern, wird das Ereignis [onLimitViolation](api/event/onlimitviolation.md) generiert.

## Wie blockiert man bestimmte Termine?

Es gibt mehrere Methoden, mit denen Sie im Scheduler ein Limit festlegen können:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - markiert Termine, aber mit bestimmten Einstellungen bewirkt dies eine Blockierung (erlaubt das Festlegen eines benutzerdefinierten Stylings für das Limit)
- [markTimespan](api/method/marktimespan.md) - markiert und/oder blockiert Datum(e), indem der Standard- oder ein benutzerdefinierter Stil darauf angewendet wird. Die Markierung wird unmittelbar nach jeder internen Aktualisierung der App aufgehoben. Kann zum Hervorheben verwendet werden


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## Wie markiert man bestimmte Termine?

Es gibt zwei Methoden, die verwendet werden können, um die angegebenen Datum(e) zu markieren:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - markiert Termine, aber mit bestimmten Einstellungen bewirkt dies eine Blockierung (erlaubt das Festlegen eines benutzerdefinierten Stylings für das Limit)
- [markTimespan](api/method/marktimespan.md) - markiert und/oder blockiert Datum(e), indem der Standard- oder ein benutzerdefinierter Stil darauf angewendet wird. Die Markierung wird unmittelbar nach jeder internen Aktualisierung der App aufgehoben. Kann zum Hervorheben verwendet werden


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Entfernen von Markierung/Blockierung

Es gibt mehrere Methoden, mit denen Sie die derzeit markierten/blokkierten Zeitspannen entfernen können:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - entfernt Markierung/Blockierung, festgelegt durch die Methode [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [unmarkTimespan](api/method/unmarktimespan.md) - entfernt Markierung/Blockierung, festgelegt durch die Methode [markTimespan](api/method/marktimespan.md)


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Blockierpriorität

Wenn Sie die 'Blocking'-Methoden mehrmals aufrufen und verschiedene Bereiche blockieren, folgt die Blockierung dieser Priorität (von hoch nach niedrig):


1. Daten, die durch Date()-Objekte für bestimmte Elemente festgelegt sind;
2. Daten für bestimmte Elemente (wenn der **sections**-Parameter definiert ist);
3. Daten, die durch Date()-Objekte festgelegt wurden;
4. Andere Daten.

- Eine Blockierung/Markierung mit höherer Priorität überschreibt die mit niedrigerer Priorität, sofern sie denselben **type** haben. 
- Mehrere Blockierungs-/Markierungsmethoden mit derselben Priorität (im gleichen Zeitslot gelegen) werden gleichzeitig angewendet.

Zum Beispiel:


~~~js
scheduler.addMarkedTimespan({ // blockiert den 4. Juli 2027 (Mittwoch).
    days:  new Date(2027, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // Zugewiesene CSS-Klasse
});
scheduler.addMarkedTimespan({ // blockiert jeden Sonntag, Montag, Mittwoch
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // Zugewiesene CSS-Klasse
});
// blockiert jeden Sonntag und Mittwoch nur für das Element mit id="2" 
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // Zugewiesene CSS-Klasse
    sections: { timeline: 2} 
});
~~~


Als Ergebniss der Aufrufe dieser Methoden erhalten Sie Folgendes:


1. Zuerst wird der Scheduler jedes Sonntag und Mittwoch für das Element (id="2") in der Timeline-Ansicht blockieren und diese grau färben.
2. Dann wird der 4. Juli 2012 blockiert und rot gefärbt.
3. Schließlich wird jeder Sonntag, Montag und Mittwoch blockiert und blau gefärbt.

![limits_priority.png](/img/limits_priority.png)

Um dieses Verhalten zu ändern und alle Marker unabhängig von ihrer Priorität anzuzeigen, können Sie die Einstellung [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) verwenden:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~