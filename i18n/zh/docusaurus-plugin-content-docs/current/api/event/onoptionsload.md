---
sidebar_label: "onOptionsLoad"
title: "onOptionsLoad event"
description: "在 Timeline/Units 视图的部分内容更新后触发"
---

# onOptionsLoad

### Description

@short: 在 Timeline/Units 视图的部分内容更新后触发

@signature: onOptionsLoad: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoad", function (){
    //这里写任何自定义逻辑
});
~~~

### Details

当发生以下情况时，此事件会被触发:

- Timeline/Unit 视图根据当前的 [y_unit](views/timeline.md#initialization) 或 [list](views/units.md#initialization) 属性设置，重新计算哪些部分是可见的；
- 执行了 [scheduler.resetLightbox](api/method/resetlightbox.md)；
- 执行了 [scheduler.setCurrentView](api/method/setcurrentview.md)。

你会在以下几种场景中看到此事件被触发:

- Timeline/Units 视图初始化并首次解析部分内容时；
- 使用 [data](guides/data-formats.md#json-with-collections) 加载部分内容时；
- 每次调用 [scheduler.updateCollection](api/method/updatecollection.md) 时。
