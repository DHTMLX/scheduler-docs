---
sidebar_label: "lightbox"
title: "lightbox config"
description: "指定 lightbox 对象"
---

# lightbox

### Description

@short: 指定 lightbox 对象

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections=[    
    { name:"description", height:50, type:"textarea", map_to:"text", focus:true},
    { name:"location",    height:43, type:"textarea", map_to:"event_location"},
    { name:"time",           height:72, type:"time",     map_to:"auto"}    
];
...            
scheduler.init('scheduler_here',new Date(2027,2,1),"week");
~~~

### Related samples
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

lightbox 对象包含一个主要属性:

- **sections** - (*数组*) 定义在 lightbox 中显示的各个部分

~~~js
//默认定义
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
]
~~~

**sections** 数组中的每个项可以包含以下属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>字符串</i>) 部分的名称，scheduler 会通过 <i>locale.labels</i> 集合获取该部分的标签。例如，<b>'time'</b> 部分的标签为 <b>scheduler.locale.labels.section_time</b>。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>数字</i>) 部分的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' 或字符串</i>) 与该部分关联的数据属性名称（详见下文）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 部分使用的控件类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>字符串</i>) 定义"时间段"部分中日期和时间控件的排列顺序</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>布尔值</i>) 如果设置为 <i>true</i>，lightbox 打开时该部分将自动获得焦点</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>任意类型</i>) 该部分控件的默认值</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>函数</i>) 控件的 'onChange' 事件处理函数（<b>仅适用于 'select' 控件</b>）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>对象数组</i>) 定义类似 <b>'select', 'multiselect', 'radio', 'combo'</b> 控件的选项。<br> 每个对象表示一个选项，包含以下属性:<ul><li><b>key</b> - (<i>字符串</i>) 选项的 ID，用于匹配事件数据属性</li><li><b>label</b> - (<i>字符串</i>) 选项的显示标签</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>布尔值</i>) 决定 radio 按钮是垂直排列 (<i>true</i>) 还是水平排列 (<i>false</i>)（<b>仅适用于 'select' 控件</b>）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>布尔值</i>) 复选框被选中时的值。可选，默认为 <i>true</i>（<b>仅适用于 'checkbox' 控件</b>）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>布尔值</i>) 复选框未选中时的值。可选，默认为 <i>false</i>（<b>仅适用于 'checkbox' 控件</b>）</td>
  </tr>
  </tbody>
</table>

## 'map_to:"auto"' 是什么意思？

当 'map_to' 属性设置为 'auto' 时:

- 控件本身不返回值，而是通过 'set_value()' 方法直接更新事件的属性（详见 [Custom Lightbox Control](guides/custom-lightbox-editor.md)）。
- 通常用于同时处理多个事件属性的复杂控件。

### Related Guides
- [완전히 커스텀된 라이트박스](guides/custom-details-form.md)
