---
sidebar_label: "locale"
title: "locale config"
description: "스케줄러의 지역별 레이블을 포함하는 객체"
---

# locale

### Description

@short: 스케줄러의 지역별 레이블을 포함하는 객체

@signature: locale: SchedulerLocale

### Example

~~~jsx
scheduler.i18n.setLocale({
    date:{
        month_full:["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"],
        month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        day_full:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
            "Friday", "Saturday"],
        day_short:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    labels:{
        dhx_cal_today_button:"Today",
        day_tab:"Day",
        week_tab:"Week",
        month_tab:"Month",
        new_event:"New event",
        icon_save:"Save",
        icon_cancel:"Cancel",
        icon_details:"Details",
        icon_edit:"Edit",
        icon_delete:"Delete",
        confirm_closing:"",// Your changes will be lost, are your sure?
        confirm_deleting:"Event will be deleted permanently, are you sure?",
        section_description:"Description",
        section_time:"Time period",
        full_day:"Full day",

        /*recurring events*/
        confirm_recurring:"Edit recurring event",
        section_recurring:"Repeat event",
        button_recurring:"Disabled",
        button_recurring_open:"Enabled",
        button_edit_series: "All events",
        button_edit_occurrence: "This event",
        button_edit_occurrence_and_following: "This and following events",


        /*agenda view extension*/
        agenda_tab:"Agenda",
        date:"Date",
        description:"Description",

        /*year view extension*/
        year_tab:"Year",

        /* week agenda extension */
        week_agenda_tab:"Agenda",

        /*grid view extension*/
        grid_tab:"Grid",

        /* touch tooltip*/
        drag_to_create:"Drag to create",
        drag_to_move:"Drag to move",

        /* dhtmlx message default buttons */
        message_ok:"OK",
        message_cancel:"Cancel",

        /* wai aria labels for non-text controls */
        next:"Next",
        prev:"Previous",
        year:"Year",
        month:"Month",
        day:"Day",
        hour:"Hour",
        minute:"Minute"
    }
)};

console.log(scheduler.locale);
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

현재 locale은 **scheduler.locale** 객체를 통해 접근할 수 있으며, 다음과 같이 직접 업데이트할 수 있습니다:

~~~js
scheduler.locale.labels.day_tab = "Day";
~~~

이는 다음과 같이 사용하는 것과 동일합니다:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Day"
    }
});    
~~~

두 방법 모두 작동하며 지원됩니다. 로컬라이제이션 관리를 위해 [scheduler.i18n](api/other/i18n.md) API 사용을 권장합니다.

### Related Guides
- ["Localization"](guides/localization.md)
