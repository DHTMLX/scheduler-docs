---
title: "Combo（组合框）"
sidebar_label: "Combo（组合框）"
---

# Combo（组合框）

本节介绍由 <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo 组件</a> 提供的组合框。

![combo_editor](/img/combo_editor.png)

~~~js
var holders = [
    { key: 1, label: 'James' },
    { key: 2, label: 'Alex' },
    { key: 3, label: 'Antony' },
    { key: 4, label: 'Andrew' }
];
            
scheduler.locale.labels.section_holder = "Holder";

scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~ 


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## 初始化

要在 lightbox 中包含 Combo 控件，请按照以下步骤操作:

1. 引入 dhtmlxCombo 文件:
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. 在页面上启用 editors 扩展:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. 在 lightbox 配置中添加相应的 section:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. 为该 section 设置标签:
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

  


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## 属性

以下是 'combo' 控件常用的重要属性（完整列表请参见 [此处](api/config/lightbox.md)）:

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
  <td>(<i>string</i>) section 映射的数据属性名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) section 控件的类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>对象数组</i>) 定义控件的选项（<b>适用于 'select'、'multiselect'、'radio'、'combo' 控件</b>）。 每个数组对象表示一个选项，包括以下属性: <ul> <li><b>key</b> - (<i>string</i>) 选项的 id。该属性与事件的数据属性进行比较，用于将选项分配给事件</li> <li><b>label</b> - (<i>string</i>) 选项的显示文本</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) dhtmlxCombo 图片的路径</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) 启用自动过滤支持（输入时过滤选项）。可选 该参数可取以下值之一: <ul> <li><b>false</b> - 禁用过滤</li> <li><b>true 或 "start"</b> - 启用过滤，从选项开头开始搜索</li> <li><b>"between"</b> - 启用过滤，搜索项中任意位置出现的文本</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) 提供 combo 选项的服务端脚本路径。可选</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) 启用或禁用脚本响应的缓存（建议启用）。可选</td>
  </tr>
  </tbody>
</table>


## 为控件填充数据

要为 Combo 控件提供选项值，请使用 [options](api/config/lightbox.md) 参数:

~~~js
scheduler.config.lightbox.sections = 
    { 
        name:"holders", type:"combo", 
        ...
        options:[
            { key: 1, label: 'James' },
            { key: 2, label: 'Alex' },
            { key: 3, label: 'Antony' },
            { key: 4, label: 'Andrew' }
    ]},
    ...
];
~~~

[options](api/config/lightbox.md) 参数中的每一项都必须包含两个必需属性:

- **key** - 选项的 id
- **label** - 选项的显示文本

## 从服务器填充控件数据

要从服务器加载 Combo 选项，请使用 **script_path** 属性指定处理请求的服务端脚本 URL。

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

**script_path** 属性定义 combo 通过 AJAX 加载选项的 URL。

由于 combo 选择器基于 [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html)，服务器应返回兼容格式的数据。
关于向 combo 添加数据的详细信息可参见 [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html) 文章。

请求会在以下两种情况下发送:

1) 当 lightbox 打开且 combo 已有选中值时，控件会发送请求以加载该选项的 label。

请求包含一个 **id** 查询参数:

~~~
GET /url?id="1"
~~~

响应应为仅包含指定 id 项目的数组，格式如下:

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~


2) 当用户在 combo 输入框中输入内容时，控件会加载过滤后的选项。

请求会携带输入内容作为 **mask** 查询参数:

~~~
GET /url?mask="al"
~~~

服务器应返回所有匹配 mask 的项:

~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

如果你使用 [PHP Connector](https://github.com/DHTMLX/connector-php) 库，服务端代码可能如下所示:

~~~js
<?php
    require_once('../../connector-php/codebase/combo_connector.php');
    require_once("../common/config.php");

    $combo = new ComboConnector($res, $dbtype);

    $combo->event->attach("beforeFilter", "by_id");
    function by_id($filter) {
        if (isset($_GET['id']))
            $filter->add("item_id", $_GET['id'], '=');
    }    

    $combo->dynamic_loading(3);
    $combo->render_table("Countries","item_id","item_nm");

?>
~~~


[Populating a combo box from the server](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## 自动过滤模式

自动过滤模式指的是用户输入时选项会自动过滤。要启用此模式，请将 **filtering** 属性设置为 *true*:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
请注意，无论数据是从客户端还是服务端加载，自动过滤都可以使用。
:::


更多详情请参阅 dhtmlxCombo 文档中的 <a href="https://docs.dhtmlx.com/combo__filtering.html">Filtering</a>。
