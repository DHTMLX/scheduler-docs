---
title: "Wiederkehrende Ereignisse"
sidebar_label: "Wiederkehrende Ereignisse"
---

# Wiederkehrende Ereignisse

Wiederkehrende Ereignisse sind eine gängige Funktion in Kalenderanwendungen, die es Benutzern ermöglicht, Ereignisse zu erstellen, die sich in festgelegten Intervallen wiederholen. Ab Version 7.1 verwendet der Scheduler das RFC-5545-basierte Format für wiederkehrende Ereignisse.

Dieser Artikel erklärt, wie man wiederkehrende Ereignisse im Scheduler verwendet und wie sie in der Datenbank gespeichert werden.

:::note
Sie finden die Beschreibung des Legacy-Formats von wiederkehrenden Ereignissen [hier](guides/recurring-events-legacy.md)
:::

Standardmäßig unterstützt der Scheduler keine wiederkehrenden Ereignisse. Um eine solche Unterstützung bereitzustellen, müssen Sie die `recurring`-Erweiterung auf der Seite aktivieren:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

Sobald die Unterstützung für wiederkehrende Ereignisse aktiviert ist, sieht das Lightbox-Fenster wie unten beschrieben aus:

![recurring_lightbox](/img/recurring_lightbox.png)


## Konfigurationsoptionen

Die Bibliothek bietet folgende Option zur Konfiguration wiederkehrender Ereignisse:

- [`repeat_date`](api/config/repeat_date.md) - legt das Datumsformat des Feldes 'Ende' im 'recurring'-Lightbox fest

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~

**Zugehöriges Beispiel** [Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

## 'Recurring' Lightbox

Standardmäßig enthält die Lightbox nach Aktivierung der Recurring-Erweiterung einen zusätzlichen Abschnitt - "Ereignis wiederholen".
Die Standarddefinition der 'recurring'-Lightbox sieht dann so aus:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~

**Zugehöriges Beispiel** [Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Formatbeschreibung

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Datensatz gespeichert, der alle Felder eines regulären Ereignisses sowie mehrere zusätzliche Eigenschaften enthält:

1. **start_date** - (_datetime_) definiert das Startdatum der Serie
2. **end_date** - (_datetime_) definiert das Enddatum der Serie
3. **rrule** - (_string_) definiert die Wiederholungsregel
4. **duration** - (_number_) die Dauer der wiederkehrenden Instanz
5. **recurring_event_id** - (_string|number_) die ID der übergeordneten Serie, nur gefüllt für geänderte oder gelöschte Vorkommen der Serie
6. **original_start** - (_datetime_) das ursprüngliche Datum der bearbeiteten Instanz, nur gefüllt für geänderte oder gelöschte Vorkommen der Serie
7. **deleted** - (_boolean_) gibt an, ob das Vorkommen der Serie gelöscht wurde, nur gefüllt für gelöschte Vorkommen der Serie

**rrule** folgt dem iCalendar-Format, wie es in RFC-5545 festgelegt ist, und beschreibt Frequenz, Intervall und andere Parameter, die das Wiederholungsmuster steuern.

### Unterschiede zum iCalendar-Format

Unser Format unterscheidet sich vom iCalendar-Format in zwei entscheidenden Punkten:

#### Getrennte Speicherung von STDATE und DTEND:

Im iCalendar-Format werden Start- und Enddaten einer wiederkehrenden Serie typischerweise als Teil des **RRULE**-Strings als Eigenschaften **STDATE** und **DTEND** gespeichert.
In unserem Format werden **stdate** und **dtend** als separate Felder gespeichert. Diese Trennung erleichtert die Manipulation und Abfrage wiederkehrender Ereignisse nach Datum, ohne den **RRULE**-String parsen zu müssen.

Hier ist ein Beispiel der wiederkehrenden Ereignis-Serie, die jeden Montag ab dem 01.06.2027 bis zum 01.12.2027 wiederholt:

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

Ausnahmen, auch als geänderte oder gelöschte Vorkommen der Serie bezeichnet, werden als separate Ereignisdatensätze gespeichert, die mit ihrer übergeordneten Serie verknüpft sind.
Ausnahmen besitzen drei zusätzliche Eigenschaften: **recurring_event_id**, **original_start** und **deleted**.
Diese Eigenschaften ermöglichen es uns, geänderte oder gelöschte Instanzen und deren Beziehung zur übergeordneten Serie leicht zu identifizieren.

:::note
Beachten Sie, dass im Gegensatz zum traditionellen iCalendar-Format Ausnahmen (geänderte oder gelöschte Instanzen) NICHT in der **EXDATE**-Eigenschaft des **RRULE** der Serie gespeichert werden.
:::

Hier ist ein Beispiel der wiederkehrenden Serie mit einem geänderten und einem gelöschten Vorkommen:

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

Der wiederholte Termin, der am `2027-06-10 09:00:00` geplant war, wird durch den Datensatz `Special Team Meeting` ersetzt, und der Termin, der für `2027-06-17 09:00:00` vorgesehen war, wird übersprungen.

Beachten Sie, dass das **rrule** der geänderten oder gelöschten Vorkommen ignoriert wird.

**text**, **start_date** und **end_date** gelöschter Instanzen werden ebenfalls ignoriert und die Werte dieser Felder beeinflussen das Verhalten des Scheduler nicht.

## Bearbeiten/Löschen eines bestimmten Vorkommens in der Serie

Es gibt die Möglichkeit, ein bestimmtes Vorkommen in einer Serie zu löschen oder zu bearbeiten.

### Wichtige Hinweise

- Für jede Aktualisierung des wiederkehrenden Ereignisses wird ein separater Datensatz in der Datenbank erstellt.
- Bestimmte Vorkommen verweisen über die Eigenschaft **recurring_event_id** auf das übergeordnete Ereignis.
- Sobald Sie ein Vorkommen in der Serie bearbeitet haben, wird das Feld **original_start** für dieses Update das Datum speichern, an dem das Vorkommen hätte stattfinden sollen, falls es nicht bearbeitet worden wäre, statt der tatsächlichen Länge des Ereignisses.
- Wenn das Vorkommen am 27. Juli 2027 um 15:00 Uhr stattgefunden hat und auf den 30. Juli 2027 um 15:00 Uhr verschoben wurde, würde der Zeitstempel auf das erste Datum verweisen.

### Serverseitige Logik

Zusätzlich zu zusätzlichen Feldern muss auf dem Server-Controller eine spezielle Logik implementiert werden:

- Falls eine gelöschte Instanz eingefügt wurde – die Serverantwort muss den Status "deleted" haben.
  - Eine gelöschte Instanz lässt sich durch einen nicht-leeren Wert der Eigenschaft **deleted** identifizieren.
- Wenn eine Serie geändert wurde, sollten alle geänderten und gelöschten Instanzen der Serie gelöscht werden.
  - Die Serie kann durch einen nicht-leeren Wert der Eigenschaft **rrule** und einen leeren Wert der Eigenschaft **recurring_event_id** identifiziert werden.
  - Geänderte Vorkommen der Serie sind alle Datensätze, bei denen **recurring_event_id** mit der **id** der Serie übereinstimmt.
- Wenn ein Ereignis mit einem nicht-leeren **recurring_event_id** gelöscht wurde, muss es mit **deleted="true"** aktualisiert werden, statt zu löschen.

:::note
Sie finden die vollständigen Codebeispiele [hier](integrations/howtostart-guides.md)
:::


## Benutzerdefinierte Steuerung für den Lightbox's Recurring-Block

Ab Version 4.2 ermöglicht Scheduler das Festlegen eines benutzerdefinierten HTML für den 'recurring'-Block der Lightbox.

#### Welche Anpassungen können Sie vornehmen?

1. Das Markup ändern
2. Unnötige Elemente löschen (z. B. den Wiederholungstyp YEARLY)
3. Standardwerte für Eingaben festlegen (z. B. sollen alle Serien ohne Enddatum erstellt werden)

### Standardvorlage des Steuerelements für den Lightboxs recurring-Block

Die Standardvorlage des Steuerelements für den Lightbox-Block wiederholen sieht wie der folgende Code aus, wobei das `loc`-Objekt ein [Locale](api/other/locale.md) Objekt (regionalspezifische Bezeichnungen) des Scheduler ist:

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
~~~

#### Die Hauptauswahl für die regelmäßige Wiederholung

Im Wesentlichen enthält der Wiederholungsblock der Lightbox die Hauptauswahl für die Wiederholung, die fünf Standardtypen der Wiederholung mit den folgenden Optionen bereitstellt: "Jeder Tag", "Jede Woche", "Jeder Monat", "Jedes Jahr", "Jeder Werktag". Zusätzlich gibt es die Option "Custom" (Benutzerdefiniert) zum Erstellen des erforderlichen Typs und die Option "Never" (Nie), um die Wiederholung zu deaktivieren:

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

Für den Wiederholungstyp "Custom" gibt es spezielle Wiederholungseinheiten: "Day", "Week", "Month", "Year" und das Eingabefeld für das Wiederholungsintervall. Die Einheiten "Week", "Month" und "Year" besitzen eigene Abschnitte mit spezifischen Wiederholungsoptionen (standardmäßig sind diese Abschnitte versteckt, bis der erforderliche Typ ausgewählt wird):

~~~html
<div class="dhx_form_repeat_custom">
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

Das Ende der Wiederholung wird durch das Auswahlfeld mit den folgenden Werten definiert: "NEVER", "ON", "AFTER". Wenn die Option "AFTER" gewählt wird, erscheint ein zusätzliches Eingabefeld für die Anzahl der Wiederholungen. Wird die Option "ON" gewählt, erscheint ein weiteres Datums-Eingabefeld:

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

### Beispiel eines benutzerdefinierten Wiederholungsblocks

Erstellen wir ein Beispiel für einen benutzerdefinierten Wiederholungsblock. Nehmen wir an, Sie möchten die "monatlichen" und "jährlichen" Wiederholungstypen entfernen und die Option "kein Enddatum" für alle Ereignisse verwenden (d. h. den Block zum Festlegen des Wiederholungsendes entfernen).

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

2. Setzen Sie den **form**-Parameter des "recurring"-Abschnitts auf die ID Ihres benutzerdefinierten Formulars:

~~~js {3}
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", form: "my_recurring_form" },
    { name: "time", type: "time", map_to: "auto", height: 72 }
];
~~~

Das resultierende Lightbox-Fenster mit einem benutzerdefinierten Wiederholungsblock wird im untenstehenden Bild gezeigt:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

Der folgende Ausschnitt zeigt, wie eine Lightbox mit dem oben beschriebenen benutzerdefinierten Wiederholungsblock implementiert werden kann:

**Zugehöriges Beispiel** [Lightbox mit einem benutzerdefinierten Wiederholungsblock](https://snippet.dhtmlx.com/0ha0edlk)

### Hinweise zum Ändern des Wiederholungsblocks

Bevor Sie mit der Anwendung einer benutzerdefinierten Konfiguration für den Lightbox-Wiederholungsblock beginnen, beachten Sie bitte Folgendes:

1. Das `name`-Attribut ist für alle Eingaben fest codiert: Eingaben mit anderen Namen werden ignoriert.
2. Das `value`-Attribut ist für alle Eingaben festgelegt, außer für solche, die direkte Eingaben implizieren.
3. Wenn Sie ein neues Formular angeben, verwendet Scheduler es nicht direkt und kopiert lediglich Ihre HTML-Struktur in die Lightbox-Vorlage.
   Das bedeutet, dass alle Event-Handler oder benutzerdefinierte Eigenschaften, die an DOM-Elementen Ihres Formulars aus dem Code angehängt wurden, nicht auf das Formular in der Lightbox angewendet werden.
   Wenn Sie einen Event-Handler anhängen möchten, müssen Sie ihn entweder als Inline-HTML-Attribut angeben oder einen Handler an das Formular anhängen, wenn es in der Lightbox angezeigt wird, mit `addEventListener()`.

:::note
Vorsicht, Scheduler arbeitet nicht mit Ihrem ursprünglichen HTML-Formular und erstellt stattdessen eine Kopie davon in der Lightbox-Vorlage.
::>

Zum Beispiel:

- Die folgende Zeile wird in die Lightbox kopiert:

~~~html
<input onclick="handler()">
~~~

- Die folgende Zeile wird nicht in die Lightbox kopiert:

~~~js
node.addEventListener("click", () => {
    ...
});
~~~

## Benutzerdefiniertes Bestätigungsmodal {#customconfirmationmodal}

Wenn ein Benutzer ein wiederkehrendes Ereignis bearbeitet oder verschiebt, zeigt der Scheduler ein integriertes Modal, das fragt, ob nur dieses Vorkommen, dieses und folgende Ereignisse oder die gesamte Serie geändert werden soll. Sie können es durch Ihre eigene Benutzeroberfläche ersetzen, indem Sie `scheduler.ext.recurring.confirm` überschreiben.

~~~js
scheduler.ext.recurring.confirm = (context) => {
    // context enthält:
    // - origin: "lightbox" | "dnd"
    // - occurrence: das Vorkommen-Ereignis-Objekt
    // - series: das übergeordnete Serien-Ereignis
    // - labels: { title, ok, cancel, occurrence, following, series }
    // - options: ["occurrence", "following", "series"]
    //
    // Rückgabe eines der Werte: "occurrence", "following", "series" oder null zum Abbrechen.
    // Kann auch als Promise für asynchrone UI zurückgegeben werden.

    return new Promise((resolve) => {
        myCustomDialog.show({
            title: context.labels.title,
            options: context.options,
            onSelect: (choice) => { resolve(choice); },
            onCancel: () => { resolve(null); }
        });
    });
};
~~~

Das Kontext-Objekt hat die folgenden Eigenschaften:

| Eigenschaft | Typ | Beschreibung |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Ob die Aktion aus der Lightbox oder Drag-and-Drop ausgelöst wurde |
| `occurrence` | `object` | Das spezifische Vorkommen, das bearbeitet wird |
| `series` | `object` | Die übergeordnete wiederkehrende Ereignisserie |
| `labels` | `object` | Lokalisierte Zeichenketten: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Verfügbare Optionen, z.B. `["occurrence", "following", "series"]` |

Die Funktion muss `"occurrence"`, `"following"`, `"series"`, oder `null` zurückgeben, um abzubrechen. Sie kann den Wert direkt oder als Promise zurückgeben.

Für eine React-Implementierung siehe die [React Scheduler-Dokumentation](integrations/react/overview.md#customizing-the-recurrence-confirmation-modal).


## Legacy-Format der wiederkehrenden Ereignisse

Bis v7.1 verwendete der Scheduler ein eigenes Format für wiederkehrende Ereignisse. Die Details zum Format finden Sie [hier](guides/recurring-events-legacy.md).