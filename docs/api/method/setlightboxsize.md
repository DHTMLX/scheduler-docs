---
sidebar_label: setLightboxSize
title: "setLightboxSize method"
description: "forces the lightbox to resize"
---

# setLightboxSize

### Description

@short: Forces the lightbox to resize

@signature: setLightboxSize: () =\> void

### Example

~~~jsx
var control = scheduler.formSection("description");
control.header.style.display = "none";

scheduler.setLightboxSize();
~~~

### Details

The method can be used to update the lightbox size after hiding/showing some section.
