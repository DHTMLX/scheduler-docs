---
sidebar_label: "onOptionsLoadStart"
title: "onOptionsLoadStart event"
description: "在一组选项或区块开始从服务器加载之前触发（仅适用于Timeline视图）"
---

# onOptionsLoadStart

### Description

@short: 在一组选项或区块开始从服务器加载之前触发（仅适用于Timeline视图）

@signature: onOptionsLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadStart", function (){
    //这里编写任何自定义逻辑
});
~~~

### Details

该事件仅在通过dhtxmlConnector加载集合或使用[updateCollection](api/method/updatecollection.md)方法时触发。
