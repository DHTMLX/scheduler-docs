---
title: "Wiederkehrende Ereignisse (bis v7.1)"
sidebar_label: "Wiederkehrende Ereignisse (bis v7.1)"
---

# Wiederkehrende Ereignisse (bis v7.1)

*Dieser Artikel behandelt das Legacy-Format für wiederkehrende Ereignisse im DHTMLX Scheduler. Informationen zur aktuellen Version ab DHTMLX Scheduler v7.1+ finden Sie [hier](guides/recurring-events.md).*

Standardmäßig unterstützt der Scheduler keine wiederkehrenden Ereignisse. Um diese Funktionalität hinzuzufügen, müssen Sie eine spezielle Erweiterung namens **recurring_legacy** auf Ihrer Seite aktivieren.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

Sobald die Unterstützung für wiederkehrende Ereignisse aktiviert ist, enthält die Lightbox einen zusätzlichen Abschnitt wie unten dargestellt:

![recurring_lightbox](/img/recurring_lightbox.png)

## Konfigurationsoptionen

Die Bibliothek bietet verschiedene Optionen zur Konfiguration wiederkehrender Ereignisse:

- [repeat_date](api/config/repeat_date.md) - steuert das Datumsformat für das Feld 'Ende am' in der 'wiederkehrenden' Lightbox
- [include_end_by](api/config/include_end_by.md) - legt fest, ob das Datum im Feld 'Ende am' inklusive oder exklusiv ist
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - regelt, wie Wiederholungen, die in den nächsten Monat überlaufen, behandelt werden
- [repeat_precise](api/config/repeat_precise.md) - verhindert die Einbeziehung vergangener Termine bei wöchentlicher Wiederholung
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - ermöglicht das Arbeiten mit wiederkehrenden Ereignissen unabhängig von Zeitzonen

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Wiederkehrend'-Lightbox

Nach Aktivierung der recurring-Erweiterung erhält die Lightbox einen zusätzlichen Abschnitt namens "Repeat event". Die Standardkonfiguration der 'wiederkehrenden' Lightbox sieht wie folgt aus:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Sie können bei Bedarf weitere Abschnitte hinzufügen, aber die Abschnitte "recurring" und "time" müssen erhalten bleiben. Außerdem sollte der Abschnitt "time" immer **nach** dem Abschnitt "recurring" stehen.


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Server-seitige Integration 

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Datensatz gespeichert, der alle üblichen Ereignisfelder sowie drei zusätzliche enthält:

1. **rec_type** - (_varchar_) definiert das Wiederholungsmuster; dieses Feld wird automatisch ausgefüllt
2. **event_length** - (_long int_) die Dauer des Ereignisses in Sekunden
3. **event_pid** - (_int_) die Eltern-ID für eine Serie von Ereignissen

Eine typische Connector-Abfrage könnte folgendermaßen aussehen:

~~~php
$scheduler->render_table("events_rec","event_id",
"start_date,end_date,text,rec_type,event_pid,event_length");
~~~

Neben diesen Pflichtfeldern können Sie beliebige weitere Daten aus Ihrer Datenbank abrufen.

Beachten Sie, dass die Bedeutungen von **start_date** und **end_date** hier leicht abweichen:

- **start_date** - das Startdatum des ersten Ereignisses der Serie im Format 'yyyy-mm-dd hh:mm:ss' (siehe [Datumsformat-Spezifikation](guides/settings-format.md)).
- **end_date** - das Enddatum des letzten Ereignisses der Serie im Format 'yyyy-mm-dd 00:00:00' (siehe [Datumsformat-Spezifikation](guides/settings-format.md)).

Beispielsweise würde ein wiederkehrendes Ereignis, das am 3. Januar 2019 um 10:00 Uhr beginnt, sich täglich wiederholt und am 13. Januar 2019 um 12:00 Uhr endet, wie folgt gespeichert werden:

~~~js
id:1,
start_date:"2019-01-03 10:00:00",
end_date:"2019-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" // 0 für Hauptereignisse oder die Eltern-ID für Unterereignisse
~~~

Auf der Client-Seite enthält das Feld **rec_type** einen String im folgenden Format:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

wobei:

- *type* - Typ der Wiederholung: 'day','week','month','year'.
- *count* - Intervall zwischen den Ereignissen in den angegebenen Typ-Einheiten.
- *day* und *count2* - spezifizieren einen bestimmten Tag im Monat (z.B. erster Montag, dritter Freitag).
- *days* - kommaseparierte Liste der betroffenen Wochentage.
- *extra* - zusätzliche Informationen, die beeinflussen können, wie die Details der Wiederholung angezeigt werden.

Einige Beispiele für **rec_type**-Werte:

- *"day_3___"* - alle drei Tage
- *"month_2___"* - alle zwei Monate
- *"month_1_1_2_"* - zweiter Montag jedes Monats
- *"week_2___1,5"* - montags und freitags jede zweite Woche

*Hinweis: Doppelte oder dreifache Unterstriche bedeuten, dass diese Parameter ausgelassen werden.*

## Serien im Backend parsen

Wiederkehrende Ereignisse werden als einzelne Datensätze in der Datenbank gespeichert, die vom Scheduler clientseitig aufgeteilt werden können. Wenn Sie einzelne Vorkommensdaten auf der Serverseite benötigen, stehen Hilfsbibliotheken für das Parsen wiederkehrender Ereignisse in ASP.NET/ASP.NET Core und PHP zur Verfügung.

Diese Bibliotheken finden Sie auf GitHub:

- [ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## Bearbeiten/Löschen eines bestimmten Vorkommens in der Serie 

Es ist möglich, einzelne Vorkommen innerhalb einer wiederkehrenden Serie zu bearbeiten oder zu löschen.

### Wichtige Hinweise

- Jede Aktualisierung eines wiederkehrenden Ereignisses erzeugt einen separaten Datensatz in der Datenbank.
- Einzelne Vorkommen verweisen über die Eigenschaft **event_pid** auf das Hauptereignis zurück.
- Beim Bearbeiten eines Vorkommens speichert das Feld **event_length** den Zeitstempel, zu dem das Vorkommen ursprünglich stattgefunden hätte, falls es nicht geändert worden wäre, und nicht die tatsächliche Ereignisdauer. Zum Beispiel: Wenn ein Vorkommen, das ursprünglich für den 27. Juli 2019 um 15:00 Uhr geplant war, auf den 30. Juli 2019 um 15:00 Uhr verschoben wird, spiegelt der Zeitstempel den 27. Juli 2019 um 15:00 Uhr wider. Dieser Zeitstempel ist in Sekunden seit dem UNIX-Epoch.
- Wenn Ihre Datenbank bearbeitete Vorkommen enthält und Sie über die Lightbox auf 'Serie bearbeiten' klicken, werden nach dem Speichern alle gespeicherten bearbeiteten Vorkommen gelöscht. Nur der Haupteintrag für das wiederkehrende Ereignis bleibt erhalten und die einzelnen Vorkommen verlieren ihre individuellen Änderungen.

### Beispiel-Szenario

Stellen Sie sich vor, Sie sind ein Fan der Olympischen Spiele und möchten die Olympischen Spiele in London 2012 (*27. Juli - 12. August*) so oft wie möglich verfolgen. Sie erstellen ein wiederkehrendes Ereignis, das um 17:00 Uhr beginnt (Ende Ihres Arbeitstags) und um 23:00 Uhr endet (Ihre Schlafenszeit). Da die Eröffnungsfeier jedoch um 19:00 Uhr beginnt, möchten Sie das erste Vorkommen auf 19:00-23:00 Uhr ändern. Außerdem wissen Sie, dass Sie am 1. August 2012 eine Deadline haben und wahrscheinlich nichts anschauen werden, weshalb Sie das Vorkommen dieses Tages aus der Serie löschen möchten.

#### Zusammenfassung der Aktionen:

1. Erstellen Sie ein wiederkehrendes Ereignis **(17:00-23:00)** vom **27. Juli 2012** bis **12. August 2012**.
2. Bearbeiten Sie das Vorkommen am **27. Juli 2012**, um die Zeit auf **19:00-23:00** zu ändern.
3. Löschen Sie das Vorkommen am **1. August 2012** aus der Serie.

Dies führt zu 3 Datensätzen, die mit dem wiederkehrenden Ereignis in der Datenbank verbunden sind.

#### Was passiert in der Datenbank Schritt für Schritt:

Erstellung des wiederkehrenden Ereignisses:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

Bearbeiten von **27. Juli 2012**:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

Löschen von **1. August 2012**: 

![delete_an_occurrence.png](/img/delete_an_occurrence.png)

### Server-seitige Logik 

Zusätzlich zu den extra Feldern muss der Server-Controller einige spezielle Logik abdecken:

- Wenn ein Ereignis mit **rec_type == none** eingefügt wird, sollte die Antwort einen "deleted"-Status angeben.
- Wenn ein Ereignis mit **rec_type != none** aktualisiert oder gelöscht wird, müssen alle Datensätze mit dem entsprechenden **event_pid** gelöscht werden.
- Wird ein Ereignis mit einer ungleich null **event_pid** gelöscht, sollte es stattdessen auf **rec_type == none** aktualisiert werden, anstatt gelöscht zu werden.

:::note
Vollständige Codebeispiele finden Sie [hier](integrations/howtostart-guides.md)
:::

Wenn Sie den [PHP Connector](https://github.com/DHTMLX/connector-php) verwenden, könnte der serverseitige Code wie folgt aussehen:

~~~php
function delete_related($action){
    global $scheduler;
    
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    $pid = $action->get_value("event_pid");
    // Wenn die Serie geändert oder gelöscht wurde, entferne alle verknüpften Ereignisse
    if (($status == "deleted" || $status == "updated") && $type != ""){
        $scheduler->sql->query("DELETE FROM events_rec WHERE 
        event_pid='" . $scheduler->sql->escape($action->get_id()) . "'");
    }
    if ($status == "deleted" && $pid != 0){
        $scheduler->sql->query("UPDATE events_rec SET rec_type='none' WHERE 
        event_id='" . $scheduler->sql->escape($action->get_id()) . "'");
        $action->success();
    }
}
function insert_related($action){
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    if ($status == "inserted" && $type == "none")
        $action->set_status("deleted");
}

$scheduler->event->attach("beforeProcessing","delete_related");
$scheduler->event->attach("afterProcessing","insert_related");
~~~

## Die gesamte Serie verschieben 

Um Nutzern das Verschieben der gesamten Serie wiederkehrender Ereignisse per Drag & Drop zu ermöglichen, fügen Sie vor der Initialisierung des Schedulers folgenden Code hinzu:

~~~js
scheduler.attachEvent("onBeforeEventChanged", function(dev){
    var parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          var series = this.getEvent(parts[0]);

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

## Benutzerdefinierte Steuerung für den wiederkehrenden Block der Lightbox

Ab Version 4.2 erlaubt dhtmlxScheduler die Anpassung des HTML-Formulars, das im 'recurring'-Block der Lightbox verwendet wird.

#### Was kann angepasst werden?

1. Das Markup des Formulars ändern
2. Nicht benötigte Elemente entfernen (zum Beispiel den Wiederholungstyp 'jährlich' und die zugehörigen Eingabefelder)
3. Standardwerte für Eingabefelder setzen (zum Beispiel die Option 'kein Enddatum' automatisch aktivieren und den Block für das Wiederholungsende ausblenden, sodass alle Serien ohne Enddatum erstellt werden)

### Anwendungsbeispiel

Beginnen wir mit einem Beispiel. Angenommen, Sie möchten die Optionen „monatlich" und „jährlich" für Wiederholungen entfernen und die Auswahl „kein Enddatum" für alle Ereignisse verfügbar lassen (das bedeutet, dass der Abschnitt zur Festlegung des Endes der Wiederholung entfernt wird).

1. Definieren Sie zunächst das Markup für ein benutzerdefiniertes Formular und platzieren Sie es irgendwo auf Ihrer Seite (Sie können mit einer Kopie der Standardvorlage aus 'schedulersourceslocalerecurring' beginnen):
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Täglich</option>
        <option value="week">Wöchentlich</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        Wiederhole jede Woche an folgenden Tagen:


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
2. Weisen Sie anschließend den 'form'-Parameter des 'recurring'-Abschnitts der ID Ihres benutzerdefinierten Formulars zu:
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

Das Standard-HTML-Layout des Wiederholungsblocks der Lightbox in verschiedenen Sprachen finden Sie im Ordner <b>'schedulersourceslocalerecurring'</b>.


Für die englische Sprache sehen Sie sich zum Beispiel die Datei <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b> an.

Im Allgemeinen besteht der Wiederholungsblock in der Lightbox aus 3 Hauptgruppen von Steuerelementen:

1) Steuerelemente zur Auswahl des Wiederholungstyps. Diese Eingaben sollten den Namen 'repeat' und einen der folgenden Werte haben: 'daily', 'weekly', 'monthly', 'yearly'.
Ihr Formular muss mindestens ein 'repeat'-Eingabefeld mit einem Wert enthalten. Sie können Radiobuttons, Selects oder sogar ein verstecktes Eingabefeld verwenden, um den Standardtyp festzulegen.

Hier sind einige gültige Beispiele, wie Sie den Wiederholungstyp im Formular auswählen können:

- Radiobuttons

~~~html
<label><input type="radio" name="repeat" value="day" />Täglich</label>


<label><input type="radio" name="repeat" value="week"/>Wöchentlich</label>


<label><input type="radio" name="repeat" value="month" />Monatlich</label>


<label><input type="radio" name="repeat" value="year" />Jährlich</label>
~~~

- Select-Eingabe, ohne die Optionen 'Monatlich' und 'Jährlich':

~~~html
<select name="repeat">
  <option value="day">Täglich</option>
  <option value="week">Wöchentlich</option>
</select>
~~~

- Verstecktes Eingabefeld (dadurch werden im Lightbox nur tägliche Serien erstellt):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) Ein Abschnitt zur Konfiguration der Wiederholung basierend auf dem Wiederholungstyp. Zum Beispiel sieht das Markup für den Typ 'Täglich' so aus:

~~~html
<div class="dhx_repeat_center">
   <div id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>Jeden
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />Tag


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>Jeden Werktag
     </label>
  </div>
...
</div>
         
~~~

Beachten Sie, dass Markup, das sich auf einen bestimmten Wiederholungstyp bezieht, in ein div mit einer <b>id</b> im Format <b>"dhx_repeat_&lt;repeat type&gt;"</b> eingeschlossen werden kann, z. B. "dhx_repeat_day".
Dadurch wird es nur angezeigt, wenn der entsprechende Wiederholungstyp ausgewählt ist.

3) Steuerelemente zum Festlegen des Endes der Wiederholung. Dies wird durch Eingaben mit dem Namen 'end' definiert. 


Mögliche Werte sind <b>'no'</b>, <b>'date_of_end'</b> und <b>'occurences_count'</b>.

Wie bei den 'repeat'-Steuerelementen sollte Ihr Formular mindestens eine Eingabe dieses Typs enthalten.

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>Kein Enddatum
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />Nach</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />Nach</label>
    <input type="text" name="occurences_count" value="1" />Vorkommen
</div>
~~~

Das Datum für die Option <b>'date_of_end'</b> sollte in ein Eingabefeld mit dem Namen 'date_of_end' eingetragen werden. Ebenso nimmt die Option <b>'occurences_count'</b> die Anzahl der Wiederholungen aus einem Eingabefeld mit dem Namen 'occurences_count'.


Sie können jede Option entfernen oder sie standardmäßig per verstecktem Eingabefeld festlegen:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2016" />
~~~
  
### Hinweise zur Anpassung des Wiederholungsblocks

Bevor Sie den Wiederholungsblock der Lightbox anpassen, beachten Sie bitte folgende Punkte:

1. Das Attribut 'name' ist für alle Eingaben festgelegt - Eingaben mit anderen Namen werden ignoriert.
2. Das Attribut 'value' ist für alle Eingaben festgelegt, außer bei denen, die eine direkte Benutzereingabe erfordern.
3. Wenn Sie ein neues Formular bereitstellen, verwendet dhtmlxScheduler dieses nicht direkt - stattdessen kopiert es Ihre HTML-Struktur in das Template der Lightbox.
Das bedeutet, dass alle Event-Handler oder benutzerdefinierten Eigenschaften, die an die DOM-Elemente Ihres Originalformulars angehängt wurden, nicht in die Lightbox übernommen werden.
Wenn Sie Event-Handler hinzufügen möchten, sollten Sie diese entweder als Inline-HTML-Attribute einfügen oder beim Anzeigen der Lightbox an das Formular anhängen.

:::note
Beachten Sie, dass dhtmlxScheduler nicht direkt mit Ihrem Original-HTML-Formular arbeitet, sondern eine Kopie davon im Template der Lightbox erstellt.
:::

Zum Beispiel:

- Diese Zeile wird in die Lightbox kopiert:

~~~html
<input onclick="handler()"> 
~~~

- Aber diese nicht:

~~~js
addEventListener(node, "click", function(){...})
~~~
