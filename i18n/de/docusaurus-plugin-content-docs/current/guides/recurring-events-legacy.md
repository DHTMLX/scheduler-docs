--- 
title: "Wiederkehrende Ereignisse (bis v7.1)" 
sidebar_label: "Wiederkehrende Ereignisse (bis v7.1)" 
--- 

# Wiederkehrende Ereignisse (bis v7.1)

*Der Artikel bezieht sich auf das Legacy-Format wiederkehrender Ereignisse für den DHTMLX Scheduler. Wenn Sie DHTMLX Scheduler v7.1+ verwenden, sehen Sie die Details zur aktuellen Version [hier](guides/recurring-events.md).*

Standardmäßig unterstützt der Scheduler keine wiederkehrenden Ereignisse. Um solche Unterstützung zu aktivieren, müssen Sie eine spezielle Erweiterung auf der Seite aktivieren - **recurring_legacy**. 


~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~


Sobald die Unterstützung für wiederkehrende Ereignisse aktiviert ist, sieht das Lightbox wie unten aus: 


![recurring_lightbox_legacy](/img/recurring_lightbox_legacy.png)


## Konfigurationsoptionen

Die Bibliothek bietet folgende Optionen zur Konfiguration wiederkehrender Ereignisse:

- [repeat_date](api/config/repeat_date.md) - legt das Datumsformat des Feldes 'End by' im 'recurring' Lightbox-Fenster fest
- [include_end_by](api/config/include_end_by.md) - definiert, ob das im Feld 'End by' angegebene Datum exklusiv oder inklusiv sein soll
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - definiert das Verhalten der Wiederholungen, die in den nächsten Monat übergehen
- [repeat_precise](api/config/repeat_precise.md) - verhindert das Einbeziehen vergangener Tage bei Ereignissen mit der 'weekly'-Wiederholung
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - ermöglicht das Arbeiten mit wiederkehrenden Ereignissen unabhängig von Zeitzonen

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' Lightbox

Standardmäßig hat die Lightbox, sobald die wiederkehrende Erweiterung aktiviert ist, einen weiteren Abschnitt - "Repeat event". 
Und die Standarddefinition der 'recurring' Lightbox beginnt wie folgt:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Sie können beliebige zusätzliche Abschnitte hinzufügen, aber müssen sowohl den "recurring"- als auch den "time"-Abschnitt beibehalten. 
Außerdem muss der "time"-Abschnitt **nach** dem "recurring"-Abschnitt platziert werden. 


[Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Server-seitige Integration 

Ein wiederkehrendes Ereignis wird in der Datenbank als ein einzelner Datensatz gespeichert, der alle Felder eines regulären Ereignisses plus 3 zusätzliche enthält: 

1. **rec_type** - (_varchar_) definiert die Logik der Wiederholung. Dieses Feld wird automatisch ausgefüllt
2. **event_length** - (_long int_) die tatsächliche Zeitlänge eines Ereignisses in Sekunden
3. **event_pid** - (_int_) die Eltern-ID einer Serie von Ereignissen

Daraus sollte Ihr Backend wiederkehrende Felder zusammen mit regulären Ereignisfeldern zurückgeben, zum Beispiel:

~~~js
{
  "id": 1,
  "start_date": "2027-01-03 10:00:00",
  "end_date": "2027-01-13 00:00:00",
  "text": "some_text",
  "rec_type": "day_1___",
  "event_length": 7200,
  "event_pid": 0
}
~~~

Im üblichen Fall können Sie neben den Pflichtfeldern weitere Daten aus der DB extrahieren.

Allerdings ändern sich die Bedeutungen der Felder **start_date** und **end_date** leicht:


- **start_date** - der Starttermin des ersten Ereignisses in einer Serie im Format 'yyyy-mm-dd hh:mm:ss' (settings_format.md).
- **end_date** - das Enddatum des letzten Ereignisses in einer Serie im Format 'yyyy-mm-dd 00:00:00' (settings_format.md).

Beispiel: Ein wiederkehrendes Ereignis, das am 3. Januar 2027 um 10:00 beginnt, jeden Tag wiederholt und am 13. Januar 2027 um 12:00 endet, wird in der Datenbank wie folgt dargestellt:


~~~js
id:1,
start_date:"2027-01-03 10:00:00",
end_date:"2027-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" //0 für die Elternevents oder die ID der Eltern-Events für Unter-Ereignisse
~~~

Der Client-Seite erhält Daten aus dem **rec_type**-Feld als String im folgenden Format:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

wobei:

- *type* - der Typ der Wiederholung: 'day','week','month','year'.
- *count* - das Intervall zwischen den Ereignissen in den jeweiligen 'type'-Einheiten.
- *day* und *count2* - definieren einen Tag eines Monats (erster Montag, dritter Freitag, usw.).
- *days* - eine durch Kommas getrennte Liste betroffener Wochentage.
- *extra* - zusätzliche Informationen, die verwendet werden können, um die Darstellung der Wiederholungsdetails zu ändern.

Beispiele der **rec_type**-Daten:


- *"day_3___"* - alle drei Tage
- *"month _2___"* - alle zwei Monate
- *"month_1_1_2_"* - zweiter Montag eines jeden Monats
- *"week_2___1,5"* - Montag und Freitag der zweiten Woche 
  
*Der Doppel- oder Dreifach-Unterstrich zeigt an, dass die zugehörigen Parameter des Strings ausgelassen wurden*.

## Parsing der Serien im Backend

Ein wiederkehrendes Ereignis wird in der Datenbank als ein einzelner Datensatz gespeichert, der vom Scheduler auf dem Client-Seite zerlegt werden kann.
Wenn Sie Datumsangaben einzelner Ereignisse auf der Serverseite erhalten möchten, verwenden Sie eine Hilfsbibliothek zur Parser-Verarbeitung von wiederkehrenden Ereignissen des dhtmlxScheduler auf ASP.NET/ASP.NET Core/PHP. 

Sie finden die fertigen Bibliotheken auf unserem GitHub:

- [für ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [für PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## Bearbeiten/Löschen eines bestimmten Vorkommnisses in der Serie

Es besteht die Möglichkeit, ein bestimmtes Vorkommnis in einer Serie zu löschen oder zu bearbeiten. 

### Wichtige Tipps

- Für jedes Update des wiederkehrenden Ereignisses wird ein separater Datensatz in der DB erstellt.
- Bestimmte Vorkommnisse verweisen auf das Elternevent über die Eigenschaft **event_pid**.
- Sobald Sie ein Vorkommnis in der Serie bearbeitet haben, speichert das Feld **event_length** für dieses Update den Zeitstempel des Datums, wann das Vorkommnis auftreten sollte, wenn es nicht bearbeitet wurde, anstelle der tatsächlichen Ereignislänge.  
  Wenn das Vorkommnis also am 27. Juli 2027 um 15:00 stattgefunden hat und auf den 30. Juli 2027 um 15:00 verschoben wurde, würde der Zeitstempel das ursprüngliche Datum widerspiegeln.  
 Der Zeitstempel wird in Sekunden seit der UNIX-Epoche gemessen.
- Beachten Sie, dass, falls Ihre DB Datensätze bearbeiteter Vorkommnisse in der Serie enthält und Sie entscheiden, die Serie über das Lightbox auf 'Edit series' zu bearbeiten, alle gespeicherten Datensätze nach dem Speichern gelöscht werden. 
 Der einzige Datensatz, der verbleibt, ist das Haupt-Wiederholungs-Ereignis, während seine Vorkommnisse ihre Unterschiede verlieren (sie werden identisch).

### Nehmen wir ein Beispiel

Sie sind Fan der Olympischen Spiele und möchten die kommenden Londoner Olympischen Spiele 2027 (27. Juli - 12. August) so oft wie möglich sehen. 
Sie entscheiden sich also, ein wiederkehrendes Ereignis zu erstellen, das *um 17:00 beginnt* (das Ende Ihres Arbeitstages) und *bis 23:00 geht* (die Zeit, zu der Sie schlafen gehen). 
Da die Eröffnungszeremonie *erst um 19:00 beginnt*, möchten Sie das erste Vorkommnis der Serie an diesem Tag bearbeiten und den Zeitraum *von 19:00 bis 23:00* festlegen. 
Sie erinnern sich außerdem, dass am *1. August 2027* eine Frist ist und Sie vermutlich zu spät zu Hause sein werden, um etwas zu sehen. 
Sie müssen also auch *den 1. August 2027* aus der Serie löschen. 

#### Kurz gesagt, Ihre Aktionen sind:

1. Ein wiederkehrendes Ereignis **_(17.00-23.00)_** vom **27.07.2027** bis **12.08.2027** erstellen.
2. Ein bestimmtes Vorkommnis am **27.07.2027** bearbeiten - den Zeitraum **von 17.00-23.00 auf 19.00-23.00** ändern.
3. Ein bestimmtes Vorkommnis am **01.08.2027** aus der Serie löschen.

In der Folge sollten wir 3 Datensätze haben, die auf unser wiederkehrendes Ereignis in der DB verweisen.

#### Was passiert in der DB, wenn wir Schritt für Schritt vorgehen:

Erstellen des wiederkehrenden Ereignisses:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

Bearbeiten vom 27.07.2027:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

Löschen des 01.08.2027: 

![delete_an_occurrence.png](/img/delete_an_occurrence.png)


### Server-seitige Logik 

Neben zusätzlichen Feldern muss eine spezifische Logik in den Server-seitigen Controller eingefügt werden:

- Wenn ein Ereignis mit **rec_type==none** eingefügt wurde - die Antwort muss den Status "deleted" haben.
- Wenn ein Ereignis mit **rec_type!=none** aktualisiert oder gelöscht wurde - müssen alle Datensätze mit dem entsprechenden **event_pid** gelöscht werden.
- Wenn ein Ereignis mit dem Wert von **event_pid** gelöscht wurde - muss es mit **rec_type==none** statt löschen aktualisiert werden.

:::note
Sie finden vollständige Codebeispiele [hier](integrations/howtostart-guides.md)
:::

Implementieren Sie diese Logik in Ihrem Backend-Controller oder -Service, um wiederkehrende Serien und Ausnahmen konsistent zu halten.

## Dragging all sequence

Um den Benutzern die Möglichkeit zu geben, die gesamte Sequenz beim Ziehen wiederkehrender Ereignisse zu verschieben, fügen Sie vor der Scheduler-Initialisierung den folgenden Code hinzu:

~~~js
scheduler.attachEvent("onBeforeEventChanged",function(dev){
    let parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          let series = this.getEvent(parts[0]);

          series.start_date.setHours(dev.start_date.getHours());
          series.start_date.setMinutes(dev.start_date.getMinutes());
          series.event_length = (dev.end_date - dev.start_date) / 1000;

          setTimeout(function(){
               scheduler.addEvent(series);
          }, 1);

          return false;
     }
     return true;
});
~~~

## Custom control for the lightbox's recurring block

Ab Version 4.2 erlaubt dhtxmlScheduler Ihnen, ein benutzerdefiniertes HTML-Formular für den 'recurring'-Block der Lightbox anzugeben.

#### Welche Anpassungen können Sie vornehmen?

1. Das Markup des Formulars ändern
2. Unnötige Elemente löschen (z. B. den 'yearly' Wiederholungs-Typ und alle zugehörigen Eingaben)
3. Standardwerte für Eingaben festlegen (z. B. Sie möchten, dass alle Serien mit 'no end date' erstellt werden. Dann setzen Sie die Option 'no end date' standardmäßig aktiviert und verstecken den ganzen Block, der das Rekurrenz-Ende festlegt.)

### Anwendungsbeispiel

Lassen Sie uns mit einem Beispiel beginnen. Stellen Sie sich vor, Sie möchten die 'monatlich' und 'jährlich' Wiederholungsarten entfernen und die Option 'no end date' für alle Ereignisse haben (d. h. den Block zum Festlegen des Rekurrenz-Endes entfernen).

1. Definieren Sie das Markup eines benutzerdefinierten Formulars und platzieren Sie es irgendwo auf der Seite (Sie können damit beginnen, das Standard-Template zu kopieren, das sich im <b>'schedulersourceslocalerecurring'</b>-Verzeichnis befindet):
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
      <div style="display:none;" id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div style="display:none;" id="dhx_repeat_week">
        Wiederhole jede Woche folgende Tage:
       <label><input type="checkbox" name="week_day" value="1" />Montag</label>
       <label><input type="checkbox" name="week_day" value="2" />Dienstag</label>
       <label><input type="checkbox" name="week_day" value="3" />Mittwoch</label>
       <label><input type="checkbox" name="week_day" value="4" />Donnerstag</label>
       <label><input type="checkbox" name="week_day" value="5" />Freitag</label>
       <label><input type="checkbox" name="week_day" value="6" />Samstag</label>
       <label><input type="checkbox" name="week_day" value="0" />Sonntag</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. Setzen Sie den 'form'-Parameter des 'recurring'-Bereichs auf die ID Ihres benutzerdefinierten Formulars: 
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

<div style="text-align:center;">![custom_recurring_form_legacy](/img/custom_recurring_form_legacy.png)</div>

### Hauptteile

Sie finden die Standard-HTML-Struktur des Lightbox-Recurrings-Blocks für verschiedene Sprachen im Verzeichnis <b>'schedulersourceslocalerecurring'</b>.

Beispielsweise, für die englische Lokalisierung, sehen Sie die Datei <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b>.

Grundsätzlich enthält der Recurring-Block des Lightbox drei Kontrollgruppen:

1) Kontrollen zur Auswahl des Wiederholungstyps. Diese Eingaben haben den Namen 'repeat' und einen der folgenden Werte: 'daily', 'weekly', 'monthly', 'yearly'.
Das Formular muss mindestens eine 'repeat'-Eingabe mit dem Wert enthalten. Sie können Radiobuttons, Auswahlfelder verwenden oder den Standardtyp im versteckten Input festlegen.

Betrachten Sie die folgenden Beispiele; jeder davon ist eine gültige Methode zur Auswahl des Wiederholungstyps im Formular. 

- Radiobuttons

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select-Eingabe, ohne 'Monthly' und 'Yearly'-Optionen:

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Versteckte Eingabe (das Lightbox erstellt nur 'Daily'-Serie):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) Ein Block zur Konfiguration der Rekurrenz je nach Typ. Beispielsweise für den Wiederholungstyp 'Daily' hat der Block folgende Struktur:

~~~html
<div class="dhx_repeat_center">
   <div style="display:none;" id="dhx_repeat_day">
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

Beachten Sie, dass das Markup, das sich auf eine bestimmte Wiederholungstyp bezieht, in einem div mit der <b>id</b> im folgenden Format eingeschlossen werden kann `dhx_repeat_<repeat type>`, z. B. "dhx_repeat_day".
In diesem Fall wird es nur angezeigt, wenn der entsprechende Wiederholungstyp ausgewählt ist.

3) Kontrollen zum Festlegen des Endes der Rekurrenz. Das Ende der Rekurrenz wird durch ein Eingabefeld mit dem Namen 'end' definiert.

Mögliche Werte sind <b>'no'</b>, <b>'date_of_end'</b>, <b>'occurences_count'</b>.

Analog zu den 'repeat'-Kontrollen muss das Formular mindestens eine Eingabe dieses Typs enthalten.

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

The date for the <b>'date_of_end'</b> mode must be defined in an input named 'date_of_end'. The same works for the <b>'occurences_count'</b> mode, 
that takes the number of occurrences from an input named 'occurences_count'.

You can remove any type or predefine it in a hidden input:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2027" />
~~~ 
  
### Hinweise zur Änderung des Recurring-Blocks

Bitte, bevor Sie mit der Anwendung einer benutzerdefinierten Konfiguration für den Lightbox-Rekurrenzblock beginnen, beachten Sie Folgendes: 

1. Das 'name'-Attribut ist für alle Eingaben fest codiert - Eingaben mit anderen Namen werden ignoriert.
2. Das 'value'-Attribut ist festgelegt für alle Eingaben, außer bei solchen, die direkte Eingaben implizieren.
3. Wenn Sie ein neues Formular angeben - dhtmlxScheduler verwendet es nicht direkt und repliziert lediglich Ihre HTML-Struktur in das Lightbox-Template.
Es bedeutet, dass alle Event-Handler oder benutzerdefinierten Eigenschaften, die an DOMElements Ihres Formulars vom Code angehängt wurden, nicht auf das Formular im Lightbox angewendet werden.
Wenn Sie Ereignishandler anhängen möchten, müssen Sie ihn entweder als Inline-HTML-Attribut angeben oder einen Handler hinzufügen, wenn es im Lightbox angezeigt wird.

:::note
Beachten Sie, dhtmlxScheduler arbeitet nicht mit Ihrem ursprünglichen HTML-Formular und erstellt einfach eine Kopie in dem Lightbox-Template.
:::

Beispiel:

- Die folgende Zeile wird in die Lightbox kopiert:

~~~html
<input onclick="handler()"> 
~~~

- Die folgende Zeile wird nicht in die Lightbox kopiert:

~~~js
addEventListener(node, "click", function(){...})
~~~