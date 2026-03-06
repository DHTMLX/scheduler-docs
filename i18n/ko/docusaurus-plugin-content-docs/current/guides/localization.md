---
title: "Localization"
sidebar_label: "Localization"
---

# Localization 

이 라이브러리는 다양한 미리 정의된 로케일과 직접 로케일을 생성할 수 있는 옵션을 제공하여 스케줄러의 현지화를 지원합니다. 기본적으로 DHTMLX Scheduler는 [영어 로케일](api/other/locale.md)을 기본으로 제공합니다.

## 활성화 {#activation}

스케줄러의 언어를 설정하려면 [scheduler.i18n](api/other/i18n.md) 객체의 **setLocale** 메서드를 사용하여 원하는 로케일을 활성화하면 됩니다.

~~~js
scheduler.i18n.setLocale("fr");    
~~~

dhtmlxscheduler.js 파일에 포함된 [미리 정의된 로케일](#included-locales) 중 하나를 사용할 수 있으며, 또는 사용자 정의 로케일을 생성할 수도 있습니다.

:::note
로케일은 실시간으로 변경할 수 있지만, 변경 사항은 **scheduler.render()** 또는 **scheduler.init()**을 호출하여 스케줄러를 완전히 다시 그린 후에만 적용됩니다.
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~


[Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)


## 포함된 로케일 {#included-locales}

:::note
Common 및 Recurring 로케일 파일 모두 **dhtmlxscheduler.js** 파일에 포함되어 있습니다.
:::

dhtmlxScheduler는 다음 언어에 대한 현지화를 제공합니다:

<table >
<tr><td markdown='1'>언어</td><td markdown='1'>언어 코드</td></tr>
<tr><td markdown='1'>Arabic</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>Belarusian</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>Catalan</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>Chinese</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>Czech</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>Danish</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>Dutch</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>English</td><td markdown='1'>en (default)</td></tr>
<tr><td markdown='1'>Finnish</td><td markdown='1'>fi</td></tr>
<tr><td markdown='1'>French</td><td markdown='1'>fr</td></tr>
<tr><td markdown='1'>German</td><td markdown='1'>de</td></tr>
<tr><td markdown='1'>Greek</td><td markdown='1'>el</td></tr>
<tr><td markdown='1'>Hebrew</td><td markdown='1'>he</td></tr>
<tr><td markdown='1'>Hungarian</td><td markdown='1'>hu</td></tr>
<tr><td markdown='1'>Indonesian</td><td markdown='1'>id</td></tr>
<tr><td markdown='1'>Italian</td><td markdown='1'>it</td></tr>
<tr><td markdown='1'>Japanese</td><td markdown='1'>jp</td></tr>
<tr><td markdown='1'>Norwegian</td><td markdown='1'>no</td></tr>
<tr><td markdown='1'>Norwegian Bokmål</td><td markdown='1'>nb</td></tr>
<tr><td markdown='1'>Polish</td><td markdown='1'>pl</td></tr>
<tr><td markdown='1'>Portuguese</td><td markdown='1'>pt</td></tr>
<tr><td markdown='1'>Romanian</td><td markdown='1'>ro</td></tr>
<tr><td markdown='1'>Russian</td><td markdown='1'>ru</td></tr>
<tr><td markdown='1'>Slovak</td><td markdown='1'>sk</td></tr>
<tr><td markdown='1'>Slovenian</td><td markdown='1'>si</td></tr>
<tr><td markdown='1'>Spanish</td><td markdown='1'>es</td></tr>
<tr><td markdown='1'>Swedish</td><td markdown='1'>sv</td></tr>
<tr><td markdown='1'>Turkish</td><td markdown='1'>tr</td></tr>
<tr><td markdown='1'>Ukrainian</td><td markdown='1'>ua</td></tr>
</table>

## 사용자 정의 로케일 생성 {#creatingcustomlocale}

:::note
[scheduler.i18n](api/other/i18n.md) 객체는 v6.0부터 제공됩니다. 이전 버전에서는 [scheduler.locale](api/other/locale.md) 객체가 사용되었습니다. 자세한 내용은 [Migration article](migration.md#53---60)을 참고하세요.
:::

사용자 정의 로케일을 만드는 가장 간단한 방법은 아래 예시에서 기본 영어 로케일을 복사하여 원하는 언어로 문자열을 번역하는 것입니다.

사용자 정의 로케일을 Scheduler에 적용하는 방법은 두 가지가 있습니다:

- **setLocale** 메서드에 로케일 객체를 전달하여 현재 로케일을 덮어씁니다:

~~~js
scheduler.i18n.setLocale(localeObject);    
~~~

로케일 객체의 일부만 제공하면, scheduler는 기존 로케일에 해당 라벨만 병합합니다:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Day",
    }
});    
~~~

- 또는 여러 로케일 간 전환이 필요한 경우, 사용자 정의 언어 코드를 사용해 로케일을 추가한 후 전환할 수 있습니다:

~~~js
scheduler.i18n.addLocale("lang", localeObject);    
scheduler.i18n.setLocale("lang");
~~~

:::note
사용자 정의 로케일로 전환하면 앱의 인터페이스가 변경됩니다. 새로운 언어에서 스케줄러가 올바르게 표시되도록 로케일에 따라 달라질 수 있는 요소를 반드시 검토하고 조정하세요.
:::

**참고**

- 사용자 정의 로케일 파일을 **support@dhtmlx.com**으로 보내면, 향후 릴리즈에 포함될 수 있습니다.
- 활성화된 로케일은 **scheduler.locale** 객체를 통해 접근할 수 있습니다.
- **monthFull**에는 1월부터 시작하는 전체 월 이름이 포함됩니다.
- **monthShort**에는 1월부터 시작하는 월의 약어가 포함됩니다.
- **dayFull**에는 일요일부터 시작하는 전체 요일명이 포함됩니다.
- **dayShort**에는 일요일부터 시작하는 요일의 약어가 포함됩니다.

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


## 추가 참고 사항 {#additionalnotes}

- **confirm_closing** 또는 **confirm_deleting** 라벨이 설정되지 않은 경우, 관련 확인 대화 상자는 표시되지 않으며(자동으로 확인됨);
- **section_(name)**와 같은 라벨은 해당 이름을 가진 lightbox 섹션에 대응합니다.
- **new_event** 라벨은 새 이벤트에 표시되는 기본 텍스트를 정의합니다.
