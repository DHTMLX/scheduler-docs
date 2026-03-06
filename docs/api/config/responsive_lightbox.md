---
sidebar_label: responsive_lightbox
title: "responsive_lightbox config"
description: "makes lightbox responsive on small screens"
---

# responsive_lightbox

### Description

@short: Makes lightbox responsive on small screens

@signature: responsive_lightbox: boolean

### Example

~~~jsx
scheduler.config.responsive_lightbox = true;
~~~

**Default value:** false

### Details

When this config is enabled (by default it's not), the lightbox will have an additional `.dhx_cal_light_responsive` CSS class.

All built-in skins of the scheduler have predefined media queries that make the lightbox adaptive on smaller screens, which means that: 

- the lightbox will occupy the whole screen on a mobile device
- all labels and controls should be sized appropriately to the screen size

![lightbox_responsive](/img/lightbox_responsive.png)

If you want to enable this behavior, you can switch the config on like this:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
