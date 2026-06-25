---
title: "模板"
sidebar_label: "模板"
---

# 模板

一个包含一些 HTML 内容的容器。

![模板编辑器](/img/template_editor.png)

~~~js
scheduler.locale.labels.section_template = 'Details';// 设置该区域的名称

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~

## 初始化

要将 <code>Template</code> 控件添加到灯箱，请按照以下步骤：

1. <b>将该段添加到 lightbox 的配置中：</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. <b>为该段设置标签：</b>
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. <b>通过某些事件设置控件的内容，例如 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件：</b>
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

   

## 属性

以下属性在 <code>'template'</code> 控件中最为重要并且常被设置（完整清单请参见 [此处](api/config/lightbox.md)）：

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
  <td>(<i>string</i>) 将映射到该段的数据属性的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea, time, select, template, multiselect, radio, checkbox, combo</i>) 该段控件的类型</td>
  </tr>
  </tbody>
</table>