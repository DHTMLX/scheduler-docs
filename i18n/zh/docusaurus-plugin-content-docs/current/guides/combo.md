---
title: "Combo"
sidebar_label: "Combo"
---

# Combo（组合框）

一个通过 <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo 组件</a> 提供的组合框。

![combo_editor](/img/combo_editor.png)

~~~js
const holders = [
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

要将 Combo 控件添加到 lightbox，请按照下列步骤操作：

1. <b>包含 <a href="https://docs.dhtmlx.com/combo__index.html">dhtmlxCombo</a> 文件：</b>
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. <b>在页面上激活 [editors](guides/extensions-list.md#editors) 扩展</b>：
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. <b>将该段添加到 lightbox 配置中：</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. <b>为该段设置标签：</b>
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

  


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## 属性

以下属性对“combo”控件来说最为重要且常用（完整列表请参见 [此处](api/config/lightbox.md)）：

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 该段的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 该段的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 将映射到该段的数据属性名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 该段控件的类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) 定义控件的选项（对 'select', 'multiselect', 'radio', 'combo' 控件有效）。数组中的每个对象定义一个选项，并包含以下属性： <ul> <li><b>key</b> - (<i>string</i>) 选项的标识符。此属性将与事件的数据属性进行比较，用于将选项分配给事件</li> <li><b>label</b> - (<i>string</i>) 选项的标签</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) dhtmlxCombo 图像的路径</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) 启用自动筛选功能（输入时将过滤选项）。可选值如下： <ul> <li><b>false</b> - 禁用筛选</li> <li><b>true 或 "start"</b> - 启用筛选，从项的开头进行搜索</li> <li><b>"between"</b> - 启用筛选，搜索输入文本在项中的任意位置</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) 指向服务器端脚本的路径，该脚本将从服务器提供加载控件选项。可选</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) 启用/禁用脚本响应的缓存（推荐开启该属性）。可选</td>
  </tr>
  </tbody>
</table>


## 使用数据填充控件

一般而言，要为 Combo 控件设置值，应使用 [options](api/config/lightbox.md) 参数：

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

在 [options](api/config/lightbox.md) 参数中的项必须具备两个必需属性：

- **key** - 选项的 id
- **label** - 选项的标签

## 从服务器填充控件数据

要从服务器填充 Combo 控件，请使用 **script_path** 属性，指定将处理服务器请求的服务器端脚本的路径。

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

**script_path** 属性指定从中加载选项的 URL，即若指定了 script_path，Combo 将通过 AJAX 从该 URL 加载数据。

Combo 选择器基于 [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html)，因此服务器应返回与之兼容的数据。有关向组合框添加数据的方式，请参阅文章 [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html)。

该 URL 的请求分为两种情况：

1) 打开 lightbox 时，Combo 有选定值 — 控件向服务器发送请求并加载所选选项的标签。

请求将包含一个 id 查询参数：

~~~
GET /url?id="1"
~~~

响应应返回仅包含指定 id 的项的数组，格式如下：

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~


2) 用户在下拉框输入文本时 — 控件加载筛选后的值。

客户端将发送带有输入文本的 mask 参数的请求：

~~~
GET /url?mask="al"
~~~

服务器的响应应返回所有与 mask 值匹配的项：
~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

示例后端处理程序（Node.js/Express）：

~~~js
app.get("/api/countries", async (req, res) => {
  const { id, mask } = req.query;
  // 通过 id 或 mask 查询数据源
  const items = await countriesService.find({ id, mask });
  res.json(items); // [{ value: 1, text: "Albania" }, ...]
});
~~~


[从服务器填充组合框](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## 自动筛选模式

自动筛选模式是在用户输入时自动过滤选项的模式。要启用该模式，请将 **filtering** 属性设置为 true：

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
请注意，无论数据来自何处（客户端还是服务器端），均可使用自动筛选模式。
:::


更多相关信息请参阅 dhtmlxCombo 文档 <a href="https://docs.dhtmlx.com/combo__filtering.html">dhtmlxCombo. Filtering</a> 。