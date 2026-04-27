---
title: "Wiederkehrende Ereignisse"
sidebar_label: "Wiederkehrende Ereignisse"
---

# Wiederkehrende Ereignisse

Wiederkehrende Ereignisse sind eine gängige Funktion in Kalenderanwendungen, die es Nutzern ermöglicht, Ereignisse zu erstellen, die in festgelegten Intervallen wiederkehren. Ab Version 7.1 verwendet der Scheduler ein RFC-5545-basiertes Format für wiederkehrende Ereignisse.

Dieser Artikel erläutert, wie man wiederkehrende Ereignisse im Scheduler verwendet und wie sie in der Datenbank gespeichert werden.

:::note
Die Beschreibung des Legacy-Formats für wiederkehrende Ereignisse finden Sie [hier](guides/recurring-events-legacy.md)
:::

Standardmäßig unterstützt der Scheduler keine wiederkehrenden Ereignisse. Um eine solche Unterstützung bereitzustellen, muss eine spezielle Erweiterung auf der Seite aktiviert werden – **recurring**: 

~~~js
scheduler.plugins({
    recurring: true
});
~~~

Sobald die Unterstützung für wiederkehrende Ereignisse aktiviert ist, sieht das Lightbox-Fenster wie unten dargestellt aus: 

![recurring_lightbox](/img/recurring_lightbox.png)


## Konfigurationsoptionen

Die Bibliothek bietet folgende Option zur Konfiguration wiederkehrender Ereignisse:

- [repeat_date](api/config/repeat_date.md) - legt das Datumsformat des Feldes 'Ende bis' im 'recurring' Lightbox fest


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring'-Lightbox

Standardmäßig hat das Lightbox-Fenster nach Aktivieren der Erweiterung einen zusätzlichen Abschnitt – "Wiederhole Ereignis".
Und die Standarddefinition des 'recurring'-Lightboxes beginnt wie folgt:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Formatbeschreibung

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Datensatz gespeichert, der alle Felder eines regulären Ereignisses plus mehrere zusätzliche Eigenschaften enthält: 

1. **start_date** - (_datetime_) definiert das Startdatum der Serie
2. **end_date** - (_datetime_) definiert das Enddatum der Serie
3. **rrule** - (_string_) definiert die Regel der Wiederholung
4. **duration** - (_number_) die Dauer der wiederkehrenden Instanz
5. **recurring_event_id** - (_string|number_) die ID der übergeordneten Serie, nur ausgefüllt für modifizierte oder gelöschte Vorkommnisse der Serie
6. **original_start** - (_datetime_) das ursprüngliche Datum der bearbeiteten Instanz, nur ausgefüllt für modifizierte oder gelöschte Vorkommnisse der Serie
7. **deleted** - (_boolean_) gibt das gelöschte Vorkommnis der Serie an, nur ausgefüllt für gelöschte Vorkommnisse der Serie

**rrule** folgt dem iCalendar-Format wie in RFC-5545 spezifiziert und beschreibt Frequenz, Intervall und weitere Parameter, die das Wiederholungsmuster steuern.

### Unterschiede zum iCalendar-Format

Unser Format unterscheidet sich vom iCalendar-Format in zwei wesentlichen Momenten:

#### Getrennte Speicherung von STDATE und DTEND:

Im iCalendar-Format werden Start- und Enddaten einer wiederkehrenden Serie typischerweise als Teil des **RRULE**-Strings als **STDATE**- und **DTEND**-Eigenschaften gespeichert.
In unserem Format werden **stdate** und **dtend** als getrennte Felder gespeichert. Diese Trennung ermöglicht eine einfachere Manipulation und Abfrage wiederkehrender Ereignisse nach Datum, ohne den **RRULE**-String parsen zu müssen.

Hier ist ein Beispiel der wiederkehrenden Ereignisserie, die jeden Montag ab dem 1. Juni 2027 bis zum 1. Dezember 2027 wiederholt:

~~~js
{
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2027-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2027-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
}
~~~

#### Behandlung von Ausnahmen

Ausnahmen, auch als modifizierte oder gelöschte Vorkommnisse der Serie bezeichnet, werden als separate Ereignisdatensätze gespeichert, die mit der übergeordneten Serie verknüpft sind.
Ausnahmen besitzen drei zusätzliche Eigenschaften: **recurring_event_id**, **original_start** und **deleted**. 
Diese Eigenschaften ermöglichen es uns, modifizierte oder gelöschte Instanzen und deren Beziehung zur übergeordneten Serie einfach zu identifizieren.

:::note
Beachten Sie, dass im Gegensatz zum traditionellen iCalendar-Format Ausnahmen (modifizierte oder gelöschte Instanzen) NICHT in der **EXDATE**-Eigenschaft der **RRULE** der Serie gespeichert werden.
:::

Hier ist das Beispiel der wiederkehrenden Serie mit einer modifizierten und einer gelöschten Instanz:

~~~js
[
    {
        "id": 1,
        "text": "Weekly Team Meeting",
        "start_date": "2027-06-03 09:00:00",
        "duration": 3600,
        "end_date": "2027-12-02 10:00:00",
        "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
        "recurring_event_id": null,
        "original_start": null
    },
    {
        "id": 2,
        "text": "Special Team Meeting",
        "start_date": "2027-06-10 09:00:00",
        "end_date": "2027-06-10 11:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-10 09:00:00"
    },
    {
        "id": 3,
        "text": "Deleted Team Meeting",
        "start_date": "2027-06-17 09:00:00",
        "end_date": "2027-06-17 10:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-17 09:00:00",
        "deleted": true
    }
]
~~~

Der für den 2027-06-10 09:00:00 geplante wiederkehrende Termin wird durch den Datensatz `Special Team Meeting` ersetzt, und der Termin für den 2027-06-17 09:00:00 wird übersprungen.

Beachten Sie, dass das **rrule** der modifizierten oder gelöschten Vorkommnisse ignoriert wird.

**text**, **start_date** und **end_date** gelöschter Instanzen werden ebenfalls ignoriert und die Werte dieser Felder beeinflussen das Verhalten des Schedulers nicht.

## Bearbeiten/Löschen eines bestimmten Vorkommnisses in der Serie 

Es besteht die Möglichkeit, ein bestimmtes Vorkommnis in einer Serie zu löschen oder zu bearbeiten. 

### Wichtige Tipps

- Für jede Aktualisierung des wiederkehrenden Ereignisses wird ein separater Datensatz in der Datenbank erstellt.
- Bestimmte Vorkommnisse beziehen sich auf das übergeordnete Ereignis über die Eigenschaft **recurring_event_id**.
- Sobald Sie ein Vorkommnis in der Serie bearbeitet haben, speichert das Feld **original_start** dieses Updates das Datum, an dem das Vorkommnis hätte stattfinden sollen, falls es nicht bearbeitet worden wäre, anstelle der tatsächlichen Ereignisdauer. Wenn das Vorkommnis also am 27. Juli 2027 um 15:00 stattgefunden hat und auf den 30. Juli 2027 um 15:00 verschoben wurde, würde der Zeitstempel auf das ursprüngliche Datum verweisen.


### Server-seitige Logik 

Zusätzlich zu zusätzlichen Feldern muss dem serverseitigen Controller eine spezifische Logik hinzugefügt werden:

- Wenn eine gelöschte Instanz eingefügt wurde – Die Serverantwort muss den Status "deleted" haben.
- Wenn eine Serie modifiziert wurde, sollten alle modifizierten und gelöschten Vorkommnisse der Serie gelöscht werden.
  - Serien lassen sich identifizieren durch den nicht-leeren Wert der Eigenschaft **rrule** und den leeren Wert der Eigenschaft **recurring_event_id**.
  - Modifizierte Vorkommnisse der Serie sind alle Datensätze, bei denen **recurring_event_id** mit der **id** der Serie übereinstimmt.
- Wenn ein Ereignis mit einem nicht-leeren **recurring_event_id** gelöscht wurde, muss es stattdessen mit `deleted="true"` aktualisiert werden, statt gelöscht zu werden.

:::note
Sie finden die vollständigen Code-Beispiele [hier](integrations/howtostart-guides.md)
:::


## Benutzerdefinierte Steuerung des Lightbox-Recurrings-Blocks

Ab Version 4.2 ermöglicht der Scheduler, benutzerdefiniertes HTML für den 'recurring'-Block der Lightbox anzugeben.

#### Welche Anpassungen können Sie vornehmen?

1. Markup ändern
2. Unnötige Elemente entfernen (z. B. der "yearly"-Wiederholungstyp)
3. Standardwerte für Eingaben festlegen (z. B. alle Serien ohne Enddatum erstellen)

### Standardvorlage des Steuerelements für den Lightbox's recurring Block

Die Standardvorlage des Steuerelements für den Lightbox's recurring Block sieht wie der folgende Code aus, wobei das `loc`-Objekt ein [Locale](api/other/locale.md) Objekt (regionalspezifische Beschriftungen) des Schedulers ist:

~~~html
<div class="dhx_form_rrule">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">${loc.repeat_never}</option>
            <option value="DAILY">${loc.repeat_daily}</option>
            <option value="WEEKLY">${loc.repeat_weekly}</option>
            <option value="MONTHLY">${loc.repeat_monthly}</option>
            <option value="YEARLY">${loc.repeat_yearly}</option>
            <option value="WORKDAYS">${loc.repeat_workdays}</option>
            <option value="CUSTOM">${loc.repeat_custom}</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom dhx_hidden">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
              <option value="DAILY">${loc.repeat_freq_day}</option>
              <option value="WEEKLY">${loc.repeat_freq_week}</option>
              <option value="MONTHLY">${loc.repeat_freq_month}</option>
              <option value="YEARLY">${loc.repeat_freq_year}</option>
            </select>
        </div>

    <div class="dhx_form_repeat_custom_additional">
        <div class="dhx_form_repeat_custom_week dhx_hidden">
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="MO" />${loc.day_for_recurring[1]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TU" />${loc.day_for_recurring[2]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="WE" />${loc.day_for_recurring[3]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TH" />${loc.day_for_recurring[4]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="FR" />${loc.day_for_recurring[5]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SA" />${loc.day_for_recurring[6]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SU" />${loc.day_for_recurring[0]}</label>
        </div>

        <div class="dhx_form_repeat_custom_month dhx_hidden">
            <select name="dhx_custom_month_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_year dhx_hidden">
            <select name="dhx_custom_year_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>
    </div>

    <div class="dhx_form_repeat_ends">
        <div>${loc.repeat_ends}</div>
            <div class="dhx_form_repeat_ends_options">
                <select name="dhx_custom_repeat_ends">
                    <option value="NEVER">${loc.repeat_never}</option>
                    <option value="AFTER">${loc.repeat_radio_end2}</option>
                    <option value="ON">${loc.repeat_on_date}</option>
                </select>
                <div class="dhx_form_repeat_ends_extra">
                    <div class="dhx_form_repeat_ends_after dhx_hidden">
                        <label><input name="dhx_form_repeat_ends_after" type="number" 
                          min="1">${loc.repeat_text_occurrences_count}</label>
                    </div>
                    <div class="dhx_form_repeat_ends_on dhx_hidden">
                      <input type="date" name="dhx_form_repeat_ends_ondate">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
~~~

#### Die Haupt-Auswahlsteuerung für Wiederholungen

Im Wesentlichen enthält der Recurring-Block des Lightbox die Hauptsteuerung zur Auswahl der Wiederholung, die standardmäßig fünf Typen der Wiederholung bietet mit den folgenden Optionen: "Every day", "Every week", "Every month", "Every year", "Every weekday". Zusätzlich enthält sie die Option "Custom" zum Erstellen des gewünschten Typs und die Option "Never" zur Deaktivierung der Wiederholung:

~~~html
<div class="dhx_form_repeat_pattern">
    <select>
        <option value="NEVER">Never</option>
        <option value="DAILY">Every day</option>
        <option value="WEEKLY">Every week</option>
        <option value="MONTHLY">Every month</option>
        <option value="YEARLY">Every year</option>
        <option value="WORKDAYS">Every weekday</option>
        <option value="CUSTOM">Custom</option>
    </select>
</div>
~~~

Für den Wiederholungstyp "Custom" gibt es spezielle Wiederholungseinheiten: "Day", "Week", "Month", "Year" und das Wiederholungs-Intervall-Eingabefeld. Die Einheiten "Week", "Month" und "Year" haben eigene Abschnitte mit spezifischen Wiederholungsoptionen (standardmäßig sind diese Abschnitte verborgen, bis der erforderliche Typ gewählt wird):

~~~html
<div class="dhx_form_repeat_custom ">
    <div class="dhx_form_repeat_custom_interval">
        <input name="repeat_interval_value" type="number" min="1">
        <select name="repeat_interval_unit">
            <option value="DAILY">${loc.repeat_freq_day}</option>
            <option value="WEEKLY">${loc.repeat_freq_week}</option>
            <option value="MONTHLY">${loc.repeat_freq_month}</option>
            <option value="YEARLY">${loc.repeat_freq_year}</option>
        </select>
    </div>

    <div class="dhx_form_repeat_custom_additional">
        <div class="dhx_form_repeat_custom_week dhx_hidden">
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="MO" />${loc.day_for_recurring[1]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TU" />${loc.day_for_recurring[2]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="WE" />${loc.day_for_recurring[3]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TH" />${loc.day_for_recurring[4]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="FR" />${loc.day_for_recurring[5]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SA" />${loc.day_for_recurring[6]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SU" />${loc.day_for_recurring[0]}</label>
        </div>

        <div class="dhx_form_repeat_custom_month dhx_hidden">
            <select name="dhx_custom_month_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_year dhx_hidden">
            <select name="dhx_custom_year_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>
    </div>
</div>
~~~

#### Der Block zur Festlegung des Endes der Wiederholung

Das Ende der Wiederholung wird durch die Auswahlliste mit den Werten definiert: "NEVER", "ON", "AFTER". Falls die Option "AFTER" gewählt ist, erscheint zusätzlich ein Eingabefeld für die Anzahl der Wiederholungen. Falls die Option "ON" gewählt ist, erscheint ein zusätzliches Datumseingabefeld:

~~~html
<div class="dhx_form_repeat_ends">
    <div>${loc.repeat_ends}</div>
        <div class="dhx_form_repeat_ends_options">
            <select name="dhx_custom_repeat_ends">
                <option value="NEVER">${loc.repeat_never}</option>
                <option value="AFTER">${loc.repeat_radio_end2}</option>
                <option value="ON">${loc.repeat_on_date}</option>
            </select>
            <div class="dhx_form_repeat_ends_extra">
                <div class="dhx_form_repeat_ends_after dhx_hidden">
                    <label><input name="dhx_form_repeat_ends_after" type="number" 
                      min="1">${loc.repeat_text_occurrences_count}</label>
                </div>
                <div class="dhx_form_repeat_ends_on dhx_hidden">
                  <input type="date" name="dhx_form_repeat_ends_ondate">
                </div>
            </div>
        </div>
    </div>
</div>
~~~

### Beispiel eines benutzerdefinierten Recurring-Blocks

Lassen Sie uns ein Beispiel für einen benutzerdefinierten Recurring-Block erstellen. Stellen Sie sich vor, Sie möchten die Typen "monthly" und "yearly" entfernen und die Option "no end date" für alle Ereignisse verwenden (d. h. den Block zur Angabe des Endes der Wiederholung entfernen). 

1. Definieren Sie das Markup eines benutzerdefinierten Formulars und platzieren Sie es irgendwo auf der Seite 
(Sie können damit beginnen, die Standardvorlage zu kopieren):

~~~html
<!-- beachten Sie, dass Sie die ID Ihres benutzerdefinierten Recurring-Formulars angeben müssen  -->
<div class="dhx_form_rrule" id="my_recurring_form" style="display:none;">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">Never</option>
            <option value="DAILY">Every day</option>
            <option value="WEEKLY">Every week</option>
            <option value="WORKDAYS">Every weekday</option>
            <option value="CUSTOM">Custom</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
                <option value="DAILY">Day</option>
                <option value="WEEKLY">Week</option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_additional">
            <div class="dhx_form_repeat_custom_week dhx_hidden">
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="MO" />Monday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TU" />Tuesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="WE" />Wednesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TH" />Thursday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="FR" />Friday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SA" />Saturday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SU" />Sunday</label>
            </div>
        </div>
    </div>
</div>
~~~

2. Legen Sie den **form**-Parameter des Abschnitts "recurring" auf die ID Ihres benutzerdefinierten Formulars fest:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", 
        form: "my_recurring_form" }, /*!*/
    { name: "time", type: "time", map_to: "auto", height: 72 },
];
~~~

Die resultierende Lightbox mit einem benutzerdefinierten Recurring-Block wird im untenstehenden Bild gezeigt:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

Der folgende Ausschnitt demonstriert, wie eine Lightbox mit dem oben beschriebenen benutzerdefinierten Recurring-Block implementiert werden kann:

Related sample [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)
  
### Hinweise zum Ändern des Recurring-Blocks

Bitte beachten Sie vor dem Start der Anwendung einer benutzerdefinierten Konfiguration für den Recurring-Block der Lightbox Folgendes:

1. Das **name**-Attribut ist für alle Eingaben fest codiert: Eingaben mit anderen Namen werden ignoriert.
2. Das **value**-Attribut ist für alle Eingaben festgelegt, außer für solche, die direkte Eingaben erfordern.
3. Wenn Sie ein neues Formular festlegen, verwendet Scheduler es nicht direkt, sondern repliziert lediglich Ihre HTML-Struktur in der Lightbox-Vorlage. Das bedeutet, dass alle Event-Handler oder benutzerdefinierten Eigenschaften, die an DOMElemente Ihres Formulars im Code angehängt wurden, im Lightbox-Template nicht auf das Formular angewendet werden. Wenn Sie einen Event-Handler anhängen möchten, müssen Sie ihn entweder als Inline-HTML-Attribut angeben oder einen Handler an das Formular anhängen, wenn es in der Lightbox angezeigt wird.

:::note
Vorsicht, Scheduler arbeitet nicht mit Ihrem ursprünglichen HTML-Formular und erstellt lediglich eine Kopie davon im Lightbox-Template.
:::


Beispielsweise:

- Die folgende Zeile wird in die Lightbox kopiert:

~~~html
<input onclick="handler()"> 
~~~

- Die folgende Zeile wird nicht in die Lightbox kopiert:

~~~js
addEventListener(node, "click", function(){...})
~~~

## Custom Confirmation Modal {#customconfirmationmodal}

Wenn ein Benutzer ein wiederkehrendes Ereignis bearbeitet oder verschiebt, zeigt der Scheduler ein integriertes Modal an, das fragt, ob nur dieses Vorkommnis, dieses und folgende Ereignisse oder die gesamte Serie geändert werden soll. Sie können es durch Ihre eigene Benutzeroberfläche ersetzen, indem Sie `scheduler.ext.recurring.confirm` überschreiben.

~~~js
scheduler.ext.recurring.confirm = function(context) {
  // context enthält:
  // - origin: "lightbox" | "dnd"
  // - occurrence: das zu bearbeitende Vorkommnis
  // - series: das übergeordnete Serienereignis
  // - labels: { title, ok, cancel, occurrence, following, series }
  // - options: ["occurrence", "following", "series"]
  //
  // Rückgabe eines der Werte: "occurrence", "following", "series" oder null zum Abbrechen.
  // Kann auch als Promise für asynchrone UI zurückgegeben werden.

  return new Promise(function(resolve) {
    myCustomDialog.show({
      title: context.labels.title,
      options: context.options,
      onSelect: function(choice) { resolve(choice); },
      onCancel: function() { resolve(null); }
    });
  });
};
~~~

Das Kontextobjekt hat folgende Eigenschaften:

| Eigenschaft | Typ | Beschreibung |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Ob die Aktion aus der Lightbox oder per Drag-and-Drop ausgelöst wurde |
| `occurrence` | `object` | Das spezifische, zu bearbeitende Vorkommnis |
| `series` | `object` | Das übergeordnete wiederkehrende Ereignis |
| `labels` | `object` | Lokalisierte Zeichenketten: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Verfügbare Optionen, z. B. `["occurrence", "following", "series"]` |

Die Funktion muss `"occurrence"`, `"following"`, `"series"`, oder `null` zurückgeben, um abzubrechen. Sie kann den Wert direkt oder als Promise zurückgeben.

Für eine React-Implementierung siehe die [React Scheduler-Dokumentation](integrations/react/overview.md#customizingtherecurrenceconfirmationmodal).


## Legacy-Format wiederkehrender Ereignisse

Bis Version 7.1 verwendete der Scheduler ein eigenes Format für wiederkehrende Ereignisse. Details zum Format finden Sie [hier](guides/recurring-events-legacy.md).