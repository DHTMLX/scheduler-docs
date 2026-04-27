---
title: "Agenda-Ansicht (v6.0)"
sidebar_label: "Agenda-Ansicht (v6.0)"
---

# Agenda-Ansicht (v6.0)

*Dieser Artikel behandelt dhtmlxScheduler Version 6.0 und früher. Für dhtmlxScheduler 7.0 und neuer finden Sie Details [hier](views/agenda.md).*

Die Agenda-Ansicht zeigt eine Liste bevorstehender Ereignisse an.

![agenda_view_old](/img/agenda_view_old.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
Standardmäßig zeigt die linke Liste in der Ansicht Ereignisse ab dem aktuellen Datum an. Um dieses Verhalten anzupassen, verwenden Sie die Eigenschaften [agenda_start](api/config/agenda_start.md) und [agenda_end](api/config/agenda_end.md).
:::

## Initialisierung

Um die Agenda-Ansicht zum Scheduler hinzuzufügen, gehen Sie wie folgt vor:

1) Aktivieren Sie die Agenda-Erweiterung auf der Seite:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) Fügen Sie den Tab der Ansicht in das Scheduler-Markup ein:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="agenda_tab"></div>
    </div>
    ...    
</div>
~~~
  
3) Legen Sie die Beschriftung für den Tab fest:

~~~js
//'agenda_tab' ist der Name des div. Standardmäßig ist die Beschriftung 'Agenda' 
scheduler.locale.labels.agenda_tab = "Meine Agenda"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## GUI-Details 

- Doppelklicken Sie auf eine leere Zelle in der Liste, um ein neues Ereignis zu erstellen.
- Um ein Ereignis zu bearbeiten oder zu löschen, doppelklicken Sie auf das 'Details'-Symbol links neben der Ereignisbeschreibung, um das Lightbox-Fenster zu öffnen und Änderungen vorzunehmen.

## Tipps zur Lokalisierung

Die Agenda-Ansicht enthält 3 Beschriftungen in der Lokalisierung:

- **scheduler.locale.labels.(agendaName)_tab** - die Beschriftung für den Ansichtstab
- **scheduler.locale.labels.date** - die Überschrift für die Datumsspalte
- **scheduler.locale.labels.description** - die Überschrift für die Beschreibungsspalte

In der Regel wird die erste Beschriftung beim Hinzufügen des Ansichtstabs zum Scheduler gesetzt. Die anderen Beschriftungen sollten nur geändert werden, wenn die Anwendung in eine andere Sprache als Englisch lokalisiert wird.

## Festlegen des anzeigbaren Datumsbereichs

Um den Datumsbereich, der in der Agenda-Ansicht angezeigt wird, zu definieren, verwenden Sie die Eigenschaften [agenda_end](api/config/agenda_end.md) und [agenda_start](api/config/agenda_start.md):

~~~js
//um Termine ab dem 1. Juni 2026 anzuzeigen
scheduler.config.agenda_start = new Date(2026, 5, 1); 

//um Termine bis zum 1. Juni 2027 anzuzeigen
scheduler.config.agenda_end = new Date(2027, 5, 1);   
~~~

## Aktivieren der Schaltflächen Weiter/Zuvor/Heute 

Die Schaltflächen Weiter, Zuvor und Heute können in der Agenda-Ansicht aktiviert werden, indem die Funktionen **scheduler.date.agenda_start()** und **scheduler.date.add_agenda()** neu definiert werden.

**scheduler.date.agenda_start(date)** gibt den Beginn des angezeigten Intervalls für ein bestimmtes Datum zurück. Standardmäßig gibt sie ein festes Datum zurück, sodass die Agenda-Ansicht nicht auf Navigationsschaltflächen reagiert.

Definieren Sie diese Funktionen beispielsweise so um, dass sie den aktuellen Monat zurückgeben:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.month_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "month"); 
}; 
~~~

Danach funktionieren die Navigationsschaltflächen wie erwartet.

**Related sample** [Next/Previous/Today buttons in Agenda view](https://snippet.dhtmlx.com/5/5a5d072f2)


## Breite der Spalten

Die Spaltenbreiten in der Agenda-Ansicht können über CSS-Klassen angepasst werden:

~~~css
<style>
  .dhx_agenda_line div{
     width: 300px; 
  }
  .dhx_v_border{
     left: 299px; 
  }
</style>
~~~

![Columns Width](/img/agenda_columns_width.png)

**Related sample** [Adjusting width of columns](https://snippet.dhtmlx.com/5/8a2c1eb40)

## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Agenda-Ansichtsvorlagen](views/agenda-view-templates-legacy.md)
- [Daten laden](guides/loading-data.md)
- [Skins](guides/skins.md)
- [Lokalisierung](guides/localization.md)
