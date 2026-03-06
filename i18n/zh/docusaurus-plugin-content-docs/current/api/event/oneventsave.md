---
sidebar_label: "onEventSave"
title: "onEventSave event"
description: "当用户点击 lightbox（编辑表单）中的'保存'按钮时触发"
---

# onEventSave

### Description

@short: 当用户点击 lightbox（编辑表单）中的"保存"按钮时触发

@signature: onEventSave: (id: string, ev: object, original_ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 事件的 ID
- `ev` - (required) *object* - 一个中间事件对象，包含来自 lightbox 的值
- `is_new` - (required) *Date* - 如果保存的是新事件，则提供该事件的创建日期；如果事件已存在，则为 <i>null</i>

### Returns
- ` result` - (boolean) - 决定是否继续执行默认事件操作（<b>true</b>）或阻止它（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev,is_new){
    if (!ev.text) {
        alert("文本不能为空");
        return false;
    }
    if (!ev.text.length<20) {
        alert("文本太短");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)

### Details

此事件可以被阻止，非常适合用于验证。当返回 *false* 时，将阻止默认的保存过程。

请注意:

- 当此事件触发时，lightbox 中的值尚未应用到原始事件，因此 <code>scheduler.getEvent(id)</code> 返回的是原始状态的事件。
- 'ev' 对象仅包含与 lightbox 中输入对应的属性；例如，如果 lightbox 只有一个输入，'ev' 就只会有那个单一属性。
