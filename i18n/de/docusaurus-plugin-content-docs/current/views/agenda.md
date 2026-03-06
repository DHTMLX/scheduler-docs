---
title: "Agenda-Ansicht"
sidebar_label: "Agenda-Ansicht"
---

# Agenda-Ansicht 

*Wenn Sie mit dhtmlxScheduler 6.0 oder älter arbeiten, finden Sie die Details [hier](views/agenda-legacy.md).*

Die Agenda-Ansicht zeigt eine Liste bevorstehender Ereignisse auf übersichtliche und organisierte Weise an.

![agenda_view](/img/agenda_view.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
Standardmäßig beginnt die Liste auf der linken Seite mit der Anzeige der Ereignisse ab dem ersten Tag des aktuellen Monats. Um dies anzupassen, können Sie die Eigenschaften [agenda_start](api/config/agenda_start.md) und [agenda_end](api/config/agenda_end.md) verwenden oder die Funktionen **scheduler.date.agenda_start** und **scheduler.date.agenda_end** überschreiben.
:::

## Initialisierung

Um die Agenda-Ansicht zu Ihrem Scheduler hinzuzufügen, gehen Sie wie folgt vor:

1) Aktivieren Sie die Agenda-Erweiterung auf Ihrer Seite:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) Fügen Sie den Tab der Ansicht in das HTML des Schedulers ein:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="agenda"></div>
    </div>
    ...    
</div>
~~~
  
3) Legen Sie das Label für den Tab fest:

~~~js
//'agenda_tab' bezieht sich auf das Div des Tabs. Standardmäßig ist das Label 'Agenda'
scheduler.locale.labels.agenda_tab = "Meine Agenda"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## GUI-Details 

- Doppelklicken Sie auf eine leere Zelle in der Liste, um ein neues Ereignis zu erstellen.
- Doppelklicken Sie auf eine Ereigniszeile, um das Lightbox-Fenster zum Bearbeiten oder Löschen des Ereignisses zu öffnen.

## Lokalisierungstipps

Die Agenda-Ansicht enthält zwei Labels in der Locale:

- **scheduler.locale.labels.agenda_tab** - das Label für den Ansichtstab
- **scheduler.locale.labels.full_day** - das Label, das für ganztägige oder mehrtägige Ereignisse angezeigt wird

In der Regel wird das erste Label beim Hinzufügen des Ansichtstabs gesetzt, während das zweite nur angepasst werden sollte, wenn Ihre Anwendung eine andere Sprache als Englisch verwendet.

## Buttons für Nächster/Vorheriger/Heute 

Standardmäßig zeigt die Agenda-Ansicht Ereignisse für einen Monat an. Mit den Schaltflächen Nächster, Vorheriger und Heute können Benutzer zwischen den Monaten navigieren. Sie können den angezeigten Zeitraum anpassen, indem Sie die Funktionen **scheduler.date.agenda_start()** und **scheduler.date.add_agenda()** überschreiben.

**scheduler.date.agenda_start(date)** gibt das Startdatum des angezeigten Intervalls auf Basis des übergebenen Datums zurück. Standardmäßig wird der erste Tag des Monats zurückgegeben.

Sie können diese Funktionen z. B. so überschreiben, dass nur eine Woche angezeigt wird:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.week_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "week"); 
}; 
~~~

Dadurch wird der angezeigte Zeitraum auf eine Woche begrenzt.

## Festlegen des anzeigbaren Datumsbereichs

Sie können den angezeigten Bereich auch fest einstellen, indem Sie die Eigenschaften [agenda_end](api/config/agenda_end.md) und [agenda_start](api/config/agenda_start.md) setzen:

~~~js
scheduler.config.agenda_start = new Date(2023, 5, 1); 
scheduler.config.agenda_end = new Date(2023, 6, 1);   
~~~

## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Agenda-Ansicht-Vorlagen](views/agenda-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Skins](guides/skins.md)
- [Lokalisierung](guides/localization.md)
