---
sidebar_label: "responsive_lightbox"
title: "responsive_lightbox config"
description: "使 lightbox 在较小屏幕上能够平滑调整"
---

# responsive_lightbox

### Description

@short: 使 lightbox 在较小屏幕上能够平滑调整

@signature: responsive_lightbox: boolean

### Example

~~~jsx
scheduler.config.responsive_lightbox = true;
~~~

**Default value:** false

### Details

开启此选项（默认关闭）会给 lightbox 添加一个 `.dhx_cal_light_responsive` 的 CSS 类。

所有 scheduler 内置的 skins 都包含了媒体查询，帮助 lightbox 更好地适应较小屏幕。这意味着:

- 在移动设备上，lightbox 会拉伸填满整个屏幕
- 标签和控件会调整大小以适应屏幕

![lightbox_responsive](/img/lightbox_responsive.png)

要启用此功能，只需这样设置配置项:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
