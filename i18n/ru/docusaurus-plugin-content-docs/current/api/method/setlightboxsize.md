---
sidebar_label: "setLightboxSize"
title: "setLightboxSize method"
description: "обновляет размер lightbox"
---

# setLightboxSize

### Description

@short: Обновляет размер lightbox

@signature: setLightboxSize: () =\> void

### Example

~~~jsx
var control = scheduler.formSection("description");
control.header.style.display = "none";

scheduler.setLightboxSize();
~~~

### Details

Этот метод полезен для корректировки размера lightbox после того, как некоторые секции были скрыты или показаны.
