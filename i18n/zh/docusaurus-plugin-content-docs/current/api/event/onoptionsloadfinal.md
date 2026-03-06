---
sidebar_label: "onOptionsLoadFinal"
title: "onOptionsLoadFinal event"
description: "当一个选项（sections）集合加载完成时触发（仅适用于Timeline视图）"
---

# onOptionsLoadFinal

### Description

@short: 当一个选项（sections）集合加载完成时触发（仅适用于Timeline视图）

@signature: onOptionsLoadFinal: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadFinal", function (){
    // 可以在此处放置自定义逻辑
});
~~~

### Details

该事件仅在通过dhtxmlConnector加载集合或使用[updateCollection](api/method/updatecollection.md)方法时触发。
