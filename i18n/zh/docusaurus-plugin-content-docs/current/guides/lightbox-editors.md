---
title: "灯箱控件"
sidebar_label: "灯箱控件"
---

# 灯箱控件

灯箱是一个用于修改事件详细信息的编辑表单。默认的灯箱如下图所示。

![lightbox](/img/lightbox.png)

## 灯箱结构

### Sections
灯箱的布局由 [lightbox](api/config/lightbox.md) 对象的 **sections** 属性定义:

~~~js
// 默认灯箱定义
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**sections** 数组中的每一项都是一个对象，用于定义灯箱中的特定部分（[可用 section 属性](api/config/lightbox.md)）。


### Sections 控件 {#sections-controls}
灯箱中的每个 section 都是围绕某个特定控件构建的。灯箱中可以使用以下控件类型:

- [Textarea](guides/textarea.md) - 多行文本输入框
- [시간 및 날짜](guides/time.md) - 一对用于指定时间范围的日期选择器
- [Select](guides/select.md) - 单选下拉列表
- [Template](guides/template.md) - 包含一些 HTML 内容的容器
- <span id="multiselect"></span>[Multiselect](guides/multiselect.md) - 一组复选框
- <span id="checkbox"></span>[Checkbox](guides/checkbox.md) - 两态复选框
- <span id="radio"></span>[Radio](guides/radio.md) - 一组单选按钮
- <span id="combo"></span>[Combo](guides/combo.md) - 由 DHTMLX Combo 组件实现的组合框

:::note
请注意，无论编辑器的组合如何，'time' 编辑器应始终放在灯箱的最后。
:::

~~~js
{name:"recurring", height:21, type:"select", map_to:"rec_type", options:[
    {key:"", label:"Do not repeat"},
    {key:"day", label:"Each day"},
    {key:"week", label:"Each week"},
    {key:"month", label:"Each month"}
]}
~~~
