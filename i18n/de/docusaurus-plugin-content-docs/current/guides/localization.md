---
title: "Lokalisierung"
sidebar_label: "Lokalisierung"
---

# Lokalisierung

Die Bibliothek unterstützt die Lokalisierung für den Scheduler, indem sie eine Vielzahl vordefinierter Sprachpakete sowie Optionen zur Erstellung eigener Sprachpakete anbietet. Standardmäßig wird DHTMLX Scheduler mit dem [englischen Sprachpaket](api/other/locale.md) ausgeliefert.

## Aktivierung

Um die Sprache des Schedulers festzulegen, müssen Sie lediglich das gewünschte Sprachpaket über die Methode **setLocale** am Objekt [scheduler.i18n](api/other/i18n.md) aktivieren.

~~~js
scheduler.i18n.setLocale("fr");    
~~~

Sie können eines der im dhtmlxscheduler.js enthaltenen [vordefinierten Sprachpakete](#included-locales) verwenden oder ein eigenes Sprachpaket erstellen.

:::note
Das Sprachpaket kann zur Laufzeit gewechselt werden, die Änderung wird jedoch erst wirksam, nachdem der Scheduler vollständig durch einen Aufruf von **scheduler.render()** oder **scheduler.init()** neu gezeichnet wurde.
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~


[Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)


## Enthaltene Sprachpakete {#included-locales}

:::note
Sowohl die Common- als auch die Recurring-Sprachdateien sind Teil der **dhtmlxscheduler.js** Datei.
:::

dhtmlxScheduler bietet Lokalisierung für folgende Sprachen:

<table >
<tr><td markdown='1'>Sprache</td><td markdown='1'>Sprachcode</td></tr>
<tr><td markdown='1'>Arabisch</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>Weißrussisch</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>Katalanisch</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>Chinesisch</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>Tschechisch</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>Dänisch</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>Niederländisch</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>Englisch</td><td markdown='1'>en (Standard)</td></tr>
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

## Eigenes Sprachpaket erstellen

:::note
Das Objekt [scheduler.i18n](api/other/i18n.md) ist seit v6.0 verfügbar. In früheren Versionen wurde das Objekt [scheduler.locale](api/other/locale.md) verwendet. Weitere Informationen finden Sie im [Migrationsartikel](migration.md#53---60).
:::

Der einfachste Weg, ein eigenes Sprachpaket zu erstellen, besteht darin, das Standard-Englisch-Sprachpaket aus dem folgenden Beispiel zu kopieren und die Zeichenketten in Ihre bevorzugte Sprache zu übersetzen.

Es gibt zwei Möglichkeiten, ein eigenes Sprachpaket im Scheduler zu verwenden:

- Überschreiben Sie das aktuelle Sprachpaket, indem Sie ein Sprachobjekt an die Methode **setLocale** übergeben:

~~~js
scheduler.i18n.setLocale(localeObject);    
~~~

Wenn Sie nur einen Teil des Sprachobjekts angeben, werden Ihre Bezeichnungen mit dem bestehenden Sprachpaket zusammengeführt:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Day",
    }
});    
~~~

- Oder, wenn Sie zwischen mehreren Sprachpaketen wechseln möchten, können Sie ein Sprachpaket mit einem eigenen Sprachcode hinzufügen und dann darauf umschalten:

~~~js
scheduler.i18n.addLocale("lang", localeObject);    
scheduler.i18n.setLocale("lang");
~~~

:::note
Beachten Sie, dass das Umschalten auf ein eigenes Sprachpaket die Oberfläche der Anwendung verändert. Überprüfen und passen Sie ggf. alle sprachabhängigen Elemente an, damit der Scheduler korrekt in der neuen Sprache angezeigt wird.
:::

**Hinweis**

- Sie können Ihre eigene Sprachdatei an **support@dhtmlx.com** senden; möglicherweise wird sie in einer zukünftigen Version aufgenommen;
- Das aktive Sprachpaket ist über das Objekt **scheduler.locale** zugänglich;
- **monthFull** enthält die vollständigen Monatsnamen, beginnend mit Januar;
- **monthShort** enthält die abgekürzten Monatsnamen, beginnend mit Januar;
- **dayFull** enthält die vollständigen Tagesnamen, beginnend mit Sonntag;
- **dayShort** enthält die abgekürzten Tagesnamen, beginnend mit Sonntag.


~~~js title="English locale definition"
scheduler.i18n.setLocale({
    date:{
        month_full: ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"],
        month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
            "Friday", "Saturday"],
        day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    labels:{
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

        /*recurring events*/
        confirm_recurring:"Edit recurring event",
        section_recurring:"Repeat event",
        button_recurring:"Disabled",
        button_recurring_open:"Enabled",
        button_edit_series: "All events",
        button_edit_occurrence: "This event",
        button_edit_occurrence_and_following: "This and following events",

        /*agenda view extension*/
        agenda_tab: "Agenda",
        date: "Date",
        description: "Description",

        /*year view extension*/
        year_tab: "Year",

        /* week agenda extension */
        week_agenda_tab: "Agenda",

        /*grid view extension*/
        grid_tab: "Grid",

        /* touch tooltip*/
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


[Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)


## Zusätzliche Hinweise

- Wenn das Label **confirm_closing** oder **confirm_deleting** nicht gesetzt ist, erscheint der zugehörige Bestätigungsdialog nicht (die Aktion wird automatisch bestätigt);
- Bezeichnungen wie **section_(name)** entsprechen dem Lightbox-Abschnitt mit diesem Namen.
- Das Label **new_event** definiert den Standardtext für neue Ereignisse.
