---
sidebar_label: "onEventCollision"
title: "onEventCollision event"
description: "当用户尝试在已被占用的时间段内创建新事件或修改现有事件时触发"
---

# onEventCollision

### Description

@short: 当用户尝试在已被占用的时间段内创建新事件或修改现有事件时触发

@signature: onEventCollision: (ev: object, evs: array) =\> boolean;

### Parameters

- `ev` - (required) *object* - 事件对象
- `evs` - (required) *array* - 已在相同时段安排的事件对象集合

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onEventCollision", function (ev, evs){
    // 在此处添加自定义逻辑
    return true;
});
~~~

### Details

:::note
 该事件需要激活[collision](guides/extensions-list.md#collision)插件。 
:::

从处理函数返回<i>true</i>会阻止事件被添加或编辑。返回<i>false</i>则允许时间冲突，意味着事件会被添加或编辑，尽管存在重叠。
