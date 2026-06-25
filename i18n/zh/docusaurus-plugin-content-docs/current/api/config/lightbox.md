---
sidebar_label: lightbox
title: "lightbox 配置"
description: "指定 lightbox 对象"
---

# lightbox

### Description

@short: 指定 lightbox 对象

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections = [
    { name: "description", height: 50, type: "textarea", map_to: "text", focus: true },
    { name: "location", height: 43, type: "textarea", map_to: "event_location" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
...
scheduler.init('scheduler_here', new Date(2027, 2, 1), "week");
~~~

### Related samples
- [lightbox 中的复选框](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [lightbox 中的单选按钮](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

lightbox 对象包含一个主要属性:

- `sections` - (<i>array</i>) specifies the lightbox sections

~~~js
//默认定义
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~

Each object in the **sections** array can have the following properties:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 区段的名称（根据这个名称，调度器将从 <i>locale.labels</i> 集合中获取该区段的标签）。例如，对于 <b>'time'</b> 区段，调度器将获取存储为 <b>`scheduler.locale.labels.section_time`</b> 的标签。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 区段的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' or string</i>) 将映射到该区段的数据属性名称（见下方详情）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 区段控件（编辑器）类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) 设置 <i>'Time Period'</i> 区段中日期时间控件的顺序</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) 如果设置为 <i>true</i>，打开 lightbox 时该区段将获得焦点</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) 该区段控件的默认值</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) 指定该区段控件的 <i>'onChange'</i> 事件处理函数（<b>仅适用于 'select' 控件</b>）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) 定义控件的选项（适用于 <b>'select', 'multiselect', 'radio', 'combo'</b> 控件）。数组中的每个对象定义一个选项，并包含以下属性：<ul><li><b>key</b> - (<i>string</i>) 选项的 id。此属性会与事件的数据属性进行比较以将选项分配给事件</li><li><b>label</b> - (<i>string</i>) 选项的标签</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) 指定单选按钮应垂直排列（<i>true</i>）还是水平排列（<i>false</i>）<br><b>仅适用于 'select' 控件</b></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) 勾选状态下复选框的值。可选。默认值为 <i>true</i>（<b>仅适用于 'checkbox' 控件</b>）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) 未勾选状态下复选框的值。可选。默认值为 <i>false</i>（<b>仅适用于 'checkbox' 控件</b>）</td>
  </tr>
  </tbody>
</table>

## 'map_to:"auto"' 是什么意思？

当 `map_to` 属性设置为 `auto` 时:

- 控件本身不返回值，而是通过 `set_value()` 方法直接更新事件的属性（详见 [Custom Lightbox Control](guides/custom-lightbox-editor.md)）。
- 通常用于同时处理多个事件属性的复杂控件。

### Related Guides
- [Fully Custom Lightbox](guides/custom-details-form.md)