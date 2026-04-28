---
title: "현지화"
sidebar_label: "현지화"
---

# 현지화

라이브러리는 미리 정의된 로케일을 다수 제공하고 커스텀 로케일을 생성할 수 있는 방법을 통해 스케줄러의 로컬라이제이션을 지원합니다. 기본적으로 DHTMLX Scheduler는 [영어 로케일](api/other/locale.md)을 사용합니다.

## 활성화

스케줄러에 원하는 언어를 설정하려면 [scheduler.i18n](api/other/i18n.md) 객체의 `setLocale()` 메서드를 통해 필요한 로케일을 활성화합니다.

~~~js
scheduler.i18n.setLocale("fr");
~~~

번들에 포함된 dhtmlxscheduler.js 파일과 함께 제공되는 [미리 정의된 로케일들](#included-locales)을 사용하거나 커스텀 로케일을 정의할 수 있습니다.

:::note
로케일은 동적으로 전환할 수 있지만, 변경 사항은 Scheduler를 전체 다시 그린 뒤에만 적용됩니다(`scheduler.render()` 또는 `scheduler.init()` 호출).
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~

### 관련 샘플
- [Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)

## 포함된 로케일들

:::note
Common 로케일 파일과 Recurring 로케일 파일은 모두 `dhtmlxscheduler.js` 파일에 포함되어 있습니다.
:::


dhtmlxScheduler는 다음 언어들에 대한 로컬라이제이션을 포함합니다:

<table >
<tr><td markdown='1' >언어</td><td markdown='1'>언어 코드</td></tr>
<tr><td markdown='1'>아랍어</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>벨라루스어</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>카탈로니아어</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>중국어</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>체코어</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>덴마크어</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>네덜란드어</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>영어</td><td markdown='1'>en (default)</td></tr>
<tr><td markdown='1'>핀란드어</td><td markdown='1'>fi</td></tr>
<tr><td markdown='1'>프랑스어</td><td markdown='1'>fr</td></tr>
<tr><td markdown='1'>독일어</td><td markdown='1'>de</td></tr>
<tr><td markdown='1'>그리스어</td><td markdown='1'>el</td></tr>
<tr><td markdown='1'>히브리어</td><td markdown='1'>he</td></tr>
<tr><td markdown='1'>헝가리어</td><td markdown='1'>hu</td></tr>
<tr><td markdown='1'>인도네시아어</td><td markdown='1'>id</td></tr>
<tr><td markdown='1'>이탈리아어</td><td markdown='1'>it</td></tr>
<tr><td markdown='1'>일본어</td><td markdown='1'>jp</td></tr>
<tr><td markdown='1'>노르웨이어</td><td markdown='1'>no</td></tr>
<tr><td markdown='1'>노르웨이어 부크말</td><td markdown='1'>nb</td></tr>
<tr><td markdown='1'>폴란드어</td><td markdown='1'>pl</td></tr>
<tr><td markdown='1'>포르투갈어</td><td markdown='1'>pt</td></tr>
<tr><td markdown='1'>루마니아어</td><td markdown='1'>ro</td></tr>
<tr><td markdown='1'>러시아어</td><td markdown='1'>ru</td></tr>
<tr><td markdown='1'>슬로바키아어</td><td markdown='1'>sk</td></tr>
<tr><td markdown='1'>슬로베니아어</td><td markdown='1'>si</td></tr>
<tr><td markdown='1'>스페인어</td><td markdown='1'>es</td></tr>
<tr><td markdown='1'>스웨덴어</td><td markdown='1'>sv</td></tr>
<tr><td markdown='1'>터키어</td><td markdown='1'>tr</td></tr>
<tr><td markdown='1'>우크라이나어</td><td markdown='1'>ua</td></tr>
</table>

## 커스텀 로케일 만들기

:::note
[v6.0]부터 scheduler.i18n 객체가 추가되었습니다. 이전 버전에서는 [scheduler.locale] 객체가 사용되었습니다. 자세한 내용은 Migration 문서(migration.md#53---60)를 참조하세요.
:::

커스텀 로케일을 만드는 가장 쉬운 방법은 아래 샘플에서 기본 영어 로케일을 복사한 뒤 필요한 언어로 모든 문자열을 번역하는 것입니다.

커스텀 로케일은 Scheduler에 두 가지 방식으로 적용할 수 있습니다.

- 현재 로케일을 대체하려면 로케일 객체를 인수로 전달하여 `setLocale()` 메서드를 호출합니다:

~~~js
scheduler.i18n.setLocale(localeObject);
~~~

참고: 부분 로케일 객체를 제공하면 스케줄러는 현재 로케일에 라벨을 합칩니다:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "일",
    }
});
~~~

- 또는 여러 로케일 간 전환이 필요하다면 커스텀 언어 코드로 로케일을 정의하고 나중에 스케줄러를 해당 로케일로 전환합니다:

~~~js
scheduler.i18n.addLocale("lang", localeObject);
scheduler.i18n.setLocale("lang");
~~~

:::note
앱에서 커스텀 로케일을 활성화하면 앱의 인터페이스에 변경이 생깁니다. 새로운 언어에서 스케줄러가 올바르게 보이도록 로케일에 의존하는 모든 요소를 확인하고(필요 시) 재정의하십시오.
:::

**참고**

- 커스텀 로케일 파일을 **support@dhtmlx.com**로 보내주시면 다음 릴리스에 포함해 드립니다.
- 현재 활성화된 로케일은 `scheduler.locale` 객체에서도 확인할 수 있습니다.
- `monthFull` - 1월부터 시작하는 달의 전체 이름
- `monthShort` - 1월부터 시작하는 달의 짧은 이름
- `dayFull` - 일요일부터 시작하는 주의 요일의 전체 이름
- `dayShort` - 일요일부터 시작하는 주의 요일의 짧은 이름

### 영어 로케일 정의
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

### 관련 샘플
- [Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)

## 추가 메모

- `confirm_closing` 또는 `confirm_deleting` 레이블이 정의되지 않으면 관련 확인 대화 상자가 전혀 표시되지 않습니다(자동 확인).
- `section_(name)` 레이블은 관련 이름의 라이트박스 섹션을 가리킵니다.
- `new_event` 레이블은 새 이벤트의 기본 텍스트를 정의합니다.