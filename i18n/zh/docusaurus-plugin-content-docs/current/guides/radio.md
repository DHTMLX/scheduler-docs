---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

一组单选按钮

![radio_editor](/img/radio_editor.png)

:::note
请确保启用 **editors** 扩展，以便在 lightbox 中使用此控件
:::

~~~js
scheduler.plugins({
    editors: true /*!*/
});

var priorities = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Medium' },
    { key: 3, label: 'Low' }
];
            
scheduler.locale.labels.section_priority = 'Priority';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"priority", height:58, options:priorities, 
                map_to:"priority", type:"radio", vertical:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## 初始化

要在 lightbox 中包含 Radio 控件，请按照以下步骤操作:

1. 在页面上启用 'editors' 扩展:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. 在 lightbox 配置中添加 radio 区块:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
3. 定义该区块的标签:
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~
  

[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## 属性

以下是 'radio' 控件常用的主要属性（完整列表请参见 [这里](api/config/lightbox.md)）:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 区块的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 区块的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 该区块映射到的数据属性名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 区块控件的类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>对象数组</i>) 定义控件的选项（<b>用于 'select'、'multiselect'、'radio'、'combo' 控件</b>）。 每个对象表示一个选项，包括: <ul> <li><b>key</b> - (<i>string</i>) 选项的 ID，与事件的数据属性对应</li> <li><b>label</b> - (<i>string</i>) 选项的显示文本</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) 决定单选按钮是垂直（<i>true</i>）还是水平排列（<b>适用于 'multiselect' 和 'radio' 控件</b>）</td>
  </tr>
  </tbody>
</table>


## 为控件填充数据

通常，单选按钮的值通过 [options](api/config/lightbox.md) 参数设置:

~~~js
scheduler.config.lightbox.sections = 
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'High' },
            { key: 2, label: 'Medium' },
            { key: 3, label: 'Low' }
    ]},
    ...
];
~~~

[options](api/config/lightbox.md) 数组中的每一项都必须包含两个必需属性:

- **key** - 选项的 ID
- **label** - 选项的显示文本

## 从服务器获取单选按钮的值

要使用从服务器获取的数据填充单选按钮，请使用 [serverList](api/method/serverlist.md) 方法:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("./data/types.php");
~~~

[load](api/method/load.md) 方法的服务器响应应包含一个与 server list 名称匹配的集合，格式为 JSON，如 [此示例](guides/data-formats.md#json-with-collections) 所示:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
          "text":"Performance review",
          "type":2
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":1,"label":"Low"},/*!*/
         {"value":2,"label":"Medium"},/*!*/
         {"value":3,"label":"High"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~

如果你使用的是 [PHP Connector](https://github.com/DHTMLX/connector-php) 库，服务端代码可能如下所示:

~~~php
//types.php
<?php
    require_once('../../../../connector-php/codebase/scheduler_connector.php');
    include ('../../common/config.php');

    $list = new JSONOptionsConnector($res, $dbtype);
    $list->render_table("types","typeid","typeid(value),name(label)");
    
    $scheduler = new JSONSchedulerConnector($res, $dbtype);
    $scheduler->set_options("type", $list);
    $scheduler->render_table(
        "tevents",
        "event_id",
        "start_date,end_date,event_name,type"
    );
?>
~~~

:::note
请注意，可以使用 [updateCollection](api/method/updatecollection.md) 方法来刷新已获取的选项列表
:::


## Radio 控件的事件处理

dhtmlxScheduler API 没有为 Scheduler lightbox 中的单选按钮提供内置事件处理器。

不过，你可以按照如下方式为 Lightbox 中的 Radio 控件添加点击事件处理:

1. 在 lightbox 打开后获取 radio 元素。

~~~js

scheduler.attachEvent("onLightbox", function(){
    var node = scheduler.formSection("type").node;
    var radios = node.getElementsByTagName("input");
    ...
});
~~~

2. 为 Lightbox 中的每个单选按钮绑定 <b>onclick</b> 事件。

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(var i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. 定义单选按钮被点击时执行的函数。

~~~js
function onRadioClick(event){
    var e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

**Related sample** [Radio 控件的事件处理](https://snippet.dhtmlx.com/5/5b62dd79e)
