---
sidebar_label: "year_y"
title: "year_y config"
description: "연도 뷰에 표시되는 열 수를 설정합니다."
---

# year_y

### Description

@short: 연도 뷰에 표시되는 열 수를 설정합니다.

@signature: year_y: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here', new Date(2027, 0, 10), "year");
~~~

**Default value:** 3

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 이 속성은 [year_view](guides/extensions-list.md#year) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note
 Material 스킨에서는 이 속성이 적용되지 않습니다. 대신, 연도 뷰의 열 수는 CSS를 통해 관리됩니다. 
:::

### Related API
- [year_x](api/config/year_x.md)
