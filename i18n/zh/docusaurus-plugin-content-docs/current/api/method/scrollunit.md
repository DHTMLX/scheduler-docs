---
sidebar_label: "scrollUnit"
title: "scrollUnit method"
description: "在 Units 视图中滚动指定数量的单位"
---

# scrollUnit
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在 Units 视图中滚动指定数量的单位

@signature: scrollUnit: (step: number) =\> void

### Parameters

- `step` - (required) *number* - 要滚动的单位数量（<i>使用正值向右侧滚动单位，<br>使用负值向左侧滚动单位</i>）。

### Example

~~~jsx
scheduler.scrollUnit(5);  //向右滚动 5 个单位
...
scheduler.scrollUnit(-5); //向左滚动 5 个单位
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 此方法需要激活 [units](guides/extensions-list.md#units) 插件。 
:::
