---
sidebar_label: "setLightboxSize"
title: "setLightboxSize method"
description: "更新 lightbox 的大小"
---

# setLightboxSize

### Description

@short: 更新 lightbox 的大小

@signature: setLightboxSize: () =\> void

### Example

~~~jsx
var control = scheduler.formSection("description");
control.header.style.display = "none";

scheduler.setLightboxSize();
~~~

### Details

当某些 section 被隐藏或显示后，此方法用于调整 lightbox 的大小。
