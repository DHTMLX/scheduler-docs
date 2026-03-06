---
title: "无障碍访问"
sidebar_label: "无障碍访问"
---

# 无障碍访问

[无障碍访问](https://www.w3.org/WAI/fundamentals/accessibility-intro/) 在现代 Web 应用程序中扮演着重要角色。 
有多种技术旨在让应用程序或网站更易于使用和交互。

为了提升残障用户对 DHTMLXScheduler 的访问性和可用性，该组件包含了多项无障碍特性:

- WAI-ARIA 属性
- 键盘导航
- 高对比度主题

## WAI-ARIA 属性 {#wai-aria-attributes}

DHTMLXScheduler 通过在组件标记中添加特殊属性来支持 WAI-ARIA。 
这些属性有助于屏幕阅读器更有效地识别和解释组件内容。

详细信息可参见 [官方 WAI-ARIA 规范](https://www.w3.org/WAI/standards-guidelines/aria/)。

默认情况下，Scheduler 中启用了 WAI-ARIA 属性。如果需要，可以通过将 *wai_aria_attributes* 属性设置为 *false* 来关闭:

~~~js
scheduler.config.wai_aria_attributes = false;
~~~

此外，也可以选择启用或禁用主调度器容器和 minicalendar 元素上的 [*role="application"* 属性](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#Enter_WAI-ARIA)。该设置通过 [wai_aria_application_role](api/config/wai_aria_application_role.md) 属性控制，默认值为 *true*。

~~~js
scheduler.config.wai_aria_application_role = false;
~~~


## 键盘导航

这种方式允许用户通过键盘按键和组合键来访问所有应用功能，而无需依赖鼠标指针。

详细信息请参见 [키보드 내비게이션](guides/keyboard-navigation.md) 文章。

## 高对比度主题 {#high-contrast-themes}

DHTMLXScheduler 提供了高对比度配色的主题，使界面更为清晰易辨。 
这些主题对于有特殊视觉需求的用户尤其有帮助。

提供了两种高对比度主题选项:

- contrast black skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_black.css">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


- contrast white skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_white.css">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
