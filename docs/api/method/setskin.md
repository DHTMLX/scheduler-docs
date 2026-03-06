---
sidebar_label: setSkin
title: "setSkin method"
description: "sets the active skin"
---

# setSkin

### Description

@short: Sets the active skin

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - the name of the skin. The allowed values are: "terrace", "dark", "material", "flat", "contrast-white", "contrast-black"

### Example

~~~jsx
scheduler.setSkin("flat");
~~~

### Related samples
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)

### Details

If the method is called after a scheduler is initialized, it will trigger the [render](api/method/render.md) method. 

If called before initialization, the method will have the same effect as the assignment of the `scheduler.skin` property:

~~~js
scheduler.skin = "flat";
~~~

### Related Guides
- [Skins](guides/skins.md)
