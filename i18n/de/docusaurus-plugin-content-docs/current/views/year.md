---
title: "Jahresansicht"
sidebar_label: "Jahresansicht"
---

# Jahresansicht 

Die Jahresansicht zeigt ein oder mehrere Jahre im Kalender an.

![year_view](/img/year_view.png)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## Initialisierung

Um die Jahresansicht im Scheduler zu aktivieren, gehen Sie wie folgt vor:

1. Aktivieren Sie die Year-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    year_view: true
});
~~~
2. Fügen Sie den Tab der Ansicht in das Markup des Schedulers ein:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="year_tab"></div>
    </div>
    ...    
</div>
~~~
3. Legen Sie die Beschriftung für den Tab fest:
~~~js
//'year_tab' ist der Name unseres div
scheduler.locale.labels.year_tab ="Year"; 
~~~


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## Details zur Benutzeroberfläche 

- Daten mit zugewiesenen Ereignissen werden hervorgehoben. 
- Wenn Sie mit der Maus über ein Datum fahren, erscheint ein Tooltip, der alle für diesen Tag geplanten Ereignisse auflistet. Durch Klicken auf das 'details'-Symbol im Tooltip wird das Lightbox-Fenster geöffnet (sofern der readonly-Modus nicht aktiviert ist).


## Anzahl der Monate in der Ansicht festlegen

Um zu steuern, wie viele Monate in jeder Zeile und Spalte angezeigt werden, passen Sie die Eigenschaften [year_x](api/config/year_x.md) und [year_y](api/config/year_y.md) an:

~~~js
//Die Jahresansicht zeigt nur 6 Monate an
scheduler.config.year_x = 2; //2 Monate pro Zeile
scheduler.config.year_y = 3; //3 Monate pro Spalte

~~~


## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Jahresansicht-Vorlagen](views/year-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Event-Objekt-Operationen](guides/event-object-operations.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
