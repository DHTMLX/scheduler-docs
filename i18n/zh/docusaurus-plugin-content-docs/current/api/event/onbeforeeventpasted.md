---
sidebar_label: "onBeforeEventPasted"
title: "onBeforeEventPasted event"
description: "在用户按下 'CTRL+V' 快捷键之前触发"
---

# onBeforeEventPasted

### Description

@short: 在用户按下 'CTRL+V' 快捷键之前触发

@signature: onBeforeEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> boolean

### Parameters

- `isCopy` - (required) *boolean* - 指示事件是在粘贴前被复制还是剪切。<em>true</em> 表示事件是被复制的
- `pasted_ev` - (required) *object* - 粘贴后创建的新事件对象
- `original_ev` - (required) *object* - 被复制或剪切的原始事件对象

### Returns
- ` result` - (boolean) - 决定事件的默认行为是继续执行（<b>true</b>）还是被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // 这里你可以修改 `pastedEvent`
    return true; 
});
~~~

### Details

确保已启用"keyboard navigation"扩展。

### Related API
- [onEventPasted](api/event/oneventpasted.md)
