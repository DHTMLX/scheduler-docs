---
title: "重复事件（至 v7.1）"
sidebar_label: "重复事件（至 v7.1）"
---

# 重复事件（至 v7.1）

*本文档涉及 DHTMLX Scheduler 的遗留格式的重复事件。若你使用 DHTMLX Scheduler v7.1+，请在当前版本的详细信息[这里](guides/recurring-events.md)查看。*

默认情况下，调度器不支持重复事件。要启用此支持，需要在页面上启用一个特殊扩展 - **recurring_legacy**。


~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~


一旦启用对重复事件的支持，弹出框将如下所示：


![recurring_lightbox_legacy](/img/recurring_lightbox_legacy.png)


## 配置选项

该库提供以下选项来配置重复事件：

- [repeat_date](api/config/repeat_date.md) - 设置在 'recurring' 弹出框中 'End by' 字段的日期格式
- [include_end_by](api/config/include_end_by.md) - 定义在 'End by' 字段中指定的日期应为排他性还是包含性
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - 定义转到下一个月的重复事件的行为
- [repeat_precise](api/config/repeat_precise.md) - 防止将过去的日期包含在带有 'weekly' 重复的事件中
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - 允许独立于时区地处理重复事件

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' Lightbox

默认情况下，一旦启用重复扩展，弹出框会再多出一个区域 - "Repeat event"。 
并且 'recurring' 弹出框的默认定义将变为如下：

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

你可以添加任意额外的区域，但需要保留 "recurring" 和 "time" 两个区域。
此外，必须将 "time" 区域放在 "recurring" 之后。


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 服务器端集成

在数据库中，重复事件作为一个包含常规事件所有字段加上 3 个附加字段的单条记录存储：

1. **rec_type** - (_varchar_) 定义重复逻辑。这个字段会自动填充
2. **event_length** - (_long int_) 事件实际时长（以秒为单位)
3. **event_pid** - (_int_) 一系列事件的父 ID

因此，你的后端应返回重复字段以及常规事件字段，例如：

~~~js
{
  "id": 1,
  "start_date": "2027-01-03 10:00:00",
  "end_date": "2027-01-13 00:00:00",
  "text": "some_text",
  "rec_type": "day_1___",
  "event_length": 7200,
  "event_pid": 0
}
~~~

在通常情况下，除了必填字段外，你还可以从数据库中提取任意额外的数据。

然而，字段 **start_date** 和 **end_date** 的含义会略有改变：


- **start_date** - 系列中第一条事件的开始日期，格式为 'yyyy-mm-dd hh:mm:ss'（settings_format.md）。
- **end_date** - 系列中最后一条事件的结束日期，格式为 'yyyy-mm-dd 00:00:00'（settings_format.md）。

例如，一条从 2027 年 1 月 3 日 10:00 开始、每天重复、在 2027 年 1 月 13 日 12:00 结束的重复事件，在数据库中将如下呈现：


~~~js
id:1,
start_date:"2027-01-03 10:00:00",
end_date:"2027-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" //0 为父事件，或为子事件的父事件 ID
~~~


客户端从 **rec_type** 字段获取数据，其格式为如下字符串：

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

其中：

- *type* - 重复类型：'day','week','month','year'。
- *count* - 相邻事件在 "type" 单位中的时间间隔。
- *day* 和 *count2* - 定义一个月中的日期（如第一周一，第三个周五等）。
- *days* - 受影响的工作日的逗号分隔列表。
- *extra* - 可以用于改变重复细节展示的额外信息。

**rec_type** 数据的示例：


- *"day_3___"* - 每三天一次
- *"month _2___"* - 每两个月一次
- *"month_1_1_2_"* - 每月的第二个星期一
- *"week_2___1,5"* - 每第二周的星期一和星期五
  
*双下划线或三下划线表示相关参数在字符串中被省略。*

## 在后端解析系列

一个重复事件在数据库中作为单条记录存储，Scheduler 可以在客户端将其拆分为独立的事件。若你需要在服务器端获取系列中单独事件的日期，请使用用于解析 dhtmlxScheduler 递归事件的辅助库，支持 ASP.NET/ASP.NET Core/PHP。 

你可以在我们的 GitHub 上找到已经准备好的库：

- [for ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [for PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## 编辑/删除系列中的某个发生

可以删除或编辑系列中的某个特定发生。

### 重要提示

- 对重复事件的每次更新，数据库中会创建一条单独的记录。
- 某些发生记录通过属性 event_pid 与父事件相关联。
- 一旦你在系列中编辑了某个发生，该更新对应的 **event_length** 字段
将存储如果未被编辑时该发生本应发生的日期的时间戳（以秒为单位），而非实际的事件长度。
因此如果该发生在 2027 年 7 月 27 日 15:00 发生并被移动到 2027 年 7 月 30 日 15:00，时间戳将反映最初的日期。
请注意，如果你的数据库包含经编辑后的系列发生记录，而你选择通过弹出框“Edit series”进行编辑，保存后所有已存记录将被删除，剩下的只有主重复事件记录，而其发生将丢失差异（会变为完全相同）。

### 让我们来看一个例子

你是奥运会的粉丝，想尽可能多地观看即将到来的 London Olympic Games 2027（*27 July - 12 August*）。
因此你决定创建一个从 17:00 开始、直到 23:00 结束的重复事件（即工作日结束后时间段）。
但由于开幕式 *仅在 19:00 开始*，你想要编辑系列中的第一条事件（当天）并将时间段
*从 17:00-23:00 改为 19:00-23:00*。
另外，你还记得在 *2027 年 8 月 1 日* 有截止日期，离家太晚看不到任何节目，因此你还需要从系列中删除这一天的事件。

#### 简要地说，你的操作如下：

1. 创建一个重复事件 **_(17.00-23.00)_**，时间段从 **July 27, 2027** 到 **August 12, 2027**。
2. 编辑 **July 27, 2027** 的某个发生——将时间段改为 **_从 17.00-23.00 到 19.00-23.00_**。
3. 从系列中删除 **August 1, 2027** 的某个发生。

因此，在数据库中应有 3 条记录引用我们的重复事件。

#### 按步骤在数据库中的变化：

创建重复事件的截图：

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

编辑 **July 27,2027**：

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

删除 **August 1,2027**： 

![delete_an_occurrence.png](/img/delete_an_occurrence.png)


### 服务器端逻辑 

除了额外字段之外，服务器端控制器还需要增加一条特定的逻辑：

- 如果插入的事件的 **rec_type==none**，则响应必须返回 "deleted" 状态。
- 如果更新或删除的事件的 **rec_type!=none**，则必须删除与之相关的所有记录，通过 **event_pid**
- 如果删除了具有 **event_pid** 值的事件，则需要将其更新为 rec_type==none，而不是删除。

:::note
你可以在这里找到完整的代码示例 [here](integrations/howtostart-guides.md)
:::


在后端控制器或服务中实现此逻辑，以保持重复系列和异常的一致性。

## 拖动整条序列 

为了为用户提供在拖动重复事件时移动整条序列的能力，在调度初始化之前添加以下代码：

~~~js
scheduler.attachEvent("onBeforeEventChanged",function(dev){
    let parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          let series = this.getEvent(parts[0]);

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

## 自定义 lightbox 的 recurring 区块

从版本 4.2 开始，dhtxmlScheduler 允许你为 lightbox 的 'recurring' 区块指定一个自定义的 HTML 表单。

#### 你可以进行哪些自定义？

1. 修改表单标记
2. 删除不需要的元素（例如删除 'yearly' 重复类型及其相关输入）
3. 为输入设置默认值（例如你希望所有系列都没有结束日期，那么勾选 'no end date' 选项并隐藏用于指定重复结束的整块）


### 使用示例

先从一个例子开始。设想你想删除 'monthly' 与 'yearly' 重复类型，并为所有事件设置 'no end date' 选项（即删除用于指定重复结束的整块）。 

1. 定义自定义表单的标记并将其放在页面的某处（你可以先复制默认模板，该模板位于 <b>'schedulersourceslocalerecurring'</b>）：
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
      <div style="display:none;" id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div style="display:none;" id="dhx_repeat_week">
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
2. 将 'recurring' 区段的 'form' 参数设置为你自定义表单的 id： 
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


<div style="text-align:center;">![custom_recurring_form_legacy](/img/custom_recurring_form_legacy.png)</div>

### 主要部分

你可以在 <b>'schedulersourceslocalerecurring'</b> 目录中找到不同语言的默认 lightbox 的 recurring 区块的 HTML 结构。


例如，对于英文 locale，你需要查看 <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b> 文件。

基本上，lightbox 的 recurring 区块包含 3 组控件：

1) 用于选择重复类型的控件。这些输入的名称为 'repeat'，取值之一为： 'daily', 'weekly', 'monthly', 'yearly'。
表单必须至少有一个带有该值的 'repeat' 输入。你可以使用单选按钮、下拉框，或者将默认类型设置在隐藏输入中。

下面的示例中，每一个都是在表单中选择重复类型的有效方式： 

- 单选按钮

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select 输入，不包含 'Monthly' 与 'Yearly' 选项：

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Hidden input（弹出框只会创建 'Daily' 系列）

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) 根据重复类型配置重复的区域块。例如，对于 'Daily' 重复类型，区域块将具备以下结构：

~~~html
<div class="dhx_repeat_center">
   <div style="display:none;" id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>Every
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />day


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>Every workday
     </label>
  </div>
...
</div>
         
~~~

请注意，和特定重复类型相关的标记可以被包装在具有 <b>id</b> 的 div 中，格式为 <b>"dhx_repeat_&lt;repeat type&gt;"</b>，例如 "dhx_repeat_day"。
在选择了相应的重复类型时，它将仅显示该块。

3) 用于指定重复结束的控件。重复结束由名称为 'end' 的输入控件定义。


可选值为 <b>'no'</b>、<b>'date_of_end'</b>、<b>'occurences_count'</b>。

与 'repeat' 控件类似，表单至少应包含一个此类型的输入。

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>No end date
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />After</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />After</label>
    <input type="text" name="occurences_count" value="1" />Occurrences
</div>
~~~

在 'date_of_end' 模式中，日期必须在名称为 'date_of_end' 的输入中定义。对于 'occurences_count' 模式，同样需要在名为 'occurences_count' 的输入中给出出现次数。


你可以移除任意类型或在隐藏输入中预定义：

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2027" />
~~~
  
### 更改 recurring 区块 的注意事项

在开始应用自定义配置前，请注意以下几点：

1. 每个输入的 'name' 属性是硬编码的——具有不同名称的输入将被忽略。
2. 除直接输入的输入外，所有输入的 'value' 属性都是固定的。
3. 当你指定一个新的表单时——dhtmlxScheduler 不会直接使用它，而是将你的 HTML 结构复制到 lightbox 的模板中。
这意味着你从代码中附加到表单的所有事件处理程序或自定义属性将不会应用到 lightbox 的表单上。
如果你想添加事件处理程序，需要在内联 HTML 属性中指定，或在 lightbox 显示时将处理程序附加到表单上。

:::note
请注意，dhtmlxScheduler 不会直接使用你原始的 HTML 表单，而是会在 lightbox 的模板中创建它的副本。
:::


例如：

- 以下行代码将被复制到 lightbox：

~~~html
<input onclick="handler()"> 
~~~

- 下面这行不会被复制到 lightbox：

~~~js
addEventListener(node, "click", function(){...})
~~~