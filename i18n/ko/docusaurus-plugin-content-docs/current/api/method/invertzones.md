---
sidebar_label: "invertZones"
title: "invertZones method"
description: "주어진 타임존을 반전시킵니다."
---

# invertZones

### Description

@short: 주어진 타임존을 반전시킵니다.

@signature: invertZones: (zones: any[]) =\> void

### Parameters

- `zones` - (required) *array* - 각 쌍이 특정 시간 범위(분 단위)를 정의하는 **[start_minute,end_minute,..,start_minute_N,end_minute_N]** 배열입니다. 배열에는 이러한 쌍이 여러 개 포함될 수 있습니다.

### Example

~~~jsx
var zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]
~~~

### Details

:::note

버전 3.5부터 사용 가능합니다.
 
:::

:::note
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::
