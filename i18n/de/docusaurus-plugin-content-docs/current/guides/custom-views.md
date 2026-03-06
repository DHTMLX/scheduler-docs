---
title: "Custom View"
sidebar_label: "Custom View"
---

# Custom View 

Wenn die Standardansichten nicht ganz Ihren Anforderungen entsprechen, können Sie eine benutzerdefinierte Ansicht erstellen.

## Der Ansichten-Tab
Das Erstellen einer benutzerdefinierten Ansicht beginnt mit dem Hinzufügen eines neuen Tabs zum Scheduler, der Ihre neue Ansicht repräsentiert. Typischerweise sieht das so aus:

~~~js
<div class="dhx_cal_tab" data-tab="workweek"></div>
~~~

Beachten Sie dabei:

- Der Name des Tabs sollte diesem Muster folgen: (viewName)_tab
- Der Tab muss mindestens eine Klasse mit dem Namen "dhx_cal_tab" enthalten, und diese sollte als erste Klasse aufgeführt sein.

Um das Label für die Ansicht festzulegen, verwenden Sie:

~~~js
scheduler.locale.labels.{viewName}_tab = "someName"
~~~

## Methoden zur Steuerung der Ansicht
Es gibt drei wesentliche Methoden, die das Verhalten der Ansicht bestimmen - sie legen das Ansichtsintervall (z. B. eine Woche für die Wochenansicht, einen Monat für die Monatsansicht usw.) und das aktive Datum fest, wenn der Benutzer auf die Schaltflächen 'Next' oder 'Prev' im Header klickt.

1. **scheduler.date.(viewName)_start (active_date)** - nimmt das aktive Datum des Schedulers und gibt das Startdatum des Ansichtsintervalls zurück (zum Beispiel den ersten Tag der aktiven Woche in der Wochenansicht oder den ersten Tag des aktiven Monats in der Monatsansicht). 
2. **scheduler.date.get_(viewName)_end (start_date)** - nimmt das Startdatum (aus der vorherigen Methode) und gibt das Enddatum des Ansichtsintervalls zurück (z. B. den letzten Tag der aktiven Woche oder des Monats). 
3. **scheduler.date.add_(viewName)(date, inc)** - definiert, wie weit das aktive Datum vor- oder zurückgesetzt wird, wenn der Benutzer im Header auf 'Next' oder 'Prev' klickt.

## Konfiguration der Ansichtsvorlagen
Abschließend sollten Sie Vorlagen für das Datums-Header und die X-Achsen-Skala festlegen:

- **Ansichts-Header** - scheduler.templates.(viewName)_date = function(start_date, end_date)(...)
- **X-Achse** - scheduler.templates.(viewName)_scale_date = function(date)(...)

Zum Beispiel:

~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~

## Schritt-für-Schritt-Beispiel

So erstellen Sie eine benutzerdefinierte Ansicht namens 'workweek', die der Wochenansicht ähnelt, aber nur die Arbeitstage der Woche anzeigt.

![custom_view](/img/custom_view.png)

Die Schritte sind:
1. Fügen Sie den Ansichtstab hinzu:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
   <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="workweek_tab"></div>
   </div>
</div>
~~~
2. Legen Sie das Label für den Tab fest:
~~~js
scheduler.locale.labels.workweek_tab = "Work week"
~~~
3. Definieren Sie die Methode, die das Startdatum des Ansichtsintervalls zurückgibt, also den Montag der aktiven Woche:
~~~js
scheduler.date.workweek_start = function(date) {
    return scheduler.date.week_start(date);//
}
~~~
Hier wird die Methode week_start() aus der Wochenansicht wiederverwendet, da beide Ansichten das gleiche Startdatum haben.
4. Definieren Sie die Methode, die das Enddatum des Ansichtsintervalls zurückgibt, also den Freitag der aktiven Woche:
~~~js
scheduler.date.get_workweek_end="function(start_date){" 
    return scheduler.date.add(start_date,5,"day"); 
}
~~~
Die Methode add() passt das Datum an, indem das angegebene Zeitintervall hinzugefügt oder abgezogen wird. Weitere Details hier.
5. Definieren Sie die Methode, die bestimmt, wie sich das aktive Datum ändert, wenn auf die Schaltflächen 'Next' oder 'Prev' geklickt wird:
~~~js
scheduler.date.add_workweek="function(date,inc){" 
    return scheduler.date.add(date,inc*7,"day");
}
~~~
Die Methode add() übernimmt das Hinzufügen oder Abziehen des Zeitintervalls. Mehr dazu hier.
6. Definieren Sie die Vorlage für das Datum im Ansichts-Header:
~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
~~~
Diese Vorlage entspricht der Wochenansicht, daher wird einfach die Standardvorlage der Wochenansicht wiederverwendet - [week_date](api/template/week_date.md)
7. Definieren Sie die Vorlage für die X-Achse der Ansicht:
~~~js
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~
Auch diese Vorlage stammt aus der Wochenansicht, um die Konsistenz zu wahren - [week_scale_date](api/template/week_scale_date.md)


[Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)


## Benutzerdefinierte Ansicht als Standard festlegen
Die anfänglich im Scheduler angezeigte Ansicht wird während der Initialisierung festgelegt, wie in [init](api/method/init.md) beschrieben. Da die Vorlagen für eine benutzerdefinierte Ansicht zu diesem Zeitpunkt jedoch möglicherweise noch nicht vollständig verarbeitet sind, kann die Initialisierung fehlschlagen.


Um dies zu vermeiden, stellen Sie sicher, dass die Vorlagen für Ihre benutzerdefinierte Ansicht bereit sind, bevor Sie den Scheduler initialisieren, indem Sie benutzerdefinierte Ansichten innerhalb eines Handlers für das Ereignis [onTemplatesReady](api/event/ontemplatesready.md) erstellen. Dieses Ereignis wird ausgelöst, sobald alle Vorlagen vollständig verarbeitet wurden:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    // Platzieren Sie hier Ihren Code zur Erstellung der benutzerdefinierten Ansicht
});

scheduler.init(container, date, "custom view name");
~~~
