---
sidebar_label: "onBeforeEventChanged"
title: "onBeforeEventChanged event"
description: "当通过拖拽修改事件但更改尚未保存时触发。"
---

# onBeforeEventChanged

### Description

@short: 当通过拖拽修改事件但更改尚未保存时触发。

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - 事件修改后的数据对象
- `e` - (required) *Event* - 原生事件对象
- `is_new` - (required) *boolean* - 如果用户正在修改一个新事件，返回 'true'；如果编辑的是已有事件，返回 'false'
- `original` - (required) *object* - 事件修改前的数据对象

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
    //这里写任何自定义逻辑
    return true;
});
~~~

### Details

每当通过拖拽添加新事件或更新已有事件时，都会触发此事件。

- 请注意，处理函数中的第一个参数是数据项对象本身，而不仅仅是其ID（因为新建项可能尚未有ID）。
- 创建新数据项时，未修改的事件将表现为空对象。
- 此事件是可取消的:处理函数返回 *false* 将阻止数据更新。
