---
title: "模板（Template）"
sidebar_label: "模板（Template）"
---

# 模板（Template）

一个用于容纳部分 HTML 内容的容器。

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// 设置该区域的名称

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~


## 初始化

要在 lightbox 中包含 Template 控件，需要执行以下步骤:
1. 在 lightbox 配置中添加该区域:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. 为该区域定义标签:
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. 通过事件为控件提供内容，例如 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件:
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

  


## 属性

以下是 'template' 控件常用的一些关键属性（完整列表请参见[这里](api/config/lightbox.md)）:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 区域的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 区域的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 映射到该区域的数据属性名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 区域中使用的控件类型</td>
  </tr>
  </tbody>
</table>
