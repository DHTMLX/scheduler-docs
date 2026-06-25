--- 
title: "本地化" 
sidebar_label: "本地化" 
---

# 本地化

该库通过提供若干预定义的区域设置以及创建自定义区域设置的方法，来支持调度器的本地化。默认情况下，DHTMLX Scheduler 使用 [English locale](api/other/locale.md)。

## 激活

要为调度程序设置所需语言，请通过 [scheduler.i18n](api/other/i18n.md) 对象的 `setLocale()` 方法激活相应的区域设置。

~~~js
scheduler.i18n.setLocale("fr");
~~~

您可以使用并更新捆绑在 dhtmlxscheduler.js 文件中的任意 [预定义区域设置](#included-locales)，也可以定义自定义区域设置。

:::note
区域设置可以动态切换，但只有在通过 `scheduler.render()` 或 `scheduler.init()` 调用完成重绘后，变更才会生效。
:::

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~

### 相关示例
- [Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)

## 已包含的区域设置

:::note
Common 区域设置文件和 Recurring 区域设置文件都位于 `dhtmlxscheduler.js` 文件中。
:::

dhtmlxScheduler 包含以下语言的本地化：

<table >
<tr><td markdown='1' >语言</td><td markdown='1'>语言代码</td></tr>
<tr><td markdown='1'>阿拉伯语</td><td markdown='1'>ar</td></tr>
<tr><td markdown='1'>白俄罗斯语</td><td markdown='1'>be</td></tr>
<tr><td markdown='1'>加泰罗尼亚语</td><td markdown='1'>ca</td></tr>
<tr><td markdown='1'>中文</td><td markdown='1'>cn</td></tr>
<tr><td markdown='1'>捷克语</td><td markdown='1'>cs</td></tr>
<tr><td markdown='1'>丹麦语</td><td markdown='1'>da</td></tr>
<tr><td markdown='1'>荷兰语</td><td markdown='1'>nl</td></tr>
<tr><td markdown='1'>英语</td><td markdown='1'>en (default)</td></tr>
<tr><td markdown='1'>芬兰语</td><td markdown='1'>fi</td></tr>
<tr><td markdown='1'>法语</td><td markdown='1'>fr</td></tr>
<tr><td markdown='1'>德语</td><td markdown='1'>de</td></tr>
<tr><td markdown='1'>希腊语</td><td markdown='1'>el</td></tr>
<tr><td markdown='1'>希伯来语</td><td markdown='1'>he</td></tr>
<tr><td markdown='1'>匈牙利语</td><td markdown='1'>hu</td></tr>
<tr><td markdown='1'>印尼语</td><td markdown='1'>id</td></tr>
<tr><td markdown='1'>意大利语</td><td markdown='1'>it</td></tr>
<tr><td markdown='1'>日语</td><td markdown='1'>jp</td></tr>
<tr><td markdown='1'>挪威语</td><td markdown='1'>no</td></tr>
<tr><td markdown='1'>挪威 Bokmål</td><td markdown='1'>nb</td></tr>
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

## 创建自定义区域设置

:::note
在 v6.0 中新增了 [scheduler.i18n](api/other/i18n.md) 对象。在早期版本中，使用的是 [scheduler.locale](api/other/locale.md) 对象。欲了解更多信息，请参阅 [迁移文章](migration.md#53---60)。
:::

创建自定义区域设置的最简单方法，是从下面的示例中复制默认的英语区域设置，并将所有字符串翻译成所需语言。

自定义区域设置可以通过两种方式应用到 Scheduler：

- 要么通过将区域设置对象作为参数传递给 `setLocale()` 方法来覆盖当前区域设置：

~~~js
scheduler.i18n.setLocale(localeObject);
~~~

注意，如果你提供了部分区域设置对象，调度程序会将你的标签添加到当前区域设置中：

~~~js
scheduler.i18n.setLocale({
    labels: {
        day_tab: "Day",
    }
});
~~~

- 要么，如果你需要在多个区域设置之间切换，请使用自定义语言代码定义区域设置，然后稍后将调度程序切换到它：

~~~js
scheduler.i18n.addLocale("lang", localeObject);
scheduler.i18n.setLocale("lang");
~~~

:::note
注意，在应用中激活自定义区域设置会导致应用界面发生变化。请检查并（如有需要）重新定义所有依赖于区域设置的元素，以确保调度程序在新语言下看起来正常。
:::

**注**

- 你可以将自定义区域设置文件发送至 **support@dhtmlx.com**，以便我们在下一个版本中加入。
- 当前活动的区域设置也在 `scheduler.locale` 对象中可用。
- `monthFull` - 从一月起的月份全称
- `monthShort` - 从一月起的月份简称
- `dayFull` - 从星期日起的周日全称
- `dayShort` - 从星期日起的周日简称

### English locale 定义
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

### 相关示例
- [Localization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/07_locale_usage.html)

## 其他说明

- 如果未定义 `confirm_closing` 或 `confirm_deleting` 标签，相应的确认对话框将完全不显示（自动确认）
- `section_(name)` 标签指的是相关名称的轻盒（lightbox）部分
- `new_event` 标签定义新事件的默认文本