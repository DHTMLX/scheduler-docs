---
sidebar_label: "csp"
title: "csp config"
description: "指定日期格式化方法在内部的实现方式"
---

# csp

### Description

@short: 指定日期格式化方法在内部的实现方式

@signature: csp: boolean | string

### Example

~~~jsx
scheduler.config.csp = true;
...
scheduler.init("gantt_here");
~~~

**Default value:** "auto"

### Details

某些运行环境，比如 Salesforce Lightning，可能会阻止 dhtmlxScheduler 的代码正常运行。这通常是因为应用中设置了内容安全策略（Content Security Policy，CSP）。

CSP 可能认为 Scheduler 内部执行日期格式化方法的方式是不安全的。

**csp** 配置项帮助避免 scheduler 代码被阻止，允许你选择这些方法的实现方式。

**scheduler.date.date_to_str** 和 **scheduler.date.str_to_date** 在内部有三种工作模式:

- 默认情况下，设置为 *auto*。

~~~js
scheduler.config.csp = "auto";
~~~

在此模式下，Scheduler 尝试使用最快的代码进行日期格式化。如果应用设置不允许，则回退到兼容版本。

- 你可以通过设置为 *true*，强制 Scheduler 始终使用兼容代码。

~~~js
scheduler.config.csp = true;
~~~

这保证代码在任何地方都能运行，但可能运行速度较慢。

- 或者，你可以设置为 *false*，始终使用高性能代码。

~~~js
scheduler.config.csp = false;
~~~

请注意，如果应用阻止了这种高性能代码，dhtmlxScheduler 将无法正常工作。

### Change log
- 6.0 版本新增
