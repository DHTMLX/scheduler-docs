---
title: "只读模式"
sidebar_label: "只读模式"
---

# 只读模式

在本节中，我们将只读模式放在以下四种情境中进行考虑：

1. [为整个调度器设置只读模式](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [为整个 Lightbox（编辑弹出窗）设置只读模式](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [为某个 Lightbox 的区域设置只读模式](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [为特定事件设置只读模式](guides/readonly.md#read-only-mode-for-specific-events).

## 为整个调度器设置只读模式

要将整个调度器设为只读，请将 [`readonly`](api/config/readonly.md) 选项设置为 `true`。

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

注意，当整个调度器不可编辑时，用户将无法打开 Lightbox（编辑弹出窗）。

## 为整个 Lightbox（编辑弹出窗）设置只读模式

为了让用户仍然可以打开 Lightbox（编辑弹出窗），但禁止其中任何编辑，请将 [`readonly_form`](api/config/readonly_form.md) 选项设置为 `true`：


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

:::note
[`readonly`](api/config/readonly.md) 选项在 [readonly](guides/extensions-list.md#readonly) 扩展中提供，要使用它，请在页面上启用该扩展。
:::

### 相关示例
- [只读灯箱](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## 为 Lightbox 的区域设置只读模式

要将某个 Lightbox 的区域设为只读，请使用相关区域对象的 DOM 元素的 `disabled` 属性：

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];

scheduler.attachEvent("onLightbox", () => {
    const descriptionSection = scheduler.formSection("description");
    descriptionSection.control.disabled = true;
});
~~~

:::note
请注意，你通过它的类型来引用该区域；具有该类型的所有区域将同时变为只读。
:::

## 为特定事件设置只读模式

要让特定事件变为只读，请在它们上添加 `readonly` 属性并将其设为 `true`：

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
该功能由 [readonly](guides/extensions-list.md#readonly) 扩展提供，使用该功能请在页面上启用该扩展。
:::

### 相关示例
- [只读事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)