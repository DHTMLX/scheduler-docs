---
sidebar_label: "onLightbox"
title: "onLightbox event"
description: "在用户打开 lightbox（编辑表单）后立即触发"
---

# onLightbox

### Description

@short: 在用户打开 lightbox（编辑表单）后立即触发

@signature: onLightbox: () =\> void

### Parameters

- `id` - (required) *string* - 事件的 id

### Example

~~~jsx
scheduler.attachEvent("onLightbox", function (id){
    // 在这里编写自定义逻辑
});
~~~

### Details

此事件适用于自定义 lightbox 的各个方面。
