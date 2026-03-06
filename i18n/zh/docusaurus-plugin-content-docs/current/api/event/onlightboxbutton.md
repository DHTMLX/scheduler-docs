---
sidebar_label: "onLightboxButton"
title: "onLightboxButton event"
description: "当用户点击 lightbox 内的自定义按钮时触发"
---

# onLightboxButton

### Description

@short: 当用户点击 lightbox 内的自定义按钮时触发

@signature: onLightboxButton: (id: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 按钮的 id
- `node` - (required) *HTMLElement* - 被点击按钮的 HTML 元素
- `e` - (required) *event* - 原生的 'click' 事件对象

### Example

~~~jsx
scheduler.attachEvent("onLightboxButton", function (id, node, e){
    // 在这里编写任何自定义逻辑
});
~~~

### Related samples
- [Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

### Details

此事件仅在 lightbox 底部的自定义按钮被点击时触发。默认按钮或 section 按钮点击时不会触发此事件。

要判断 lightbox 当前是打开还是关闭状态，可以通过调用 [getState](api/method/getstate.md) 方法返回的 state 对象中的 **lightbox_id** 属性来检查。
当 lightbox 打开时，该方法返回当前活动事件的 id；当 lightbox 关闭时，返回 'null' 或 'undefined':

~~~js
if (scheduler.getState().lightbox_id){
    // lightbox 打开时的逻辑
} else {
    // lightbox 关闭时的逻辑
}
~~~

### Related Guides
- [Lightbox 조작하기](guides/lightbox-editors-manipulations.md#checkingwhetherthelightboxisopened)
