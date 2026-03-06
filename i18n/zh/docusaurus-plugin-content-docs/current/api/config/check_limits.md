---
sidebar_label: "check_limits"
title: "check_limits config"
description: "切换是否启用限制检查"
---

# check_limits

### Description

@short: 切换是否启用限制检查

@signature: check_limits: boolean

### Example

~~~jsx
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2013,7,6),"week");
~~~

**Default value:** true

### Details

:::note
 该属性需要激活 [limit](guides/extensions-list.md#limit) 插件。 
:::

此选项自版本 3.5 起可用。

关闭此设置在未设置任何限制且仅需高亮或当前时间标记时非常有用，因为它可以提升性能。但如果定义了限制，禁用此选项也会关闭所有"阻止"功能。

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
