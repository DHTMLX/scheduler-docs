---
title: "Локализация"
sidebar_label: "Локализация"
---

# Локализация

Библиотека поддерживает локализацию для планировщика, предоставляя ряд предустановленных локалей и возможность создания собственных. По умолчанию DHTMLX Scheduler поставляется с [английской локалью](api/other/locale.md).

## Активация {#activation}

Чтобы установить язык планировщика, необходимо активировать нужную локаль с помощью метода **setLocale** объекта [scheduler.i18n](api/other/i18n.md).

~~~js
scheduler.i18n.setLocale("fr");    
~~~

Вы можете использовать любую из [предустановленных локалей](#included-locales), включённых в файл dhtmlxscheduler.js, либо создать свою собственную локаль.

:::note
Локаль можно менять "на лету", но изменения вступят в силу только после полной перерисовки Scheduler с помощью вызова **scheduler.render()** или **scheduler.init()**.
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~


[Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)


## Включённые локали {#included-locales}

:::note
Файлы локалей Common и Recurring входят в состав файла **dhtmlxscheduler.js**.
:::

dhtmlxScheduler поддерживает локализацию для следующих языков:

<table >
<tr><td markdown='1'>Язык</td><td markdown='1'>Код языка</td></tr>
<tr><td markdown='1'>Арабский</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>Белорусский</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>Каталонский</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>Китайский</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>Чешский</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>Датский</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>Голландский</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>Английский</td><td markdown='1'>en (по умолчанию)</td></tr>
<tr><td markdown='1'>Финский</td><td markdown='1'>fi</td></tr>
<tr><td markdown='1'>Французский</td><td markdown='1'>fr</td></tr>
<tr><td markdown='1'>Немецкий</td><td markdown='1'>de</td></tr>
<tr><td markdown='1'>Греческий</td><td markdown='1'>el</td></tr>
<tr><td markdown='1'>Иврит</td><td markdown='1'>he</td></tr>
<tr><td markdown='1'>Венгерский</td><td markdown='1'>hu</td></tr>
<tr><td markdown='1'>Индонезийский</td><td markdown='1'>id</td></tr>
<tr><td markdown='1'>Итальянский</td><td markdown='1'>it</td></tr>
<tr><td markdown='1'>Японский</td><td markdown='1'>jp</td></tr>
<tr><td markdown='1'>Норвежский</td><td markdown='1'>no</td></tr>
<tr><td markdown='1'>Норвежский букмол</td><td markdown='1'>nb</td></tr>
<tr><td markdown='1'>Польский</td><td markdown='1'>pl</td></tr>
<tr><td markdown='1'>Португальский</td><td markdown='1'>pt</td></tr>
<tr><td markdown='1'>Румынский</td><td markdown='1'>ro</td></tr>
<tr><td markdown='1'>Русский</td><td markdown='1'>ru</td></tr>
<tr><td markdown='1'>Словацкий</td><td markdown='1'>sk</td></tr>
<tr><td markdown='1'>Словенский</td><td markdown='1'>si</td></tr>
<tr><td markdown='1'>Испанский</td><td markdown='1'>es</td></tr>
<tr><td markdown='1'>Шведский</td><td markdown='1'>sv</td></tr>
<tr><td markdown='1'>Турецкий</td><td markdown='1'>tr</td></tr>
<tr><td markdown='1'>Украинский</td><td markdown='1'>ua</td></tr>
</table>

## Создание собственной локали {#creatingcustomlocale}

:::note
Объект [scheduler.i18n](api/other/i18n.md) доступен начиная с v6.0. В более ранних версиях использовался объект [scheduler.locale](api/other/locale.md). Подробнее см. в [статье по миграции](migration.md#53---60).
:::

Самый простой способ создать свою локаль - скопировать стандартную английскую локаль из примера ниже и перевести строки на нужный язык.

Есть два способа применить собственную локаль к Scheduler:

- Переопределить текущую локаль, передав объект локали в метод **setLocale**:

~~~js
scheduler.i18n.setLocale(localeObject);    
~~~

Если вы укажете только часть объекта локали, планировщик объединит ваши метки с существующей локалью:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Day",
    }
});    
~~~

- Или, если нужно переключаться между несколькими локалями, вы можете добавить локаль с собственным языковым кодом и затем переключиться на неё:

~~~js
scheduler.i18n.addLocale("lang", localeObject);    
scheduler.i18n.setLocale("lang");
~~~

:::note
Имейте в виду, что переключение на собственную локаль изменит интерфейс приложения. Проверьте и скорректируйте все элементы, зависящие от локали, чтобы планировщик корректно отображался на новом языке.
:::

**Примечание**

- Вы можете отправить свой файл локали на **support@dhtmlx.com**, и он может быть включён в будущие версии;
- Активная локаль доступна через объект **scheduler.locale**;
- **monthFull** содержит полные названия месяцев, начиная с января;
- **monthShort** содержит сокращённые названия месяцев, начиная с января;
- **dayFull** содержит полные названия дней недели, начиная с воскресенья;
- **dayShort** содержит сокращённые названия дней недели, начиная с воскресенья.


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


## Дополнительные замечания {#additionalnotes}

- Если метки **confirm_closing** или **confirm_deleting** не заданы, соответствующее окно подтверждения не появится (подтверждение произойдёт автоматически);
- Метки вида **section_(name)** соответствуют секции lightbox с таким именем.
- Метка **new_event** определяет текст по умолчанию для новых событий.
