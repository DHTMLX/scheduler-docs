---
sidebar_label: "onLocationError"
title: "onLocationError event"
description: "当地图上找不到事件位置时触发（仅限地图视图）"
---

# onLocationError

### Description

@short: 当地图上找不到事件位置时触发（仅限地图视图）

@signature: onLocationError: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的ID

### Example

~~~jsx
// 该处理程序在无法确定事件位置时，设置格林威治皇家天文台的坐标

scheduler.attachEvent("onLocationError", function (id){
    alert("无法找到位置");
    return google.maps.LatLng(51.477840, -0.001492); 
    // 格林威治皇家天文台的坐标
});
~~~

### Details

:::note

只有启用了 [map_resolve_event_location](api/config/map_resolve_event_location.md) 配置属性时，才会触发此事件。
 
:::

<br>

**事件的工作原理是什么？**

- 当数据库中的事件缺少 'lat' 和 'lng' 值时，scheduler 会尝试在加载事件时根据 'event_location' 的值解析坐标。如果成功找到位置，坐标会被保存到数据库中。否则，会触发 **onLocationError** 事件。
- [map_resolve_event_location](api/config/map_resolve_event_location.md) 配置属性主要用于迁移目的，而非生产环境使用。
- 此事件仅适用于从数据库加载的事件。

该事件允许处理调度器遇到无效或缺失位置的事件的情况。例如，当发生错误时，可以返回一个带有备用坐标的 **google.maps.LatLng** 对象，赋值给该事件。
