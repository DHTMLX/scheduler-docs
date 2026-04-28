---
title: "Lokalisierung"
sidebar_label: "Lokalisierung"
---

# Lokalisierung

Die Bibliothek unterstützt die Lokalisierung des Schedulers, indem sie eine Reihe vordefinierter Lokalisierungen bereitstellt und eine Möglichkeit bietet, eigene Lokalisierungen zu erstellen. Standardmäßig verwendet DHTMLX Scheduler die englische Locale.

## Aktivierung

Um die gewünschte Sprache für den Scheduler festzulegen, aktivieren Sie die benötigte Locale über die `setLocale()`-Methode des [scheduler.i18n](api/other/i18n.md) Objekts.

~~~js
scheduler.i18n.setLocale("fr");
~~~

Sie können eine der [vordefinierten Locale](#included-locales) verwenden und aktualisieren, die mit der Datei dhtmlxscheduler.js gebündelt sind, oder eine benutzerdefinierte Locale definieren.

:::note
Die Locale kann dynamisch gewechselt werden, aber die Änderungen werden erst nach einer vollständigen Neuzeichnung des Schedulers mit entweder dem Aufruf von `scheduler.render()` oder `scheduler.init()` angewendet.
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~

### Verwandte Beispiele
- [Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)

## Included locales

:::note
Sowohl gemeinsame Locale-Dateien als auch wiederkehrende Locale-Dateien befinden sich in der Datei `dhtmlxscheduler.js`.
:::

dhtmlxScheduler enthält Lokalisierungen für die folgenden Sprachen:

<table >
<tr><td markdown='1' >Sprache</td><td markdown='1'>Sprachcode</td></tr>
<tr><td markdown='1'>Arabisch</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>Weißrussisch</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>Katalanisch</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>Chinesisch</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>Tschechisch</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>Dänisch</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>Niederländisch</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>Englisch</td><td markdown='1'>en (default)</td></tr>
<tr><td markdown='1'>Finnisch</td><td markdown='1'>fi</td></tr>
<tr><td markdown='1'>Französisch</td><td markdown='1'>fr</td></tr>
<tr><td markdown='1'>Deutsch</td><td markdown='1'>de</td></tr>
<tr><td markdown='1'>Griechisch</td><td markdown='1'>el</td></tr>
<tr><td markdown='1'>Hebräisch</td><td markdown='1'>he</td></tr>
<tr><td markdown='1'>Ungarisch</td><td markdown='1'>hu</td></tr>
<tr><td markdown='1'>Indonesisch</td><td markdown='1'>id</td></tr>
<tr><td markdown='1'>Italienisch</td><td markdown='1'>it</td></tr>
<tr><td markdown='1'>Japanisch</td><td markdown='1'>jp</td></tr>
<tr><td markdown='1'>Norwegisch</td><td markdown='1'>no</td></tr>
<tr><td markdown='1'>Norwegisch Bokmål</td><td markdown='1'>nb</td></tr>
<tr><td markdown='1'>Polnisch</td><td markdown='1'>pl</td></tr>
<tr><td markdown='1'>Portugiesisch</td><td markdown='1'>pt</td></tr>
<tr><td markdown='1'>Rumänisch</td><td markdown='1'>ro</td></tr>
<tr><td markdown='1'>Russisch</td><td markdown='1'>ru</td></tr>
<tr><td markdown='1'>Slowakisch</td><td markdown='1'>sk</td></tr>
<tr><td markdown='1'>Slowenisch</td><td markdown='1'>si</td></tr>
<tr><td markdown='1'>Spanisch</td><td markdown='1'>es</td></tr>
<tr><td markdown='1'>Schwedisch</td><td markdown='1'>sv</td></tr>
<tr><td markdown='1'>Türkisch</td><td markdown='1'>tr</td></tr>
<tr><td markdown='1'>Ukrainisch</td><td markdown='1'>ua</td></tr>
</table>

## Eigene Locale erstellen

:::note
Das [scheduler.i18n](api/other/i18n.md) Objekt wurde in v6.0 hinzugefügt. In früheren Versionen wurde das [scheduler.locale](api/other/locale.md) Objekt verwendet. Für weitere Informationen siehe den [Migration-Artikel](migration.md#53---60).
:::

Der einfachste Weg, eine eigene Locale zu erstellen, besteht darin, eine Kopie der Standard-englischen Locale aus dem untenstehenden Beispiel zu nehmen und alle Strings in die gewünschte Sprache zu übersetzen.

Die benutzerdefinierte Locale kann dem Scheduler auf zwei Arten angewendet werden:

- Entweder die aktuelle Locale überschreiben, indem man ein Locale-Objekt als Parameter an die `setLocale()`-Methode übergibt:

~~~js
scheduler.i18n.setLocale(localeObject);
~~~

Hinweis: Falls Sie dem Aufruf ein partielles Locale-Objekt übergeben, fügt der Scheduler Ihre Labels in die aktuelle Locale ein:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Tag",
    }
});
~~~

- Oder, wenn Sie zwischen mehreren Locales wechseln müssen, definieren Sie die Locale mit einem benutzerdefinierten Sprachcode und wechseln Sie später zum Scheduler darauf um:

~~~js
scheduler.i18n.addLocale("lang", localeObject);
scheduler.i18n.setLocale("lang");
~~~

:::note
Hinweis: Das Aktivieren einer benutzerdefinierten Locale in der Anwendung bewirkt Änderungen in der Benutzeroberfläche der App. Überprüfen und ggf. alle sprachabhängigen Elemente neu definieren, um sicherzustellen, dass der Scheduler in der neuen Sprache gut aussieht.
:::

**Hinweis**

- Sie können Ihre benutzerdefinierte Locale-Datei an **support@dhtmlx.com** senden, damit wir sie in die nächste Veröffentlichung aufnehmen.
- Die aktuell aktive Locale ist auch im `scheduler.locale`-Objekt verfügbar.
- `monthFull` - die vollständigen Monatsnamen, beginnend mit Januar
- `monthShort` - die kurzen Monatsnamen, beginnend mit Januar
- `dayFull` - die vollständigen Wochentagsnamen, beginnend mit Sonntag
- `dayShort` - die kurzen Wochentagsnamen, beginnend mit Sonntag

### Englische Locale-Definition
~~~js
scheduler.i18n.setLocale({
    date: {
        month_full: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
        month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"],
        day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    labels: {
        dhx_cal_today_button: "Today",
        day_tab: "Day",
        week_tab: "Week",
        month_tab: "Month",
        new_event: "New event",
        icon_save: "Save",
        icon_cancel: "Cancel",
        icon_details: "Details",
        icon_edit: "Edit",
        icon_delete: "Delete",
        confirm_closing: "", // Your changes will be lost, are your sure?
        confirm_deleting: "Event will be deleted permanently, are you sure?",
        section_description: "Description",
        section_time: "Time period",
        full_day: "Full day",

        /* recurring events */
        confirm_recurring: "Edit recurring event",
        section_recurring: "Repeat event",
        button_recurring: "Disabled",
        button_recurring_open: "Enabled",
        button_edit_series: "All events",
        button_edit_occurrence: "This event",
        button_edit_occurrence_and_following: "This and following events",

        /* agenda view extension */
        agenda_tab: "Agenda",
        date: "Date",
        description: "Description",

        /* year view extension */
        year_tab: "Year",

        /* week agenda extension */
        week_agenda_tab: "Agenda",

        /* grid view extension */
        grid_tab: "Grid",

        /* touch tooltip */
        drag_to_create: "Drag to create",
        drag_to_move: "Drag to move",

        /* dhtmlx message default buttons */
        message_ok: "OK",
        message_cancel: "Cancel",

        /* wai aria labels for non-text controls */
        next: "Next",
        prev: "Previous",
        year: "Year",
        month: "Month",
        day: "Day",
        hour: "Hour",
        minute: "Minute",

        /* legacy  recurring event components */
        repeat_radio_day: "Daily", // name="repeat" value="day"
        repeat_radio_week: "Weekly", // name="repeat" value="week
        repeat_radio_month: "Monthly",
        repeat_radio_year: "Yearly",
        repeat_radio_day_type: "Every",
        repeat_text_day_count: "day",
        repeat_radio_day_type2: "Every workday",
        repeat_week: " Repeat every",
        repeat_text_week_count: "week next days:",
        repeat_radio_month_type: "Repeat",
        repeat_radio_month_start: "On",
        repeat_text_month_day: "day every",
        repeat_text_month_count: "month",
        repeat_text_month_count2_before: "every",
        repeat_text_month_count2_after: "month",
        repeat_year_label: "On",
        select_year_day2: "of",
        repeat_text_year_day: "day",
        select_year_month: "month",
        repeat_radio_end: "No end date",
        repeat_text_occurrences_count: "occurrences",
        repeat_radio_end2: "After",
        repeat_radio_end3: "End by",

        /* recurring event components */
        repeat_never: "Never",
        repeat_daily: "Every day",
        repeat_workdays: "Every weekday",
        repeat_weekly: "Every week",
        repeat_monthly: "Every month",
        repeat_yearly: "Every year",
        repeat_custom: "Custom",
        repeat_freq_day: "Day",
        repeat_freq_week: "Week",
        repeat_freq_month: "Month",
        repeat_freq_year: "Year",
        repeat_on_date: "On date",
        repeat_ends: "Ends",
        month_for_recurring: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
        day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"]
    }
});
~~~

### Verwandte Beispiele
- [Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)

## Zusätzliche Hinweise

- Wenn das Label `confirm_closing` oder `confirm_deleting` nicht definiert ist, wird der zugehörige Bestätigungsdialog überhaupt nicht angezeigt (Auto-Bestätigung)
- Das Label `section_(name)` bezieht sich auf den Lightbox-Abschnitt des entsprechenden Namens
- Das Label `new_event` definiert den Standardtext eines neuen Ereignisses