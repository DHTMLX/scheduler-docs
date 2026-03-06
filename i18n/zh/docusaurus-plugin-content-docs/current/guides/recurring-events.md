---
title: "循环事件"
sidebar_label: "循环事件"
---

# 循环事件

循环事件是日历应用程序中的一个实用功能，允许用户设置按指定间隔重复的事件。从 7.1 版本开始，Scheduler 采用了 [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545) 标准格式来支持循环事件。

本指南将介绍如何在 Scheduler 中使用循环事件，以及如何将其保存到数据库中。

:::note
您可以在[这里](guides/recurring-events-legacy.md)查看旧版循环事件格式的说明。
:::

默认情况下，Scheduler 并未启用循环事件。要添加此功能，您需要在页面上激活一个特殊扩展 -- **recurring** 插件:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

启用循环事件后，lightbox 界面将会多出一个额外的部分，如下图所示:

![recurring_lightbox](/img/recurring_lightbox.png)

## 配置选项 {#configurationoptions}

该库为循环事件提供了以下配置选项:

- [repeat_date](api/config/repeat_date.md) - 控制 'recurring' lightbox 中"结束日期"字段所使用的日期格式。

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' lightbox {#recurringlightbox}

启用 recurring 扩展后，lightbox 会增加一个名为"Repeat event"的部分。'recurring' lightbox 的默认配置如下:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

您可以自由添加其他部分，但请确保"recurring"和"time"这两个部分必须保留。同时，"time"部分应始终放在"recurring"部分之后。


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 格式说明 {#formatdescription}

循环事件在数据库中以单条记录的形式保存，该记录包含所有标准事件字段以及一些额外属性:

1. **start_date** - (_datetime_) 表示系列的起始日期
2. **end_date** - (_datetime_) 表示系列的结束日期
3. **rrule** - (_string_) 定义循环规则
4. **duration** - (_number_) 每次循环实例的持续时间
5. **recurring_event_id** - (_string|number_) 父系列的 ID，仅在修改或删除实例时设置
6. **original_start** - (_datetime_) 被编辑实例的原始日期，仅在修改或删除实例时设置
7. **deleted** - (_boolean_) 标记为已删除的实例，仅在删除实例时设置

**rrule** 属性遵循 RFC-5545 中定义的 iCalendar 格式，用于指定频率、间隔及其他循环细节。

### 与 iCalendar 格式的区别

我们的格式与 iCalendar 格式有两点主要不同:

#### STDATE 和 DTEND 的单独存储

iCalendar 通常将循环系列的起止日期作为 **STDATE** 和 **DTEND** 属性包含在 **RRULE** 字符串中，而我们的格式则将 **start_date** 和 **end_date** 作为单独字段存储。这样可以更方便地按日期处理和查询循环事件，而无需解析 **RRULE** 字符串。

以下是一个每周一重复、从 2024 年 6 月 1 日至 2024 年 12 月 1 日的循环事件系列示例:

~~~
{
  "id": 1,
  "text": "Weekly Team Meeting",
  "start_date": "2024-06-03 09:00:00",
  "duration": 3600,
  "end_date": "2024-12-02 10:00:00",
  "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
  "recurring_event_id": null,
  "original_start": null
}
~~~

#### 异常情况的处理

异常情况（即被修改或删除的实例）会作为单独的事件记录存储，并与其父系列关联。这些异常记录包含三个额外属性:**recurring_event_id**、**original_start** 和 **deleted**。它们用于标识哪些实例已被更改或移除，以及它们与主系列的关系。

:::note
与标准 iCalendar 格式不同，异常（被修改或删除的实例）**不会**存储在 **RRULE** 的 **EXDATE** 属性中。
:::

以下是一个包含一个被修改和一个被删除实例的循环系列示例:
~~~
[
  {
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2024-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2024-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
  },
  {
    "id": 2,
    "text": "Special Team Meeting",
    "start_date": "2024-06-10 09:00:00",
    "end_date": "2024-06-10 11:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-10 09:00:00"
  },
  {
    "id": 3,
    "text": "Deleted Team Meeting",
    "start_date": "2024-06-17 09:00:00",
    "end_date": "2024-06-17 10:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-17 09:00:00",
    "deleted": true
  }
]
~~~

原定于 `2024-06-10 09:00:00` 的事件已被 `Special Team Meeting` 记录所替代，而 `2024-06-17 09:00:00` 的事件则被省略。

请注意，已修改或删除实例的 **rrule** 属性会被忽略。

同时，被删除实例的 **text**、**start_date** 和 **end_date** 字段不会影响 Scheduler 的行为。


## 编辑/删除系列中的某一实例 {#editingdeletingacertainoccurrenceintheseries}

您可以删除或编辑循环系列中的某一具体实例。

### 重要提示

- 对循环事件的每一次更改都会在数据库中生成一条新记录。
- 单个实例通过 **recurring_event_id** 属性与主系列关联。
- 当某一实例被编辑时，**original_start** 字段保存的是该实例最初计划的日期，而不是新日期。例如，如果原定于 2024 年 7 月 27 日 15:00 的实例被移动到 2024 年 7 月 30 日 15:00，**original_start** 仍为 2024 年 7 月 27 日 15:00。

### 服务端逻辑 {#server-side-integration}

除了额外字段外，服务端控制器还应实现以下逻辑:

- 当添加已删除的实例时，服务端响应必须包含 "deleted" 状态。
    - 已删除实例通过非空的 **deleted** 属性识别。
- 当系列被修改时，所有与该系列关联的已修改和已删除实例都应被移除。
    - 系列通过非空 **rrule** 且空 **recurring_event_id** 识别。
    - 已修改实例为所有 **recurring_event_id** 与系列 **id** 匹配的记录。
- 如果删除了 **recurring_event_id** 非空的事件，应通过设置 **deleted="true**" 进行标记，而不是直接移除。

:::note
完整代码示例请参见[这里](integrations/howtostart-guides.md)
:::


## 自定义 lightbox 的 recurring 区块控件 {#customcontrolforthelightboxsrecurringblock}

从 4.2 版本开始，dhtmlxScheduler 允许您为 lightbox 的 'recurring' 部分自定义 HTML 表单。

#### 可以自定义哪些内容？

1. 更改表单的结构。
2. 移除不需要的元素（如"每年"重复选项及其输入框）。
3. 为输入项设置默认值（例如默认选中"无结束日期"并隐藏循环结束设置区块）。

### 使用示例

以下示例移除了"每月"和"每年"重复选项，并默认选中"无结束日期"选项（隐藏循环结束区块）。

1. 在页面上定义自定义表单结构（可从 'schedulersourceslocalerecurring' 目录复制默认模板开始）:
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        Repeat every week next days:


       <label><input type="checkbox" name="week_day" value="1" />Monday</label>
       <label><input type="checkbox" name="week_day" value="2" />Tuesday</label>
       <label><input type="checkbox" name="week_day" value="3" />Wednesday</label>
       <label><input type="checkbox" name="week_day" value="4" />Thursday</label>
       <label><input type="checkbox" name="week_day" value="5" />Friday</label>
       <label><input type="checkbox" name="week_day" value="6" />Saturday</label>
       <label><input type="checkbox" name="week_day" value="0" />Sunday</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. 将 'recurring' 部分的 'form' 参数设置为自定义表单的 ID:
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

<div>![custom_recurring_form](/img/custom_recurring_form.png)</div>

### 主要部分

不同语言下，lightbox 中循环块的默认 HTML 结构位于 <b>'schedulersourceslocalerecurring'</b> 目录。


例如，英文语言包使用的是 <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b> 文件。

lightbox 中的循环块通常包含 3 组控件:

1) 选择循环类型的控件。这些输入项的 name 都为 'repeat'，可选值为:'daily'、'weekly'、'monthly'、'yearly'。 
表单中至少应包含一个带有 value 的 'repeat' 输入项。你可以使用单选按钮、下拉选择框，或者通过隐藏输入项设置默认类型。

以下是在表单中选择循环类型的几种有效示例:

- 单选按钮:

~~~html
<label><input type="radio" name="repeat" value="day" />每日</label>


<label><input type="radio" name="repeat" value="week"/>每周</label>


<label><input type="radio" name="repeat" value="month" />每月</label>


<label><input type="radio" name="repeat" value="year" />每年</label>
~~~

- 下拉选择框（不包含"每月"和"每年"选项）:

~~~html
<select name="repeat">
  <option value="day">每日</option>
  <option value="week">每周</option>
</select>
~~~

- 隐藏输入项（此配置将仅创建"每日"系列）:

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) 根据所选循环类型设置循环详情的区域。例如，"每日"循环类型的块如下所示:

~~~html
<div class="dhx_repeat_center">
   <div id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>每
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />天


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>每个工作日
     </label>
  </div>
...
</div>         
~~~

请注意，与特定循环类型相关的标记可以包裹在一个 <b>id</b> 格式为 <b>"dhx_repeat_&lt;repeat type&gt;"</b> 的 div 中，例如 "dhx_repeat_day"。 
只有在选中对应循环类型时，这个块才会显示。

3) 指定循环结束时间的控件。控制此项的输入 name 为 'end'。 


可选值包括 <b>'no'</b>、<b>'date_of_end'</b> 和 <b>'occurences_count'</b>。

与 'repeat' 控件类似，表单中必须至少包含一个此类型的输入项。

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>无结束日期
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />在此之后</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />在此之后</label>
    <input type="text" name="occurences_count" value="1" />次
</div>
~~~

对于 <b>'date_of_end'</b> 模式，日期应填写在名为 'date_of_end' 的输入框中。类似地，<b>'occurences_count'</b> 模式下，发生次数应填写在名为 'occurences_count' 的输入框中。 


你可以移除任意循环类型，或通过隐藏输入项提前设定:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2024" />
~~~
  
### 修改循环块的注意事项

在自定义 lightbox 的循环块之前，请注意以下几点:

1. 所有输入项的 'name' 属性是固定的；不同 name 的输入项将会被忽略。 
2. 所有输入项的 'value' 属性也是固定的，除非该输入项用于用户直接输入。 
3. 当你提供新的表单时，dhtmlxScheduler 不会直接使用它，而是会将你的 HTML 结构复制到 lightbox 的模板中。 
这意味着，附加在你表单 DOM 元素上的任何事件处理器或自定义属性都不会在 lightbox 中生效。 
如需添加事件处理器，你需要将其作为内联 HTML 属性包含，或在表单显示到 lightbox 后再进行绑定。

:::note
请注意，dhtmlxScheduler 并不会直接使用你的原始 HTML 表单，而是会在 lightbox 模板中创建它的副本。
:::

例如:

- 这行代码会被复制到 lightbox:

~~~html
<input onclick="handler()"> 
~~~

- 但这样不会被复制:

~~~js
addEventListener(node, "click", function(){...})
~~~

## 循环事件的旧格式 {#legacyformatofrecurringevents}

在 7.1 版本之前，Scheduler 使用的是自定义的循环事件格式。关于此格式的详细信息可参见 [这里](guides/recurring-events-legacy.md)。
