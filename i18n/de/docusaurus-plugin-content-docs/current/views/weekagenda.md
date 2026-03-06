---
title: "Week-Agenda-Ansicht"
sidebar_label: "Week-Agenda-Ansicht"
---

# Week-Agenda-Ansicht

:::info
Diese Ansicht ist nur in der Scheduler PRO-Version enthalten.
:::

Die Week-Agenda-Ansicht kombiniert Elemente der Week- und Agenda-Ansichten und zeigt eine Liste der anstehenden Termine für die Woche an.

![weekagenda_view](/img/weekagenda_view.png)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Initialisierung

Um die Week-Agenda-Ansicht im Scheduler einzubinden, gehen Sie wie folgt vor:

1. Aktivieren Sie die Week-Agenda-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    week_agenda: true
});
~~~
2. Fügen Sie den Tab der Ansicht im Markup des Schedulers hinzu:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="week_agenda_tab"></div>
    </div>
    ...    
</div>
~~~
3. Weisen Sie dem Tab eine Beschriftung zu:
~~~js
//'weekAg_tab' ist der Name unseres div
scheduler.locale.labels.week_agenda_tab = "Week Agenda"; 
~~~


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## GUI-Details

- Ausgewählte Termine werden hervorgehoben. Wenn ein Termin mehrere Tage umfasst, werden alle zugehörigen Einträge ebenfalls hervorgehoben.
- Um einen neuen Termin zu erstellen, doppelklicken Sie auf die Zelle des Tages, an dem der Termin hinzugefügt werden soll.
- Um einen Termin zu bearbeiten oder zu löschen, doppelklicken Sie auf den Termin selbst, um das Lightbox-Fenster zu öffnen und Änderungen vorzunehmen.


## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [WeekAgenda-Ansichtsvorlagen](views/weekagenda-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Skins](guides/skins.md)
- [Lokalisierung](guides/localization.md)
