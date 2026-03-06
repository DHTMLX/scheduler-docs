---
sidebar_label: "onAfterSchedulerResize"
title: "onAfterSchedulerResize event"
description: "当调度器的大小更新且数据区域重新绘制后触发"
---

# onAfterSchedulerResize

### Description

@short: 当调度器的大小更新且数据区域重新绘制后触发

@signature: onAfterSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterSchedulerResize", function(){
    //在此处编写自定义逻辑
});
~~~
