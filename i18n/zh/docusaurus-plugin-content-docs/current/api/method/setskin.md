---
sidebar_label: "setSkin"
title: "setSkin method"
description: "更改当前激活的 skin"
---

# setSkin

### Description

@short: 更改当前激活的 skin

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - 要应用的 skin 名称。有效选项包括:"terrace"、"dark"、"material"、"flat"、"contrast-white"、"contrast-black"

### Example

~~~jsx
scheduler.setSkin("flat");
~~~

### Related samples
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)

### Details

当此方法在 scheduler 初始化后调用时，会触发 [render](api/method/render.md) 方法以更新显示。

如果在初始化之前调用，它的效果与直接设置 `scheduler.skin` 属性相同:

~~~js
scheduler.skin = "flat";
~~~

### Related Guides
- [스킨(Skins)](guides/skins.md)
