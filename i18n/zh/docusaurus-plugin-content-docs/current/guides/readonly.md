---
title: "只读模式"
sidebar_label: "只读模式"
---

# 只读模式

本节将介绍四种不同场景下的只读模式:

1. [整个调度器的只读模式](guides/readonly.md#readonlymodefortheentirescheduler)；
2. [整个弹窗（lightbox）的只读模式](guides/readonly.md#readonlymodefortheentirelightbox)；
3. [弹窗某个 section 的只读模式](guides/readonly.md#readonlymodeforalighboxssection)；
4. [特定事件的只读模式](guides/readonly.md#readonlymodeforspecificevents)。

## 整个调度器的只读模式 {#readonlymodefortheentirescheduler}

要将整个调度器设置为只读，只需将 [readonly](api/config/readonly.md) 选项赋值为 *true*。

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~
请注意，当整个调度器为只读时，用户将无法打开弹窗（lightbox）。

## 整个弹窗的只读模式 {#readonlymodefortheentirelightbox}

如果你希望用户可以打开弹窗，但阻止他们在其中进行任何编辑，可以将 [readonly_form](api/config/readonly_form.md) 选项设置为 *true*:

~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~

:::note
[readonly](api/config/readonly.md) 选项属于 [readonly](guides/extensions-list.md#readonly) 扩展，因此请确保在页面上启用该扩展。
:::


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## 弹窗某个 section 的只读模式 {#readonlymodeforalighboxssection}

如果只想让弹窗中的某一个 section 变为只读，可以在该 section 对应的 DOM 元素上使用 'disabled' 属性:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   var section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
请注意，这里是通过类型引用 section，因此所有该类型的 section 都会同时变为只读。
:::

## 特定事件的只读模式 {#readonlymodeforspecificevents}

如果你想让某些事件变为只读，只需为其添加 'readonly' 属性并设置为 true:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
该功能属于 [readonly](guides/extensions-list.md#readonly) 扩展，请确保在页面上启用该扩展。
:::


[Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)
