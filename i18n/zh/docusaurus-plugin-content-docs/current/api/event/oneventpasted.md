---
sidebar_label: "onEventPasted"
title: "onEventPasted event"
description: "当用户按下 'CTRL+V' 键盘快捷键时触发"
---

# onEventPasted

### Description

@short: 当用户按下 'CTRL+V' 键盘快捷键时触发

@signature: onEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> void;

### Parameters

- `isCopy` - (required) *boolean* - 指示事件是在粘贴之前被复制还是剪切。值为 <em>true</em> 表示事件是复制的
- `pasted_ev` - (required) *object* - 粘贴操作后新创建的事件对象
- `original_ev` - (required) *object* - 被复制或剪切的原始事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
    //这里编写自定义逻辑
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### Details

:::note
 该事件需要启用 [key_nav](guides/extensions-list.md#keyboard-navigation) 扩展。 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
