---
title: "本地化"
sidebar_label: "本地化"
---

# 本地化

该库通过提供多种预定义语言环境以及自定义选项，支持调度器的本地化。默认情况下，DHTMLX Scheduler 提供[英文语言环境](api/other/locale.md)。

## 激活

要设置调度器的语言，只需在 [scheduler.i18n](api/other/i18n.md) 对象上使用 **setLocale** 方法激活所需的语言环境。

~~~js
scheduler.i18n.setLocale("fr");    
~~~

你可以使用 dhtmlxscheduler.js 文件中包含的[预定义语言环境](#included-locales)，也可以创建自定义语言环境。

:::note
语言环境可以动态切换，但只有在通过调用 **scheduler.render()** 或 **scheduler.init()** 完全重绘调度器后，更新才会生效。
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~


[Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)


## 已包含的语言环境 {#included-locales}

:::note
Common 和 Recurring 语言环境文件均包含在 **dhtmlxscheduler.js** 文件中。
:::

dhtmlxScheduler 支持以下语言的本地化:

<table >
<tr><td markdown='1'>语言</td><td markdown='1'>语言代码</td></tr>
<tr><td markdown='1'>阿拉伯语</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>白俄罗斯语</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>加泰罗尼亚语</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>中文</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>捷克语</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>丹麦语</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>荷兰语</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>英语</td><td markdown='1'>en (默认)</td></tr>
<tr><td markdown='1'>芬兰语</td><td markdown='1'>fi</td></tr>
<tr><td markdown='1'>法语</td><td markdown='1'>fr</td></tr>
<tr><td markdown='1'>德语</td><td markdown='1'>de</td></tr>
<tr><td markdown='1'>希腊语</td><td markdown='1'>el</td></tr>
<tr><td markdown='1'>希伯来语</td><td markdown='1'>he</td></tr>
<tr><td markdown='1'>匈牙利语</td><td markdown='1'>hu</td></tr>
<tr><td markdown='1'>印度尼西亚语</td><td markdown='1'>id</td></tr>
<tr><td markdown='1'>意大利语</td><td markdown='1'>it</td></tr>
<tr><td markdown='1'>日语</td><td markdown='1'>jp</td></tr>
<tr><td markdown='1'>挪威语</td><td markdown='1'>no</td></tr>
<tr><td markdown='1'>挪威博克马尔语</td><td markdown='1'>nb</td></tr>
<tr><td markdown='1'>波兰语</td><td markdown='1'>pl</td></tr>
<tr><td markdown='1'>葡萄牙语</td><td markdown='1'>pt</td></tr>
<tr><td markdown='1'>罗马尼亚语</td><td markdown='1'>ro</td></tr>
<tr><td markdown='1'>俄语</td><td markdown='1'>ru</td></tr>
<tr><td markdown='1'>斯洛伐克语</td><td markdown='1'>sk</td></tr>
<tr><td markdown='1'>斯洛文尼亚语</td><td markdown='1'>si</td></tr>
<tr><td markdown='1'>西班牙语</td><td markdown='1'>es</td></tr>
<tr><td markdown='1'>瑞典语</td><td markdown='1'>sv</td></tr>
<tr><td markdown='1'>土耳其语</td><td markdown='1'>tr</td></tr>
<tr><td markdown='1'>乌克兰语</td><td markdown='1'>ua</td></tr>
</table>

## 创建自定义语言环境

:::note
[scheduler.i18n](api/other/i18n.md) 对象自 v6.0 起可用。在早期版本中，使用的是 [scheduler.locale](api/other/locale.md) 对象。详情请参阅 [迁移指南](migration.md#53---60)。
:::

创建自定义语言环境最简单的方法是从下方示例复制默认英文语言环境，并将字符串翻译为你希望的语言。

有两种方式将自定义语言环境应用到调度器:

- 通过向 **setLocale** 方法传递语言环境对象，覆盖当前语言环境:

~~~js
scheduler.i18n.setLocale(localeObject);    
~~~

如果只提供部分语言环境对象，调度器会将你的标签与现有语言环境合并:

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Day",
    }
});    
~~~

- 或者，如果你需要在多个语言环境之间切换，可以添加带自定义语言代码的语言环境，然后切换到它:

~~~js
scheduler.i18n.addLocale("lang", localeObject);    
scheduler.i18n.setLocale("lang");
~~~

:::note
请注意，切换到自定义语言环境会修改应用界面。请确保检查并调整所有依赖于语言环境的元素，以确保调度器在新语言下正确显示。
:::

**注意** 

- 你可以将自定义语言环境文件发送至 **support@dhtmlx.com**，有可能被包含在未来的版本中；
- 当前激活的语言环境可通过 **scheduler.locale** 对象访问；
- **monthFull** 包含从一月开始的完整月份名称；
- **monthShort** 包含从一月开始的月份缩写；
- **dayFull** 包含从星期天开始的完整星期名称；
- **dayShort** 包含从星期天开始的星期缩写。

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


## 附加说明

- 如果未设置 **confirm_closing** 或 **confirm_deleting** 标签，相关确认对话框将不会出现（将自动确认）；
- 类似 **section_(name)** 的标签对应 lightbox 中该名称的部分。
- **new_event** 标签定义新事件默认显示的文本。

