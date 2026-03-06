---
title: "Textarea"
sidebar_label: "Textarea"
---

# Textarea

多行文本输入字段。

![textarea_editor](/img/textarea_editor.png)

~~~js
scheduler.locale.labels.section_text = 'Text';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 初始化

默认情况下，lightbox 包含一个 Textarea 控件。若需添加额外的 Textarea，请按照以下步骤操作:
1. 在 lightbox 配置中包含新的 section:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"location", height:50, map_to:"location", type:"textarea"},
    { name:"time", ...}
];
~~~
2. 为新 section 定义标签:
~~~js
scheduler.locale.labels.section_location = "Location";
~~~

  


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## 属性

以下是 'textarea' 控件常用的一些关键属性（完整列表请参见[这里](api/config/lightbox.md)）:

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
  <td>(<i>string</i>) 与该 section 关联的数据属性名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) section 的控件类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>placeholder</b></td>
  <td>(<i>string</i>) 当 textarea 为空时显示的占位符文本</td>
  </tr>
  </tbody>
</table>
