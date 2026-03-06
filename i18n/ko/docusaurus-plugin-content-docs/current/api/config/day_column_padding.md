---
sidebar_label: "day_column_padding"
title: "day_column_padding config"
description: "뷰 컬럼에 패딩을 추가합니다"
---

# day_column_padding

### Description

@short: 뷰 컬럼에 패딩을 추가합니다

@signature: day_column_padding: number

### Example

~~~jsx
scheduler.config.day_column_padding = 20;
~~~

**Default value:** 8

### Details

이벤트는 뷰 컬럼 전체 너비에 걸쳐 확장될 수 있습니다. `day_column_padding` 설정은 각 셀 내에서 이벤트가 차지할 수 있는 최대 너비를 제한합니다. 이렇게 하면 컬럼 양쪽에 항상 빈 공간이 남아 있어 사용자가 그 빈 영역을 더블클릭하여 새 이벤트를 생성할 수 있습니다.

**패딩 비활성화**
~~~
scheduler.config.day_column_padding = 0;
~~~

![Scheduler - no padding in day columns](/img/day_column_padding_none.png)

**패딩 활성화**
~~~
scheduler.config.day_column_padding = 8;
~~~
![Scheduler - padding inside day columns](/img/day_column_padding_set.png)

### Change log
- added in v7.0
