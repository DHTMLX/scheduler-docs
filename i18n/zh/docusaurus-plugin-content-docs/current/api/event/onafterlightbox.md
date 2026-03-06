---
sidebar_label: "onAfterLightbox"
title: "onAfterLightbox event"
description: "当用户关闭 lightbox（编辑表单）时触发"
---

# onAfterLightbox

### Description

@short: 当用户关闭 lightbox（编辑表单）时触发

@signature: onAfterLightbox: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterLightbox", function (){
    //在此处添加任何自定义逻辑
});
~~~
