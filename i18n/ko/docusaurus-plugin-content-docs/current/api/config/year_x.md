---
sidebar_label: "year_x"
title: "year_x config"
description: "연도 뷰에 표시되는 행(row)의 수를 지정합니다."
---

# year_x

### Description

@short: 연도 뷰에 표시되는 행(row)의 수를 지정합니다.

@signature: year_x: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"year");
~~~

**Default value:** 4

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 이 설정은 [year_view](guides/extensions-list.md#year) 플러그인이 활성화되어 있어야 작동합니다. 
:::

:::note
 이 설정은 Material 스킨에는 영향을 미치지 않습니다. Material 스킨에서는 연도 뷰의 행(row) 수가 CSS를 통해 관리됩니다. 
:::

### Related API
- [year_y](api/config/year_y.md)
