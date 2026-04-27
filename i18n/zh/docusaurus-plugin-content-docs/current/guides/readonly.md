---
title: "只读模式"
sidebar_label: "只读模式"
---

# 只读模式

在本部分，我们将从以下四种情景来考虑只读模式：

1. [对整个调度器的只读模式](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [对整个 lightbox 的只读模式](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [对 lightbox 的某个部分的只读模式](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [对特定事件的只读模式](guides/readonly.md#read-only-mode-for-specific-events).

## 对整个调度器的只读模式

要将整个调度器设为只读，请将 [readonly](api/config/readonly.md) 选项设置为 *true*。

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~

注，当整个调度器不可编辑时，用户不能打开 lightbox。

## 对整个 lightbox 的只读模式

要让用户有打开 lightbox 的可能性，但禁止在其中进行任何编辑，请将 [readonly_form](api/config/readonly_form.md) 选项设置为 *true*：

~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~

:::note
该 [readonly](api/config/readonly.md) 选项由 [readonly](guides/extensions-list.md#readonly) 扩展提供，若要使用它，请在页面上启用该扩展。
:::

[只读 lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

## 对 lightbox 的某个部分的只读模式

为了让某个 lightbox 的部分只读，请使用相关 section 对象的 DOM 元素的 'disabled' 属性：

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   const section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
通过其类型来引用该部分，具有此类型的所有部分将同时变为只读
:::

## 对特定事件的只读模式

要将特定事件设为只读，请为它们添加属性 'readonly'，并将其设为 true：

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
该功能在 [readonly](guides/extensions-list.md#readonly) 扩展中提供，要使用它，请在页面上启用该扩展。
:::

[只读事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)