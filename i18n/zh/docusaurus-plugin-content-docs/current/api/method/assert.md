---
sidebar_label: "assert"
title: "assert method"
description: "如果给定的表达式为 false，将在屏幕右上角以红色弹窗形式显示错误信息"
---

# assert

### Description

@short: 如果给定的表达式为 false，将在屏幕右上角以红色弹窗形式显示错误信息

@signature: assert: (expression: boolean, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *boolean* - 用于判断表达式是否为真，若断言失败则为 false
- `errorMessage` - (required) *string* - 将在红色弹窗中显示的错误信息

### Example

~~~jsx
scheduler.attachEvent("onLoadEnd", function(){
   scheduler.assert(scheduler.getTaskCount(), "no data loaded");
});
~~~

### Details

在 dhtmlxScheduler 代码库中，**scheduler.assert()** 用于检测组件是否处于无效状态。

你可以通过 [show_errors](api/config/show_errors.md) 配置自定义错误显示方式。

错误也可以通过 [onError](api/event/onerror.md) 事件以编程方式进行监控。

### Change log
- added in v6.0
