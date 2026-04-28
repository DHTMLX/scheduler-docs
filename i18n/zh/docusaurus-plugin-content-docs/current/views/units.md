---
title: "Units 视图"
sidebar_label: "Units 视图"
---

# Units 视图

:::info
此视图仅在 Scheduler PRO 版本中提供。
:::

Units 视图根据事件的特定属性（而不仅仅是时间）来组织 X 轴。

![units_view](/img/units_view.png)

## 初始化 {#initialization}

要将 Units 视图添加到调度器，请按照以下步骤操作:

1. 在页面上启用 Units 扩展:
~~~js
scheduler.plugins({
    units: true
});
~~~
2. 将视图的选项卡添加到调度器的标记中:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="unit_tab"></div>
    </div>
    ...    
</div>
~~~
3. 为选项卡设置标签:
~~~js
//'unit_tab' 是我们 div 的名称
scheduler.locale.labels.unit_tab = "Unit"
~~~
4. 使用 [createUnitsView](api/method/createunitsview.md) 方法创建视图:
~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", // 映射单位的事件属性
    list:[              // 定义视图中显示的单位
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});
~~~


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## 向视图加载数据 {#loadingdatatotheview}

与 Day、Month 或 Year 等标准视图不同，Units 和 Timeline 等多资源视图要求事件包含一个额外的必填字段:

* [property](api/method/createunitsview.md) - (string) 用于将事件分配到特定单位的数据属性名称

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", 
    list:[             
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});

scheduler.init('scheduler_here');
scheduler.parse([
    {id:1, text:"Task1", start_date:"2027-09-17 12:00", end_date:"2027-09-18 21:00", 
    unit_id:"1"},
     {id:2, text:"Task2", start_date:"2027-09-17 09:00", end_date:"2027-09-17 21:00", 
    unit_id:"3"},
     {id:3, text:"Task3", start_date:"2027-09-17 15:00", end_date:"2027-09-18 15:00", 
    unit_id:"2"}
]);                                 
~~~
事件通过 **unit_id** 的值与 **list.key** 对应来分配到相应的单位。


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## 动态更改分区 {#changingsectionsdynamically}

要在 Units 视图中动态更新单位列表，可以使用 [serverList](api/method/serverlist.md) 和 [updateCollection](api/method/updatecollection.md) 方法。

## 多天单位显示 {#displayingunitsformultipledays}

要显示跨越多天的单位，请使用 [days](api/method/createunitsview.md) 参数:

~~~js
scheduler.createUnitsView({
    name:"week_unit",
    property:"section_id",
    list:sections,
    days:3 /*!*/
});
~~~

![multiday_units](/img/multiday_units.png)


[Multiday Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/31_units_view_multiple_days.html)


这样会增加一个显示日期的第二层横向刻度。

 如需自定义第二层刻度的显示格式，可使用 scheduler.templates[name+"_second_scale_date"] 模板:

~~~js
scheduler.templates.units_second_scale_date = function(date) {
    return scheduler.templates.week_scale_date(date);
};
~~~

注意:

1. 第一层刻度照常通过 scale_text_template 定义。其高度可通过 [scale_height](api/other/xy.md) 调整。
2. 可参考 [뷰의 X축에서 시간 단위 숨기기](guides/custom-scales.md) 中的方法，在第二层横向刻度中隐藏不需要的时间单位。
3. [size](api/method/createunitsview.md) 和 [step](api/method/createunitsview.md) 参数不适用于多天单位。
4. PDF 导出仅支持 [新服务](export/pdf.md)，不支持 [旧版导出工具](export/pdf-legacy.md)。
5. 如需调整显示区间的起始日，请使用 scheduler.date.(units_name)_start 函数:
~~~js
scheduler.date.units_start = function (date) {
    return scheduler.date.week_start(date);
};
~~~ 

## 为事件分配多个单位 {#assigningeventstoseveralunits}

从 4.1 版本开始，可以将事件同时分配到多个单位。

![multiple_sections](/img/multiple_sections.png)


启用此功能的方法:

1. 在页面上激活 **Multisection** 扩展
2. 将 [multisection](api/config/multisection.md) 属性设置为 *true*
3. （可选）启用 "multiselect" 扩展，以便使用 [Multiselect](guides/multiselect.md) 控件更方便地切换分区

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
    scheduler.plugins({
        multisection: true, /*!*/
        multiselect: true,
        units: true
    });
    scheduler.config.multisection = true; /*!*/
    scheduler.init('scheduler_here');
</script>
~~~

之后，可以在事件对应属性中指定多个分区（默认用逗号分隔，参见 [section_delimiter](api/config/section_delimiter.md)），事件将在所有这些单位中显示:

~~~js
scheduler.createUnitsView({
    name: "unit",
    list: [
        {key: 1, label: "James Smith"},
        {key: 2, label: "John Williams"},
        {key: 3, label: "David Miller"},
        {key: 4, label: "Linda Brown"}],
    property: "section_id", /*!*/
    ...
});
scheduler.init('scheduler_here', new Date(2027, 5, 30), "unit");

scheduler.parse([
    { id:1, text:"Task A", section_id:'1',         ...},/*!*/
    { id:2, text:"Task B", section_id:'1,3',     ...},/*!*/
    { id:3, text:"Task C", section_id:'4',         ...},/*!*/
    { id:4, text:"Task D", section_id:'2,3,4',     ...}/*!*/
]);
~~~


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## X 轴分区的数据 {#dataforthexaxissections}

X 轴上显示的值通过 [list](api/method/createunitsview.md) 参数设置:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"} 
    ]
});
~~~

[list](api/method/createunitsview.md) 中的每一项都必须包含两个必需属性:

- **key** - 唯一标识符
- **label** - 显示名称

## 从服务器获取 X 轴分区数据 {#dataforthexaxissectionsfromtheserver}

如需从服务器加载分区数据，请使用:

- 客户端 - [serverList](api/method/serverlist.md) 方法:

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"type_id",
    list:scheduler.serverList("units"),
    size:20,                                     
    step:1
});
~~~
*其中 [serverList](api/method/serverlist.md) 返回名为 'units' 的列表*。

- 服务器端

[load](api/method/load.md) 方法的响应应包含带有服务器列表名称的集合，JSON 格式如下:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Team meeting",
          "type_id":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Strategy meeting",
          "type_id":"2"
      }
   ], 
   "collections": {/*!*/
      "units":[/*!*/      
         {"value":"1","label":"Conference room 1"},/*!*/
         {"value":"2","label":"Conference room 2"},/*!*/
         {"value":"3","label":"Conference room 3"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~

或者，可以使用 [OptionsConnector](https://docs.dhtmlx.com/connector__php__optionsconnector.html) 连接器:

~~~php
<?php
    include('connector-php/codebase/scheduler_connector.php');//包含文件

    $res="mysql_connect(""localhost","root","");//连接数据库服务器
    mysql_select_db("sampleDB");//连接数据库，'sampleDB' 为数据库名

    $list = new OptionsConnector($res, $dbtype);
    $list->render_table("types","type_id","type_id(value),name(label)");
    
    $scheduler = new schedulerConnector($res, $dbtype);
    //设置与客户端相同的名称 - 'units'
    $scheduler->set_options("units", $list); 
    $scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

![server_list_db](/img/server_list_db.png)


你也可以不使用 dhtmlxConnector，手动构建集合。在这种情况下，可使用 [updateCollection](api/method/updatecollection.md) 方法更新集合:

~~~js
scheduler.updateCollection("units", new_sections_array);
~~~


[Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)


## 单位滚动 {#scrollingunits}

当单位数量较多时，可通过 [size](api/method/createunitsview.md) 和 [step](api/method/createunitsview.md) 属性启用横向滚动:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    size:10, // 一次可见的单位数
    step:5   // 每次滚动的单位数
});
~~~

![单位滚动](/img/units_scroll.png)


[Horizontal scrolling sections in Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/18_scroll_units.html)


## 跳过不属于任何单位的事件 {#skippingeventsthatdontbelongtoanyoftheunits}

默认情况下，不匹配任何已定义单位的事件会显示在第一个单位中。从 3.0 版本开始，可以选择完全跳过这些事件。

要启用此功能，请设置 [skip_incorrect](api/method/createunitsview.md) 属性:

~~~js 
scheduler.createUnitsView({
    name:"unit",
    ...
    skip_incorrect:true
});

~~~

## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Units View 템플릿](views/units-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [이벤트 객체 작업](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [스킨(Skins)](guides/skins.md)
