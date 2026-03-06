---
title: "循环事件（适用于 v7.1 及以下版本）"
sidebar_label: "循环事件（适用于 v7.1 及以下版本）"
---

# 循环事件（适用于 v7.1 及以下版本）

*本文介绍 DHTMLX Scheduler 中循环事件的旧格式。如需了解 DHTMLX Scheduler v7.1 及以上版本的循环事件，请参见[此处](guides/recurring-events.md)。*

默认情况下，scheduler 不支持循环事件。要添加此功能，需要在页面上启用一个名为 **recurring_legacy** 的特殊扩展。

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

启用循环事件支持后，lightbox 会包含一个额外的部分，如下所示:

![recurring_lightbox](/img/recurring_lightbox.png)

## 配置选项

该库提供了多种选项用于配置循环事件:


- [repeat_date](api/config/repeat_date.md) - 控制"循环"lightbox 中"结束时间"字段的日期格式
- [include_end_by](api/config/include_end_by.md) - 设置"结束时间"字段的日期是否包含在内
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - 管理跨月循环事件的处理方式
- [repeat_precise](api/config/repeat_precise.md) - 避免"每周"循环事件包含过去的日期
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - 支持跨时区处理循环事件


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## "循环" Lightbox

启用循环扩展后，lightbox 会新增一个名为"重复事件"的部分。默认的"循环"lightbox 配置如下:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

如有需要，可以添加其他部分，但"recurring"和"time"部分必须保留，并且"time"部分应始终位于"recurring"部分之后。


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 服务端集成

循环事件在数据库中作为一条记录保存，包含所有常规事件字段以及三个额外字段:

1. **rec_type** - (_varchar_) 定义循环模式；该字段由系统自动填写
2. **event_length** - (_long int_) 事件持续时间（秒）
3. **event_pid** - (_int_) 事件系列的父级 ID

典型的 connector 查询如下:

~~~php
$scheduler->render_table("events_rec","event_id",
"start_date,end_date,text,rec_type,event_pid,event_length");
~~~

除了这些必需字段外，还可以从数据库中获取其他数据。

需要注意的是，**start_date** 和 **end_date** 的含义如下:

- **start_date** - 系列中第一个事件的开始日期，格式为 'yyyy-mm-dd hh:mm:ss'（参见 [날짜 형식 지정](guides/settings-format.md)）。
- **end_date** - 系列中最后一个事件的结束日期，格式为 'yyyy-mm-dd 00:00:00'（参见 [날짜 형식 지정](guides/settings-format.md)）。

例如，一个 2019 年 1 月 3 日 10:00 开始、每天重复、2019 年 1 月 13 日 12:00 结束的循环事件，将以如下方式存储:

~~~js
id:1,
start_date:"2019-01-03 10:00:00",
end_date:"2019-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" // 父事件为 0，子事件为父事件的 ID
~~~

在客户端，**rec_type** 字段的格式为:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

其中:

- *type* - 循环类型:'day'、'week'、'month'、'year'
- *count* - 事件之间的间隔（以类型单位计）
- *day* 和 *count2* - 指定某月的具体某一天（如每月第一个周一、第三个周五）
- *days* - 以逗号分隔的受影响星期几列表
- *extra* - 额外信息，用于调整循环详情显示方式

**rec_type** 示例:

- *"day_3___"* - 每三天一次
- *"month_2___"* - 每两个月一次
- *"month_1_1_2_"* - 每月第二个周一
- *"week_2___1,5"* - 每两周的周一和周五

*注意:双下划线或三下划线表示该参数被省略。*

## 后端解析循环系列

循环事件在数据库中以单条记录保存，Scheduler 可以在客户端拆分。如果需要在服务端获取每次发生的具体日期，可使用 ASP.NET/ASP.NET Core 或 PHP 的辅助库进行解析。

这些库可在 GitHub 获取:

- [ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## 编辑/删除系列中的某次事件

可以编辑或删除循环系列中的某次事件。

### 重要说明

- 每次对循环事件的更新都会在数据库中创建一条独立记录。
- 单次事件通过 **event_pid** 属性与父事件关联。
- 当某次事件被编辑时，**event_length** 字段存储的是该事件原定发生的时间戳（而非实际事件时长）。例如，原定于 2019 年 7 月 27 日 15:00 的某次事件被移到 7 月 30 日 15:00，event_length 记录的仍是 7 月 27 日 15:00 的时间戳（单位为自 UNIX 纪元以来的秒数）。
- 如果数据库中存在已编辑的事件，且通过 lightbox 选择"编辑系列"，保存后所有已存储的编辑事件都会被删除，仅保留主循环事件记录，单次事件的独立更改将丢失。

### 示例场景

假设你是奥运会的粉丝，想尽可能多地观看伦敦 2012 奥运会（*7 月 27 日 - 8 月 12 日*）。你创建了一个从 17:00（下班）到 23:00（睡觉）循环的事件。但因开幕式 19:00 开始，你想将 7 月 27 日那天的时间改为 19:00-23:00。另外，8 月 1 日有个截止日期，可能无法观看，所以你想从系列中删除当天的事件。

#### 操作总结:

1. 创建一个循环事件，时间为 **17:00-23:00**，日期为 **2012 年 7 月 27 日** 至 **2012 年 8 月 12 日**。
2. 编辑 **2012 年 7 月 27 日** 的事件，将时间改为 **19:00-23:00**。
3. 删除 **2012 年 8 月 1 日** 的事件。

这样，数据库中将有 3 条与该循环事件相关的记录。

#### 数据库中的操作步骤:

创建循环事件:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

编辑 **2012 年 7 月 27 日**:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

删除 **2012 年 8 月 1 日**:

![delete_an_occurrence.png](/img/delete_an_occurrence.png)

### 服务端逻辑

除额外字段外，服务端控制器还需处理以下逻辑:

- 当插入 **rec_type == none** 的事件时，响应应标记为"已删除"状态。
- 当更新或删除 **rec_type != none** 的事件时，需删除所有对应 **event_pid** 的记录。
- 当删除 **event_pid** 不为 0 的事件时，应将其更新为 **rec_type == none**，而不是直接删除。

:::note
完整代码示例见[此处](integrations/howtostart-guides.md)
:::

如果你使用 [PHP Connector](https://github.com/DHTMLX/connector-php)，服务端代码可能如下:

~~~php
function delete_related($action){
    global $scheduler;
    
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    $pid = $action->get_value("event_pid");
    // 当系列被更改或删除时，移除所有关联事件
    if (($status == "deleted" || $status == "updated") && $type != ""){
        $scheduler->sql->query("DELETE FROM events_rec WHERE 
        event_pid='" . $scheduler->sql->escape($action->get_id()) . "'");
    }
    if ($status == "deleted" && $pid != 0){
        $scheduler->sql->query("UPDATE events_rec SET rec_type='none' WHERE 
        event_id='" . $scheduler->sql->escape($action->get_id()) . "'");
        $action->success();
    }
}
function insert_related($action){
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    if ($status == "inserted" && $type == "none")
        $action->set_status("deleted");
}

$scheduler->event->attach("beforeProcessing","delete_related");
$scheduler->event->attach("afterProcessing","insert_related");
~~~

## 拖动整个循环序列

如需允许用户拖动并移动整个循环事件序列，请在初始化 scheduler 前添加如下代码:

~~~js
scheduler.attachEvent("onBeforeEventChanged", function(dev){
    var parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          var series = this.getEvent(parts[0]);

          series.start_date.setHours(dev.start_date.getHours());
          series.start_date.setMinutes(dev.start_date.getMinutes());
          series.event_length = (dev.end_date - dev.start_date) / 1000;

          setTimeout(function(){
               scheduler.addEvent(series);
          }, 1);

          return false;
     }
     return true;
});
~~~

## 自定义 lightbox 循环块的控件

自 4.2 版本起，dhtmlxScheduler 支持自定义 lightbox 中"循环"块的 HTML 表单。

#### 可自定义内容

1. 修改表单标记
2. 移除不需要的元素（如"每年"循环类型及其相关输入项）
3. 为输入项设置默认值（例如自动勾选"无结束日期"选项并隐藏循环结束块，使所有系列默认无结束日期）

### 使用示例

让我们从一个示例开始。假设你想移除"每月"和"每年"重复选项，并为所有事件保留"无结束日期"选项（这意味着要去掉设置重复结束的部分）。

1. 首先，定义一个自定义表单的标记，并将其放在页面的某处（你可以从'schedulersourceslocalerecurring'中复制默认模板开始）:
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">每日</option>
        <option value="week">每周</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        每周重复于以下日子：


       <label><input type="checkbox" name="week_day" value="1" />星期一</label>
       <label><input type="checkbox" name="week_day" value="2" />星期二</label>
       <label><input type="checkbox" name="week_day" value="3" />星期三</label>
       <label><input type="checkbox" name="week_day" value="4" />星期四</label>
       <label><input type="checkbox" name="week_day" value="5" />星期五</label>
       <label><input type="checkbox" name="week_day" value="6" />星期六</label>
       <label><input type="checkbox" name="week_day" value="0" />星期日</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. 接下来，将'recurring'部分的'form'参数赋值为你的自定义表单ID:
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

你可以在<b>'schedulersourceslocalerecurring'</b>文件夹中找到不同语言下lightbox的默认重复块HTML布局。


例如，对于英文版，可以查看<b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b>文件。

通常，lightbox中的重复块包含3个主要控件组:

1) 用于选择重复类型的控件。这些输入应具有'name'为'repeat'，值为:'daily'、'weekly'、'monthly'、'yearly'之一。
你的表单必须至少包含一个带有值的'repeat'输入。可以使用单选按钮、下拉选择，甚至隐藏输入来设置默认类型。

以下是一些在表单中选择重复类型的有效示例:

- 单选按钮

~~~html
<label><input type="radio" name="repeat" value="day" />每日</label>


<label><input type="radio" name="repeat" value="week"/>每周</label>


<label><input type="radio" name="repeat" value="month" />每月</label>


<label><input type="radio" name="repeat" value="year" />每年</label>
~~~

- 下拉选择（不包含"每月"和"每年"选项）:

~~~html
<select name="repeat">
  <option value="day">每日</option>
  <option value="week">每周</option>
</select>
~~~

- 隐藏输入（这样lightbox只会创建"每日"系列）:

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) 根据重复类型配置重复规则的部分。例如，对于"每日"重复类型，标记如下:

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

请注意，与特定重复类型相关的标记可以包裹在id格式为<b>"dhx_repeat_&lt;repeat type&gt;"</b>的div中，比如"dhx_repeat_day"。
这样，仅在选择相应重复类型时才会显示。

3) 用于设置重复结束的控件。通过name为'end'的输入定义。 


可能的值有<b>'no'</b>、<b>'date_of_end'</b>和<b>'occurences_count'</b>。

和'repeat'控件一样，你的表单中应至少有一个此类输入。

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

<b>'date_of_end'</b>选项的日期应填写在名为'date_of_end'的输入框中。同样，<b>'occurences_count'</b>选项的次数从名为'occurences_count'的输入框获取。


你可以移除任何选项，或通过隐藏输入将其设为默认值:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2016" />
~~~
  
### 自定义重复块注意事项

在自定义lightbox的重复块前，请注意以下几点:

1. 所有输入的'name'属性是固定的--不同名称的输入将被忽略。
2. 除了需要用户直接输入的情况外，所有输入的'value'属性都是固定的。
3. 当你提供新表单时，dhtmlxScheduler并不会直接使用它，而是会将你的HTML结构复制到lightbox的模板中。
这意味着，任何绑定在原始表单DOM元素上的事件处理器或自定义属性不会被带入lightbox中。
如果你需要添加事件处理器，可以通过内联HTML属性添加，或者在lightbox显示时再绑定到表单。

:::note
请注意，dhtmlxScheduler不会直接操作你的原始HTML表单，而是会在lightbox模板中创建它的副本。
:::

例如:

- 这行代码会被复制到lightbox中:

~~~html
<input onclick="handler()"> 
~~~

- 但这样不会被复制:

~~~js
addEventListener(node, "click", function(){...})
~~~
