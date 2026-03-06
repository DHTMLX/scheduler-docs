---
title: "Blockieren und Markieren von Daten"
sidebar_label: "Blockieren und Markieren von Daten"
---

# Blockieren und Markieren von Daten

Diese Bibliothek beinhaltet die **Limit**-Erweiterung, mit der Sie bestimmte Daten oder Zeiträume blockieren und hervorheben können.

Um mit dem Plugin zu starten, aktivieren Sie es einfach auf Ihrer Seite.

:::note
Hinweis: Wenn Sie die [Timeline-Ansicht](views/timeline.md) verwenden, sollte die 'limit'-Erweiterung vor der 'timeline'-Erweiterung aktiviert werden:
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~

## Konfigurationsoptionen {#configurationoptions}

Hier sind die verfügbaren Konfigurationsoptionen dieser Erweiterung:


- [display_marked_timespans](api/config/display_marked_timespans.md) - steuert, ob markierte (blockierte) Zeitspannen im Scheduler hervorgehoben werden
- [check_limits](api/config/check_limits.md) - schaltet die Limit-Prüfung ein oder aus
- [mark_now](api/config/mark_now.md) - steuert den Marker, der die aktuelle Zeit anzeigt
- [now_date](api/config/now_date.md) - legt das Datum fest, das von der Option [mark_now](api/config/mark_now.md) verwendet wird
- [limit_end](api/config/limit_end.md) - definiert das Endlimit des erlaubten Datumsbereichs
- [limit_start](api/config/limit_start.md) - definiert das Startlimit des erlaubten Datumsbereichs
- [limit_view](api/config/limit_view.md) - beschränkt das Anzeigen von Ereignissen


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## Verwandte Ereignisse {#relatedevents}

Wenn jemand versucht, ein Ereignis an einem nicht erlaubten Datum zu erstellen oder zu ändern, wird das Ereignis [onLimitViolation](api/event/onlimitviolation.md) ausgelöst.

## Wie blockiert man bestimmte Daten? {#how-to-block-certain-dates}

Es gibt verschiedene Möglichkeiten, Limits im Scheduler zu setzen:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - markiert Daten und kann sie mit benutzerdefinierten Stiloptionen blockieren
- [markTimespan](api/method/marktimespan.md) - markiert oder blockiert Daten mit Standard- oder benutzerdefinierten Stilen; die Markierung wird nach jedem internen Update entfernt, nützlich zum Hervorheben


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## Wie markiert man bestimmte Daten? {#how-to-mark-certain-dates}

Sie können diese beiden Methoden verwenden, um bestimmte Daten hervorzuheben:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - markiert Daten und kann sie mit benutzerdefinierten Stiloptionen blockieren
- [markTimespan](api/method/marktimespan.md) - markiert oder blockiert Daten mit Standard- oder benutzerdefinierten Stilen; die Markierung wird nach jedem internen Update entfernt, nützlich zum Hervorheben


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Markierung/Blockierung entfernen {#removingmarkingblocking}

Um aktuell markierte oder blockierte Zeitspannen zu entfernen, können Sie diese Methoden verwenden:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - entfernt Markierungen oder Blockierungen, die mit [addMarkedTimespan](api/method/addmarkedtimespan.md) gesetzt wurden
- [unmarkTimespan](api/method/unmarktimespan.md) - entfernt Markierungen oder Blockierungen, die mit [markTimespan](api/method/marktimespan.md) gesetzt wurden


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Blockierungspriorität {#blocking-priority}

Wenn mehrere Blockierungsmethoden für verschiedene Bereiche verwendet werden, funktioniert die Blockierungspriorität wie folgt (von höchster zu niedrigster):


1. Daten, die mit Date()-Objekten für bestimmte Elemente angegeben werden;
2. Daten für bestimmte Elemente (wenn der **sections**-Parameter gesetzt ist);
3. Daten, die mit Date()-Objekten angegeben werden;
4. Andere Daten.

- Blockierungen oder Markierungen mit höherer Priorität überschreiben solche mit niedrigerer Priorität, wenn sie denselben **type** haben.
- Methoden mit gleicher Priorität (zeitlich überlappend) werden gemeinsam angewendet.

Beispiel:


~~~js
scheduler.addMarkedTimespan({ // blockiert den 4. Juli 2012 (Mittwoch).
    days:  new Date(2019, 7, 4),
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


Nach diesen Aufrufen verhält sich der Scheduler wie folgt:


1. Zuerst werden **jeder Sonntag und Mittwoch für das Element mit id="2" in der Timeline-Ansicht** blockiert und grau eingefärbt.
2. Danach wird **der 4. Juli 2012** blockiert und rot eingefärbt.
3. Schließlich werden **jeder Sonntag, Montag und Mittwoch** blockiert und blau eingefärbt.

![limits_priority.png](/img/limits_priority.png)

Wenn Sie alle Marker unabhängig von ihrer Priorität anzeigen möchten, können Sie die Option [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) wie folgt setzen:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~
