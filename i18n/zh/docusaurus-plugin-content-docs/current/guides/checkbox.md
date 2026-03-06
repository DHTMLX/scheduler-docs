---
title: "Checkbox"
sidebar_label: "Checkbox"
---

# Checkbox 

一个简单的双状态复选框。

![checkbox_editor](/img/checkbox_editor.png)

~~~js        
scheduler.locale.labels.section_checkme = "I'm going to participate";     
            
scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"checkme", map_to:"participation", type:"checkbox", 
    checked_value: "registrable", unchecked_value: "unchecked", height:40 },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## 初始化

要在 lightbox 中包含 Checkbox 控件，需要完成以下步骤:

1. 在页面上启用 editors 扩展:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. 将复选框区域添加到 lightbox 配置中:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"checkme", map_to:"single_checkbox", type:"checkbox", 
    checked_value: "registrable", height:40},
    { name:"time", ...}
];
~~~
3. 为复选框区域定义标签:
~~~js
scheduler.locale.labels.section_checkme = "I'm going to participate"; 
~~~
  

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## 属性

以下是 'checkbox' 控件常用的主要属性（完整列表请参见 [这里](api/config/lightbox.md)）:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 区域的标识符</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 区域的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 该区域关联的数据属性</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 区域的控件类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) 复选框选中时赋予的值。可选，默认为 <i>true</i></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) 复选框未选中时赋予的值。可选，默认为 <i>false</i></td>
  </tr>
  </tbody>
</table>
