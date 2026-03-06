---
title: "Select"
sidebar_label: "Select"
---

# Select 

![select_editor](/img/select_editor.png)

~~~js
var alert_opts = [
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

[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## 初始化

要在 lightbox 中包含 Select 控件，需要按照以下步骤操作:

1. 在 lightbox 配置中添加该 section:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. 为该 section 定义标签:
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

  


[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## 属性 {#properties}

以下是 'select' 控件常用的一些关键属性（完整列表请参见 [这里](api/config/lightbox.md)）:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) section 的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) section 的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) section 映射的数据属性名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) section 中使用的控件类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) 定义 'select'、'multiselect'、'radio' 和 'combo' 等控件的选项。 每个对象表示一个选项，包括: <ul> <li><b>key</b> - (<i>string</i>) 选项的标识符，与事件的数据属性匹配</li> <li><b>label</b> - (<i>string</i>) 选项的显示文本</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) 控件值变化时触发的事件处理函数 [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## 为控件填充数据 {#populating-the-control-with-data}

通常，可以通过 [options](api/config/lightbox.md) 参数为 Select 控件设置选项值:

~~~js
scheduler.config.lightbox.sections = 
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

在 [options](api/config/lightbox.md) 数组中的每一项都必须包含以下两个必需属性:

- **key** - 选项的标识符
- **label** - 选项的显示文本

## 动态更改选项

如需从服务器加载选项，可以将 [options](api/config/lightbox.md) 属性赋值为 [serverList](api/method/serverlist.md) 方法返回的值:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("./data/types");
~~~

:::note
有关 **serverList** 方法的详细信息，请参见 [相关文档](api/method/serverlist.md)。
:::

[load](api/method/load.md) 方法的数据响应应包含与 server list 名称匹配的集合，并以 JSON 格式返回，
格式示例见 [此处](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
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


[Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)


[parse](api/method/parse.md) 方法也可以在 scheduler 初始化后用于加载选项。

如需用新值更新控件的选项，可以使用 [updateCollection](api/method/updatecollection.md) 方法:

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

更多信息请参见 [scheduler.serverList](api/method/serverlist.md) 相关文档。
