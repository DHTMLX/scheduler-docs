---
title: "Zeit und Datum"
sidebar_label: "Zeit und Datum"
---

# Zeit und Datum

In diesem Abschnitt finden Sie ein Paar von Datumsselektoren, die zur Festlegung eines bestimmten Zeit- und Datumsbereichs dienen.

![time_editor](/img/time_editor.png)

~~~js
scheduler.locale.labels.section_time = 'Time period';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Eigenschaften {#properties}

Hier sind einige der wichtigsten Eigenschaften, die häufig mit dem 'time'-Steuerelement verwendet werden (eine vollständige Liste finden Sie <a href="[lightbox](api/config/lightbox.md)">hier</a>):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) die Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) der Name der Daten-Eigenschaft, mit der der Abschnitt verknüpft ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ des Steuerelements im Abschnitt, wobei "time" für ein Datums-/Zeit-Steuerelement steht</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>year_range </b></td>
  <td>(<i>array, number</i>) definiert den Bereich für den Jahres-Selektor. Es kann auf zwei Arten festgelegt werden: <b>year_range: [2005, 2025]</b> - deckt die Jahre von 2005 bis 2025 ab <b>year_range: 10</b> - deckt einen Bereich von 10 Jahren vor bis 10 Jahren nach dem aktuellen Jahr ab</td>
  </tr>
  </tbody>
</table>


## Automatisches Enddatum im Time-Steuerelement

Um eine Standarddauer für ein Ereignis festzulegen und das Enddatum automatisch anzupassen, sodass diese Dauer beibehalten wird, verwenden Sie die Einstellungen [event_duration](api/config/event_duration.md) und [auto_end_date](api/config/auto_end_date.md):

~~~js
// legt die Ereignisdauer in Minuten für die automatische Anpassung der Endzeit fest
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


Mit dieser Konfiguration wird jedes Mal, wenn die Startzeit oder das Startdatum eines Ereignisses in der Lightbox geändert wird, die Endzeit und das Enddatum automatisch aktualisiert, sodass die Ereignisdauer bei 60 Minuten bleibt (wie durch die Option [event_duration](api/config/event_duration.md) festgelegt).


## Reihenfolge der Datums-/Zeitselektoren

Die Reihenfolge der Datums-/Zeit-Steuerelemente innerhalb des Abschnitts 'Time period' kann angepasst oder bestimmte Selektoren entfernt werden. Dies geschieht über die Eigenschaft [time_format](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections="["
  {name:"description", height:130, map_to:"text", type:"textarea", focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Beachten Sie, dass dies nur die Reihenfolge der Elemente im Array ändert, nicht jedoch das Datenanzeigeformat. Um das Format des Zeitbereichs anzupassen, verwenden Sie das Template [time_picker](api/template/time_picker.md).
:::

Beispiele für verschiedene Formate:

~~~js
//Standard-Reihenfolge
time_format:["%H:%i", "%m", "%d", "%Y"] 
//Monat zuerst
time_format:["%m","%d", "%Y", "%H:%i"]
//Jahres-Selektor entfernt
time_format:["%H:%i", "%m", "%d"]
//falsches Beispiel
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" durch "%M" ersetzt
~~~

## Mini-Kalender in der Lightbox {#minicalendarinthelightbox}

Ein Mini-Kalender (Date Picker) kann in die Lightbox integriert werden, um "Start"- und "Ende"-Datum auszuwählen.

![in_the_lightbox](/img/in_the_lightbox.png)

Um den Mini-Kalender zur Lightbox hinzuzufügen, gehen Sie wie folgt vor:


1. Fügen Sie die Erweiterung auf der Seite hinzu:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Ändern Sie den type des time-Abschnitts von time zu calendar_time:
~~~js
//Standard Lightbox-Konfiguration
scheduler.config.lightbox.sections="["
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
//Typ von "time" zu "calendar_time" ändern
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini calendar in the lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


Für weitere Anpassungen des Mini-Kalenders siehe [Mini Calendar Templates](guides/mini-calendar-templates.md).
