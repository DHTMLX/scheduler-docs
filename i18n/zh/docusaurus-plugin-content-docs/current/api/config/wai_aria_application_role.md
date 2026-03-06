---
sidebar_label: "wai_aria_application_role"
title: "wai_aria_application_role config"
description: "指定是否应将 role='application' 分配给主调度器容器和迷你日历元素"
---

# wai_aria_application_role

### Description

@short: 指定是否应将 role="application" 分配给主调度器容器和迷你日历元素

@signature: wai_aria_application_role: boolean

### Example

~~~jsx
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");
~~~

**Default value:** true

### Details

自版本 5.0 起新增

控制屏幕阅读器如何处理调度器界面。

### Related Guides
- [접근성](guides/accessibility.md)
