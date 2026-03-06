---
sidebar_label: "onBeforeTodayDisplayed"
title: "onBeforeTodayDisplayed event"
description: "当调度器中的'Today'按钮被点击时触发"
---

# onBeforeTodayDisplayed

### Description

@short: 当调度器中的"Today"按钮被点击时触发

@signature: onBeforeTodayDisplayed: () =\> boolean

### Returns
- ` result` - (boolean) - 指示是否应继续执行默认事件操作（<b>true</b>）或阻止该操作（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    // 在此处放置任何自定义逻辑
    return true;
});
~~~
