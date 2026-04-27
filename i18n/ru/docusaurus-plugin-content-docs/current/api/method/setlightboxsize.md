---
sidebar_label: setLightboxSize
title: "setLightboxSize метод"
description: "заставляет лайтбокс изменить размер"
---

# setLightboxSize

### Description

@short: Заставляет лайтбокс изменить размер

@signature: setLightboxSize: () =\> void

### Example

~~~jsx
var control = scheduler.formSection("description");
control.header.style.display = "none";

scheduler.setLightboxSize();
~~~

### Details

Метод можно использовать для обновления размера лайтбокса после скрытия/показа некоторого раздела.