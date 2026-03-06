---
title: "Wiederkehrende Ereignisse"
sidebar_label: "Wiederkehrende Ereignisse"
---

# Wiederkehrende Ereignisse 

Wiederkehrende Ereignisse sind eine praktische Funktion in Kalenderanwendungen, mit der Benutzer Ereignisse einrichten können, die sich in gewählten Intervallen wiederholen. Seit Version 7.1 verwendet der Scheduler das [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545) Standardformat für wiederkehrende Ereignisse.

Diese Anleitung beschreibt, wie Sie mit wiederkehrenden Ereignissen im Scheduler arbeiten und wie Sie sie in der Datenbank speichern.

:::note
Eine Beschreibung des älteren Formats für wiederkehrende Ereignisse finden Sie [hier](guides/recurring-events-legacy.md)
:::

Standardmäßig sind wiederkehrende Ereignisse im Scheduler nicht aktiviert. Um diese Funktion hinzuzufügen, müssen Sie eine spezielle Erweiterung auf Ihrer Seite aktivieren - das **recurring**-Plugin:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

Nach der Aktivierung der wiederkehrenden Ereignisse enthält die Lightbox-Oberfläche einen zusätzlichen Abschnitt, wie unten dargestellt:

![recurring_lightbox](/img/recurring_lightbox.png)

## Konfigurationsoptionen {#configurationoptions}

Die Bibliothek bietet folgende Option zur Anpassung wiederkehrender Ereignisse:

- [repeat_date](api/config/repeat_date.md) - steuert das Datumsformat, das im Feld „Ende bis" innerhalb der „recurring"-Lightbox verwendet wird.

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring'-Lightbox {#recurringlightbox}

Sobald die Erweiterung für wiederkehrende Ereignisse aktiv ist, erhält die Lightbox einen zusätzlichen Abschnitt namens „Ereignis wiederholen". Die Standardkonfiguration für die 'recurring'-Lightbox sieht wie folgt aus:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Sie können beliebige weitere Abschnitte hinzufügen, müssen jedoch sowohl den „recurring"- als auch den „time"-Abschnitt beibehalten. Außerdem sollte der „time"-Abschnitt immer **nach** dem „recurring"-Abschnitt erscheinen.


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Formatbeschreibung {#formatdescription}

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Datensatz gespeichert, der alle Standardfelder eines Ereignisses sowie einige zusätzliche Eigenschaften enthält:

1. **start_date** - (_datetime_) markiert das Startdatum der Serie
2. **end_date** - (_datetime_) markiert das Enddatum der Serie
3. **rrule** - (_string_) definiert die Wiederholungsregel
4. **duration** - (_number_) Dauer jeder einzelnen Instanz
5. **recurring_event_id** - (_string|number_) die ID der übergeordneten Serie; wird nur für geänderte oder gelöschte Vorkommen gesetzt
6. **original_start** - (_datetime_) ursprüngliches Datum eines bearbeiteten Vorkommens; wird nur für geänderte oder gelöschte Instanzen gesetzt
7. **deleted** - (_boolean_) kennzeichnet ein gelöschtes Vorkommen; wird nur für gelöschte Instanzen gesetzt

Die **rrule**-Eigenschaft folgt dem iCalendar-Format gemäß RFC-5545 und gibt Frequenz, Intervall und weitere Wiederholungsdetails an.

### Unterschiede zum iCalendar-Format

Unser Format unterscheidet sich in zwei wesentlichen Punkten vom iCalendar-Format:

#### Separate Speicherung von STDATE und DTEND:

Im iCalendar-Format werden Start- und Enddatum einer wiederkehrenden Serie üblicherweise innerhalb des **RRULE**-Strings als **STDATE** und **DTEND**-Eigenschaften gespeichert. In unserem Format werden **start_date** und **end_date** als separate Felder geführt. Dadurch wird es einfacher, wiederkehrende Ereignisse nach Datum zu suchen und zu bearbeiten, ohne den **RRULE**-String parsen zu müssen.

Hier ein Beispiel für eine wiederkehrende Serie, die jeden Montag vom 1. Juni 2024 bis zum 1. Dezember 2024 wiederholt wird:

~~~
{
  "id": 1,
  "text": "Weekly Team Meeting",
  "start_date": "2024-06-03 09:00:00",
  "duration": 3600,
  "end_date": "2024-12-02 10:00:00",
  "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
  "recurring_event_id": null,
  "original_start": null
}
~~~

#### Umgang mit Ausnahmen

Ausnahmen - also geänderte oder gelöschte Vorkommen - werden als separate Ereignisdatensätze gespeichert, die mit ihrer übergeordneten Serie verknüpft sind. Diese Ausnahme-Datensätze enthalten drei zusätzliche Eigenschaften: **recurring_event_id**, **original_start** und **deleted**. Sie helfen dabei, zu erkennen, welche Instanzen geändert oder entfernt wurden und wie sie zur Hauptserie gehören.

:::note
Im Gegensatz zum Standard-iCalendar-Format werden Ausnahmen (geänderte oder gelöschte Instanzen) **nicht** in der **EXDATE**-Eigenschaft der **RRULE** gespeichert.
:::

Hier ein Beispiel für eine wiederkehrende Serie mit einer geänderten und einer gelöschten Instanz:
~~~
[
  {
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2024-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2024-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
  },
  {
    "id": 2,
    "text": "Special Team Meeting",
    "start_date": "2024-06-10 09:00:00",
    "end_date": "2024-06-10 11:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-10 09:00:00"
  },
  {
    "id": 3,
    "text": "Deleted Team Meeting",
    "start_date": "2024-06-17 09:00:00",
    "end_date": "2024-06-17 10:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-17 09:00:00",
    "deleted": true
  }
]
~~~

Das ursprünglich für `2024-06-10 09:00:00` geplante Ereignis wird durch den Datensatz `Special Team Meeting` ersetzt, während das Ereignis am `2024-06-17 09:00:00` ausgelassen wird.

Beachten Sie, dass die **rrule** von geänderten oder gelöschten Instanzen ignoriert wird.

Auch die Felder **text**, **start_date** und **end_date** von gelöschten Vorkommen haben keine Auswirkung auf das Verhalten des Schedulers.


## Bearbeiten/Löschen einer bestimmten Instanz in der Serie {#editingdeleting-a-certain-occurrence-in-the-series}

Sie können einzelne Vorkommen innerhalb einer wiederkehrenden Serie bearbeiten oder löschen.

### Wichtige Hinweise

- Jede Änderung an einem wiederkehrenden Ereignis erzeugt einen neuen Datensatz in der Datenbank.
- Einzelne Vorkommen sind über die Eigenschaft **recurring_event_id** mit der Hauptserie verknüpft.
- Beim Bearbeiten eines Vorkommens speichert das Feld **original_start** das ursprüngliche Datum der Instanz, nicht das neue Datum. Wird zum Beispiel ein ursprünglich für den 27. Juli 2024 um 15:00 geplantes Vorkommen auf den 30. Juli 2024 um 15:00 verschoben, bleibt **original_start** weiterhin der 27. Juli 2024 um 15:00.


### Serverseitige Logik {#serversideintegration}

Zusätzlich zu den zusätzlichen Feldern sollte der serverseitige Controller folgende Logik umsetzen:

- Wenn eine gelöschte Instanz hinzugefügt wird, muss die Serverantwort einen „deleted"-Status enthalten.
    - Eine gelöschte Instanz wird durch eine nicht-leere **deleted**-Eigenschaft erkannt.
- Wird eine Serie geändert, sollten alle geänderten und gelöschten Vorkommen, die zu dieser Serie gehören, entfernt werden.
    - Eine Serie wird durch eine nicht-leere **rrule** und eine leere **recurring_event_id** identifiziert.
    - Geänderte Vorkommen sind alle Datensätze, bei denen **recurring_event_id** mit der **id** der Serie übereinstimmt.
- Wenn ein Ereignis mit nicht-leerer **recurring_event_id** gelöscht wird, soll es durch Setzen von **deleted="true**" aktualisiert werden, anstatt es zu entfernen.

:::note
Vollständige Codebeispiele finden Sie [hier](integrations/howtostart-guides.md)
:::


## Eigene Steuerung für den Wiederholungsblock der Lightbox {#custom-control-for-the-lightboxs-recurring-block}

Ab Version 4.2 erlaubt dhtmlxScheduler die Definition eines eigenen HTML-Formulars für den „recurring"-Abschnitt der Lightbox.

#### Welche Anpassungen sind möglich?

1. Das Markup des Formulars ändern.
2. Nicht benötigte Elemente entfernen (z. B. die Option „jährlich wiederholen" und die zugehörigen Eingabefelder).
3. Standardwerte für Eingaben festlegen (z. B. immer die Option „kein Enddatum" auswählen und den Block zur Angabe des Endes der Wiederholung ausblenden).

### Anwendungsbeispiel

Hier ein Beispiel, in dem die Optionen „monatlich" und „jährlich" entfernt und die Option „kein Enddatum" standardmäßig gesetzt wird (der Block für das Wiederholungsende wird ausgeblendet).

1. Definieren Sie das Markup Ihres eigenen Formulars an einer beliebigen Stelle auf der Seite (Sie können mit der Standardvorlage aus 'schedulersourceslocalerecurring' beginnen):
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        Repeat every week next days:


       <label><input type="checkbox" name="week_day" value="1" />Monday</label>
       <label><input type="checkbox" name="week_day" value="2" />Tuesday</label>
       <label><input type="checkbox" name="week_day" value="3" />Wednesday</label>
       <label><input type="checkbox" name="week_day" value="4" />Thursday</label>
       <label><input type="checkbox" name="week_day" value="5" />Friday</label>
       <label><input type="checkbox" name="week_day" value="6" />Saturday</label>
       <label><input type="checkbox" name="week_day" value="0" />Sunday</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. Setzen Sie den 'form'-Parameter des 'recurring'-Abschnitts auf die ID Ihres eigenen Formulars: 
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

<div>![custom_recurring_form](/img/custom_recurring_form.png)</div>

### Hauptbestandteile

Die Standard-HTML-Struktur für den wiederkehrenden Block des Lightbox in verschiedenen Sprachen befindet sich im Verzeichnis <b>'schedulersourceslocalerecurring'</b>.


Zum Beispiel verwendet die englische Sprachversion die Datei <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b>.

Der wiederkehrende Block im Lightbox enthält in der Regel 3 Gruppen von Steuerelementen:

1) Steuerelemente zur Auswahl des Wiederholungstyps. Diese Eingabefelder teilen sich den Namen 'repeat' und haben einen der folgenden Werte: 'daily', 'weekly', 'monthly', 'yearly'. 
Das Formular sollte mindestens ein 'repeat'-Eingabefeld mit einem Wert enthalten. Sie können hierzu Radiobuttons, Select-Dropdowns oder einen Standardtyp über ein verstecktes Eingabefeld verwenden.

Hier einige gültige Beispiele zur Auswahl des Wiederholungstyps im Formular:

- Radiobuttons:

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select-Eingabe, ohne die Optionen 'Monthly' und 'Yearly':

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Verstecktes Eingabefeld (dies erstellt nur die 'Daily'-Serie):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) Ein Abschnitt zur Konfiguration der Wiederholungsdetails basierend auf dem gewählten Wiederholungstyp. Zum Beispiel sieht der Block für den Typ 'Daily' wie folgt aus:

~~~html
<div class="dhx_repeat_center">
   <div id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>Every
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />day


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>Every workday
     </label>
  </div>
...
</div>         
~~~

Beachten Sie, dass das Markup, das sich auf einen bestimmten Wiederholungstyp bezieht, in ein div mit einer <b>id</b> im Format <b>"dhx_repeat_&lt;repeat type&gt;"</b> eingeschlossen werden kann, zum Beispiel "dhx_repeat_day". 
Dieser Block ist nur sichtbar, wenn der entsprechende Wiederholungstyp ausgewählt ist.

3) Steuerelemente zur Festlegung des Endzeitpunkts der Wiederholung. Das Eingabefeld hierfür trägt den Namen 'end'. 


Mögliche Werte sind <b>'no'</b>, <b>'date_of_end'</b> und <b>'occurences_count'</b>.

Wie bei den 'repeat'-Steuerelementen muss das Formular mindestens ein Eingabefeld dieses Typs enthalten.

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>No end date
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />After</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />After</label>
    <input type="text" name="occurences_count" value="1" />Occurrences
</div>
~~~

Für den Modus <b>'date_of_end'</b> sollte das Datum in ein Eingabefeld mit dem Namen 'date_of_end' eingetragen werden. Ebenso wird beim Modus <b>'occurences_count'</b> die Anzahl der Wiederholungen aus einem Eingabefeld mit dem Namen 'occurences_count' übernommen. 


Sie können jeden Wiederholungstyp entfernen oder ihn im Voraus über ein verstecktes Eingabefeld festlegen:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2024" />
~~~
  
### Hinweise zur Änderung des wiederkehrenden Blocks

Bevor Sie den wiederkehrenden Block des Lightbox anpassen, beachten Sie bitte folgende Punkte:

1. Das 'name'-Attribut ist für alle Eingabefelder festgelegt; Felder mit anderen Namen werden ignoriert. 
2. Das 'value'-Attribut ist für alle Eingabefelder festgelegt, außer bei solchen, die für direkte Benutzereingaben vorgesehen sind. 
3. Wenn Sie ein neues Formular bereitstellen, verwendet dhtmlxScheduler dieses nicht direkt, sondern repliziert Ihre HTML-Struktur innerhalb der Lightbox-Vorlage. 
Das bedeutet, dass eventuelle Event-Handler oder benutzerdefinierte Eigenschaften, die Sie an die DOM-Elemente Ihres Formulars angehängt haben, in der Lightbox nicht angewendet werden. 
Um Event-Handler hinzuzufügen, müssen Sie diese entweder als Inline-HTML-Attribute einfügen oder sie anbringen, wenn das Formular in der Lightbox angezeigt wird.

:::note
Beachten Sie, dass dhtmlxScheduler nicht mit Ihrem ursprünglichen HTML-Formular arbeitet, sondern eine Kopie davon innerhalb der Lightbox-Vorlage erstellt.
:::

Zum Beispiel:

- Diese Zeile wird in die Lightbox kopiert:

~~~html
<input onclick="handler()"> 
~~~

- Aber dies wird nicht kopiert:

~~~js
addEventListener(node, "click", function(){...})
~~~

## Legacy-Format für wiederkehrende Ereignisse {#legacyformatofrecurringevents}

Bis Version 7.1 verwendete der Scheduler ein eigenes Format für wiederkehrende Ereignisse. Details zu diesem Format finden Sie [hier](guides/recurring-events-legacy.md).
