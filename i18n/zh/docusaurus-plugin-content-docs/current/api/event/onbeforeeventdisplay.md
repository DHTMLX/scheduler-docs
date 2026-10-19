---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay event"
description: "filters events before rendering"
---

# onBeforeEventDisplay

@short: 在事件渲染前触发。返回 `false` 可隐藏事件；所有处理程序都必须返回 `true`。

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

在事件渲染前触发。返回 `false` 可隐藏事件；所有处理程序都必须返回 `true`。

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){ return true; });
~~~