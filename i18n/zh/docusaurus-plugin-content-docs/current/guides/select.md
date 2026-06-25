---
title: "选择"
sidebar_label: "选择"
---

# 选择

![select_editor](/img/select_editor.png)

~~~js
const alert_opts = [
    { key: 1, label: 'None' },
    { key: 2, label: 'On start date' },
    { key: 3, label: '1 day before' }
];
            
scheduler.locale.labels.section_select = 'Alert';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"select", height:40, map_to:"type", type:"select", options:alert_opts},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[灯箱中的基础下拉编辑器](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)

## 初始化

要将 Select 控件添加到灯箱，请按照以下步骤进行：

1. <b>将该节添加到灯箱配置中：</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. <b>为该节设置标签：</b>
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

[灯箱中的基础下拉编辑器](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)

## 属性

以下属性对 'select' 控件通常很重要并且经常设置（完整列表请参见 [此处](api/config/lightbox.md)）：

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 该节的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 该节的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 将映射到该节的数据属性的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 该节控件的类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) 定义控件的选项（<b>对于 'select', 'multiselect', 'radio', 'combo' 控件</b>）。数组中的每个对象指定一个选项，并具有以下属性：<ul> <li><b>key</b> - (<i>string</i>) 选项的 id。此属性与事件的数据属性进行比较以将选项分配给事件</li> <li><b>label</b> - (<i>string</i>) 选项的标签</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) 指定该节控件的 'onchange' 事件处理函数 [在灯箱中链接下拉控件](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>

## 用数据填充控件

通常，要为 Select 控件设置值，应使用 [options](api/config/lightbox.md) 参数：

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'None'},
            { key: 2, label: 'On start date'},
            { key: 3, label: '1 day before'}
    ]},
    ...
];
~~~

在 [options](api/config/lightbox.md) 参数中的项必须具备两个必需属性：

- **key** - 选项的 id
- **label** - 选项的标签

## 动态更改选项

要从服务器填充控件，请将 [options](api/config/lightbox.md) 选项设置为由 [serverList](api/method/serverlist.md) 方法返回的值：

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~

:::note
有关 **serverList** 方法的详细信息，请参阅 [相关文档](api/method/serverlist.md)。
:::

对于 [load](api/method/load.md) 方法的数据响应，应包含一个集合，其名称与服务器列表在 JSON 中指定的名称相同，格式如下 [json-with-collections](guides/data-formats.md#json-with-collections)：

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":"2"
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":"1","label":"Interview"},/*!*/
         {"value":"2","label":"Performance review"},/*!*/
         {"value":"3","label":"Request"}/*!*/
      ]/*!*/
   }/*!*/
}
~~~

在需要在调度程序初始化后加载选项时，亦可使用 [parse](api/method/parse.md) 方法。

如果需要用新选项更新控件的指定选项，可以使用 [updateCollection](api/method/updatecollection.md) 方法：

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

请参阅 [scheduler.serverList](api/method/serverlist.md) 文章中的详情。