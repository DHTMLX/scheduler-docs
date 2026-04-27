---
title: "重复事件"
sidebar_label: "重复事件"
---

# 重复事件

重复事件是事件日历应用中的常见功能，允许用户创建按指定间隔重复的事件。从 v7.1 版本开始，Scheduler 使用基于 RFC-5545 的格式来表示重复事件。

本文将解释如何在 Scheduler 中使用重复事件以及如何将它们存储到数据库中。

:::note
可以在此处找到重复事件传统格式的描述 [here](guides/recurring-events-legacy.md)
:::

默认情况下，Scheduler 不支持重复事件。若要提供此功能，需要在页面上启用一个特殊扩展 - **recurring**：

~~~js
scheduler.plugins({
    recurring: true
});
~~~

一旦启用对重复事件的支持，弹出框将开始显示如下所示：

![recurring_lightbox](/img/recurring_lightbox.png)


## 配置选项

库提供了以下选项来配置重复事件：

- [repeat_date](api/config/repeat_date.md) - 设置在 'recurring' 弹出框中 'End by' 字段的日期格式


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[重复事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## ‘Recurring’ 弹出框

默认情况下，一旦启用重复扩展，弹出框将再多出一个部分 - "Repeat event"。
默认的 'recurring' 弹出框定义如下：

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~


[重复事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 格式描述

重复事件在数据库中存储为单条记录，包含普通事件的所有字段外加若干附加属性：

1. **start_date** - (_datetime_) 定义系列的开始日期
2. **end_date** - (_datetime_) 定义系列的结束日期
3. **rrule** - (_string_) 定义重复规则
4. **duration** - (_number_) 该重复实例的持续时间
5. **recurring_event_id** - (_string|number_) 父系列的 ID，仅在修改或删除的发生中填充
6. **original_start** - (_datetime_) 编辑实例的原始日期，仅在修改或删除的发生中填充
7. **deleted** - (_boolean_) 指定系列的已删除实例，仅在已删除的发生中填充

**rrule** 遵循 RFC-5545 中规定的 iCalendar 格式，详细描述了控制重复模式的频率、间隔及其他参数。

### 与 iCalendar 格式的差异

我们的格式在两个关键点上与 iCalendar 不同：

#### 分离存储 STDATE 和 DTEND：

在 iCalendar 格式中，重复系列的开始日期和结束日期通常作为 **RRULE** 字符串的一部分，作为 **STDATE** 和 **DTEND** 属性
存在。
在我们的格式中，**stdate** 与 **dtend** 作为独立字段存储。这种分离便于按日期对重复事件进行更容易的操作与查询，而无需解析 **RRULE** 字符串。

以下是一个示例，表示从 2027-06-01 开始每周一重复，直到 2027-12-01 的重复事件系列：

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

#### 处理异常

异常，也称为修改或删除的系列发生，是以独立的事件记录存储的，并与其父系列相连。
异常有三个附加属性：**recurring_event_id**、**original_start** 和 **deleted**。
这些属性使我们能够轻松识别修改或删除的实例及其与父系列的关系。

:::note
注意，与传统的 iCalendar 格式不同，异常（修改或删除的实例）并未储存在该系列的 **RRULE** 的 **EXDATE** 属性中。
:::

以下是不带一个修改的发生和一个删除的发生的重复系列示例：

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

对于 `2027-06-10 09:00:00` 的重复事件，将被 `Special Team Meeting` 记录所替代；而原计划在 `2027-06-17 09:00:00` 的事件将被跳过。

请注意，修改或删除发生的 **rrule** 将被忽略。

被删除实例的 **text**、**start_date**、和 **end_date** 也会被忽略，这些字段的值不会影响 Scheduler 的行为。

## 编辑/删除系列中的某个发生

可以删除或编辑系列中的特定发生。

### 重要提示

- 对重复事件的每次更新，数据库中都会创建一个单独的记录。
- 具体的发生通过 **recurring_event_id** 属性指向父事件。
- 一旦你在系列中编辑了某个发生，该更新的 **original_start** 字段将存储如果未被编辑，该发生应发生的日期，而不是实际事件长度。因此，如果该发生在 2027-07-27 15:00 发生，后被移动到 2027-07-30 15:00，则时间戳将反映最初的日期。

### 服务器端逻辑

除了额外字段之外，服务器端控制器还需要添加特定逻辑：

- 如果一个已删除的实例被插入，服务器响应必须带有 “deleted” 状态。
  - 通过 **deleted** 属性的非空值来标识已删除的实例。
- 如果一个系列被修改，系列的所有修改和删除的发生都应被删除。
  - 系列可以通过 **rrule** 属性的非空值以及 **recurring_event_id** 为空值来标识。
  - 该系列的修改发生都包含在 **recurring_event_id** 与系列的 **id** 相匹配的记录中。
- 如果具有非空 **recurring_event_id** 的事件被删除，则需要将其更新为 deleted="true" 而不是删除。

:::note
你可以在这里找到完整的代码示例 [integrations/howtostart-guides.md](integrations/howtostart-guides.md)
:::


## 自定义灯箱中重复块的控件

从版本 4.2 开始，Scheduler 允许你为灯箱的 'recurring' 块指定自定义 HTML。

#### 你可以进行哪些自定义？

1. 修改标记（HTML）
2. 删除不必要的元素（例如，“ yearly” 重复类型）
3. 为输入设置默认值（例如希望所有系列都以“无结束日期”创建）

### 自定义重复块默认模板

灯箱的重复块控件的默认模板如下（其中 `loc` 对象是 Scheduler 的 locale 对象，即区域相关的标签）：

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

#### 主要的重复选择控件

基本上，灯箱的重复块包含主要的重复选择控件，具有以下 5 种默认重复类型及其选项：“每天”、“每周”、“每月”、“每年”、“工作日”。此外，还包括用于创建所需类型的 “Custom” 选项，以及用于禁用重复的 “Never” 选项：

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

对于 “Custom” 重复类型，有特殊的重复单位： "Day"、"Week"、"Month"、"Year" 以及重复间隔输入。
"Week"、"Month" 和 "Year" 单位有其自己的部分，并提供了特定的重复选项（默认情况下，这些部分在选择所需类型之前均为隐藏）：

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

#### 指定重复结束的区块

重复结束由以下值的选择控件定义：“NEVER”、“ON”、“AFTER”。如果选择了“AFTER”，将出现用于指定重复事件数量的附加输入；如果选择了“ON”，将出现一个日期输入：

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
~~~

### 自定义块的示例
让我们来创建一个自定义重复块的示例。设想你想移除 “monthly” 和 “yearly” 重复类型，并使所有事件都具有“无结束日期”的选项（即移除用于指定重复结束的块）。

1. 定义自定义表单的标记并将其放在页面上的某个位置（你可以先从复制默认模板开始）：

~~~html
<!-- 注意需要为你的自定义重复表单指定 id  -->
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

2. 将灯箱的 "recurring" 区段的 **form** 参数设为自定义表单的 id：

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", 
        form: "my_recurring_form" }, /*!*/
    { name: "time", type: "time", map_to: "auto", height: 72 },
];
~~~

带有自定义重复块的灯箱的结果如下图所示：

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

下面的片段演示了如何实现上述带自定义重复块的灯箱：

相关示例 [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)
  
### 更改重复块的注意事项

在开始对灯箱的重复块应用自定义配置之前，请注意以下几点：

1. 输入框的 **name** 属性是硬编码的；具有不同名称的输入将被忽略。
2. 除了那些需要直接输入的输入框外，其它输入框的 **value** 属性是固定的。
3. 当你指定一个新的表单时，Scheduler 不会直接使用它，而是简单地在灯箱模板中复制你的 HTML 结构。
这意味着你在代码中附加到表单 DOMElements 的所有事件处理程序或自定义属性都不会应用到灯箱中的表单上。
如果你想附加事件处理程序，需要在 HTML 中以内联属性的方式添加，或在灯箱显示时将处理程序附加到表单上。

:::note
请注意，Scheduler 不会直接使用你原始的 HTML 表单，而只是把它复制到灯箱模板中。
:::


例如：

- 以下行将被复制到灯箱中：

~~~html
<input onclick="handler()"> 
~~~

- 下面这行不会被复制到灯箱中：

~~~js
addEventListener(node, "click", function(){...})
~~~

## 自定义确认模态框 {#customconfirmationmodal}

当用户编辑或拖动重复事件时，调度程序会显示一个内置模态框，询问是修改仅此一次、修改此及其后续事件，还是整个系列。你可以通过覆盖 `scheduler.ext.recurring.confirm` 来替换它。

~~~js
scheduler.ext.recurring.confirm = function(context) {
  // context 包含：
  // - origin: "lightbox" | "dnd"
  // - occurrence: 发生事件对象
  // - series: 父系列事件对象
  // - labels: { title, ok, cancel, occurrence, following, series }
  // - options: ["occurrence", "following", "series"]
  //
  // 返回下列值之一: "occurrence", "following", "series", 或 null 以取消。
  // 也可以返回 Promise 以支持异步 UI。

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

上下文对象具有以下属性：

| 属性 | 类型 | 说明 |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | 操作是从灯箱触发还是拖放触发 |
| `occurrence` | `object` | 正在编辑的具体发生对象 |
| `series` | `object` | 父重复事件 |
| `labels` | `object` | 本地化字符串：`title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | 可用选项，例如 `["occurrence", "following", "series"]` |

该函数必须返回 `"occurrence"`、`"following"`、`"series"`，或 `null` 以取消。它可以直接返回值或作为 Promise 返回。

对于 React 的实现，请参见 [React Scheduler 文档](integrations/react/overview.md#customizingtherecurrenceconfirmationmodal)。


## 传统格式的重复事件

直到 v7.1，Scheduler 使用自定义格式来表示重复事件，您可以在此处找到该格式的详细信息 [guides/recurring-events-legacy.md](guides/recurring-events-legacy.md).